# gakkconsulting.com Deployment Status

**Last updated:** 2026-03-20

## What's done

- **Code is pushed** to https://github.com/mk9586/gakkconsulting.com
- **Branch:** `main`
- **Contact form** wired to Web3Forms (access key is in contact.html)
  - Primary: m.keister@gakkconsulting.com
  - CC: g.keister@gakkconsulting.com, a.keister@gakkconsulting.com
- **References page** created with reference-letter.pdf
- **Cut pages** (not deployed, still local): case-studies.html, 5 doctrine-*.html pages
- **Nav/footer** cleaned across all 9 live pages

## What's left

### 1. Enable GitHub Pages
Go to https://github.com/mk9586/gakkconsulting.com/settings/pages
- Source: Deploy from a branch
- Branch: `main`, folder `/ (root)`
- Save
- Custom domain: `gakkconsulting.com`
- Check "Enforce HTTPS" (after DNS propagates)

### 2. Update GoDaddy DNS (needs boss's phone for verification)
In GoDaddy → DNS → Manage for gakkconsulting.com:

Delete any existing A records pointing to parked/default IPs.

Add 4 A records:
- @ → 185.199.108.153
- @ → 185.199.109.153
- @ → 185.199.110.153
- @ → 185.199.111.153

Add 1 CNAME:
- www → mk9586.github.io

### 3. After DNS propagates
- Go back to GitHub Pages settings and enable "Enforce HTTPS"
- Test all pages and nav links
- Test contact form (submit a test message, confirm all 3 emails receive it)
- Test on mobile
