output "role_arn" {
  description = "Set as AWS_ROLE_ARN in the Vercel project (not a secret)."
  value       = aws_iam_role.contact_form.arn
}

output "dkim_records" {
  description = "CNAME records to add in the sender domain's DNS so SES can verify it."
  value = [
    for token in aws_sesv2_email_identity.sender.dkim_signing_attributes[0].tokens : {
      type  = "CNAME"
      name  = "${token}._domainkey.${var.sender_domain}"
      value = "${token}.dkim.amazonses.com"
    }
  ]
}
