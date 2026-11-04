# infra

OpenTofu config for the AWS side of the contact form. The site sends email through SES using **Vercel OIDC federation**, so no long-lived AWS access keys exist anywhere.

| Resource | Purpose |
|---|---|
| `aws_sesv2_email_identity.sender` | Verifies `thinkey.us` in SES (Easy DKIM, 2048-bit) |
| `aws_iam_openid_connect_provider.vercel` | Trusts tokens from `oidc.vercel.com/thinkey` |
| `aws_iam_role.contact_form` | Assumable only by the `portafolio` project's production deployments |
| `aws_iam_role_policy.send_contact_email` | `ses:SendEmail` on the thinkey.us identity, From `diego@thinkey.us` only |

## Usage

```bash
cd infra
cp terraform.tfvars.example terraform.tfvars   # set the THINKey account ID (gitignored)
tofu init
tofu plan
tofu apply
tofu output   # role_arn -> AWS_ROLE_ARN on Vercel; dkim_records -> GoDaddy DNS
```

Uses the local `default` AWS profile, which is the THINKey account (alias `thinkey`). The provider's `allowed_account_ids` makes plan and apply fail against any other account, so a profile pointed at NISA's account can't be applied by mistake.

State is local and gitignored. It holds no secrets.

## Outside Tofu

- **DNS:** add the `dkim_records` output as CNAMEs at GoDaddy, where thinkey.us DNS lives.
- **Vercel project `thinkey/portafolio`:**
  - OIDC enabled with the team issuer mode
  - `AWS_ROLE_ARN` set to the `role_arn` output

## If state is lost

Re-import rather than recreate:

```bash
tofu import aws_sesv2_email_identity.sender thinkey.us
tofu import aws_iam_openid_connect_provider.vercel <provider-arn>
tofu import aws_iam_role.contact_form portafolio-contact-form-ses
tofu import aws_iam_role_policy.send_contact_email portafolio-contact-form-ses:ses-send-contact-email
```
