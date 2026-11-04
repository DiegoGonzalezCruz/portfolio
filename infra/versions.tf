terraform {
  required_version = ">= 1.8"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.71"
    }
  }

  # Local state on purpose: nothing in this config is secret (no access keys
  # are created), and it's a single-owner project. The state file is
  # gitignored; if it's lost, `tofu import` the resources listed in README.md.
}
