variable "aws_account_id" {
  description = "The THINKey AWS account. OpenTofu refuses to run against any other account (e.g. NISA's). Set in terraform.tfvars, which is gitignored because the repo is public."
  type        = string

  validation {
    condition     = can(regex("^[0-9]{12}$", var.aws_account_id))
    error_message = "aws_account_id must be a 12-digit AWS account ID."
  }
}

variable "aws_profile" {
  description = "Local AWS CLI profile used to apply this config."
  type        = string
  default     = "default"
}

variable "aws_region" {
  description = "Region where SES sends from (must match the app's SES client)."
  type        = string
  default     = "us-east-1"
}

variable "vercel_team_slug" {
  description = "Vercel team slug; the OIDC issuer is oidc.vercel.com/<slug> (team issuer mode)."
  type        = string
  default     = "thinkey"
}

variable "vercel_project" {
  description = "Vercel project allowed to assume the role."
  type        = string
  default     = "portafolio"
}

variable "vercel_environments" {
  description = "Vercel environments allowed to assume the role. Add \"preview\" to let preview deployments send real email."
  type        = list(string)
  default     = ["production"]
}

variable "sender_domain" {
  description = "Domain verified in SES (DKIM records go in its DNS)."
  type        = string
  default     = "thinkey.us"
}

variable "sender_address" {
  description = "The only From address the role may send as."
  type        = string
  default     = "diego@thinkey.us"
}
