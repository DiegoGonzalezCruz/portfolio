provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile

  # Hard guard: plan/apply fail if the profile resolves to any other account.
  allowed_account_ids = [var.aws_account_id]

  default_tags {
    tags = {
      Project   = "portafolio"
      ManagedBy = "opentofu"
    }
  }
}

locals {
  oidc_host     = "oidc.vercel.com/${var.vercel_team_slug}"
  oidc_audience = "https://vercel.com/${var.vercel_team_slug}"
  oidc_subjects = [
    for env in var.vercel_environments :
    "owner:${var.vercel_team_slug}:project:${var.vercel_project}:environment:${env}"
  ]
}

# --- SES: verify the sending domain with Easy DKIM -------------------------
# Verification completes once the CNAMEs in the `dkim_records` output exist in
# the domain's DNS (GoDaddy for thinkey.us).
resource "aws_sesv2_email_identity" "sender" {
  email_identity = var.sender_domain

  dkim_signing_attributes {
    next_signing_key_length = "RSA_2048_BIT"
  }
}

# --- Vercel OIDC: short-lived credentials instead of stored access keys -----
resource "aws_iam_openid_connect_provider" "vercel" {
  url            = "https://${local.oidc_host}"
  client_id_list = [local.oidc_audience]
}

data "aws_iam_policy_document" "trust_vercel" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.vercel.arn]
    }

    condition {
      test     = "StringEquals"
      variable = "${local.oidc_host}:aud"
      values   = [local.oidc_audience]
    }

    condition {
      test     = "StringEquals"
      variable = "${local.oidc_host}:sub"
      values   = local.oidc_subjects
    }
  }
}

resource "aws_iam_role" "contact_form" {
  name                 = "portafolio-contact-form-ses"
  description          = "Assumed via Vercel OIDC by the portafolio project to send contact-form email through SES."
  assume_role_policy   = data.aws_iam_policy_document.trust_vercel.json
  max_session_duration = 3600
}

# Send-only, from one address on one verified identity.
data "aws_iam_policy_document" "send_contact_email" {
  statement {
    actions   = ["ses:SendEmail"]
    resources = [aws_sesv2_email_identity.sender.arn]

    condition {
      test     = "StringEquals"
      variable = "ses:FromAddress"
      values   = [var.sender_address]
    }
  }
}

resource "aws_iam_role_policy" "send_contact_email" {
  name   = "ses-send-contact-email"
  role   = aws_iam_role.contact_form.id
  policy = data.aws_iam_policy_document.send_contact_email.json
}
