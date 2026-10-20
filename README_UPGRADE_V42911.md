# KeySuite V4.29.11 Upgrade

## Changes

- An unassigned Telegram sender no longer receives the normal KeyBot Fast Search menu.
- Customer, Product, Selection and New Request controls are removed for that sender.
- KeyBot replies with: `Your Telegram account is not assigned yet.` followed by `Please contact your administrator to request access.`
- The sender is still registered in KeySuite so an administrator can see and assign the Telegram account.
- Assigned Curve Only and Curve & Price behavior is otherwise unchanged.

## Deployment

1. Upload the V4.29.11 application files.
2. Redeploy `supabase/functions/telegram-webhook`.

No database migration is required.
