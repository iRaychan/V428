# KeySuite V4.29.11 Upgrade

## Changes

- An unassigned Telegram sender no longer receives the normal KeyBot Fast Search menu.
- Customer, Product, Selection and New Request controls are removed for that sender.
- KeyBot replies with: `Your Telegram account is not assigned yet.` followed by `Please contact your administrator to request access.`
- The sender is still registered in KeySuite so an administrator can see and assign the Telegram account.
- `CHC` Fast Search checks all curve-enabled CHC Brand / Series entries available through the user's Role or linked Company assignment.
- `CHC` and `VMS` use the same assigned CHC hydraulic scope.
- A numeric series such as `CHC 2` or `BFI 10` keeps that assignment scope but restricts hydraulic results to the requested series.
- Existing ES behavior is retained: `ES` checks both 2 Pole and 4 Pole, while `ES 2P` or `ES 4P` restricts the pole.
- Exact `CHCS` models use SS304 identity and exact `CHCN` models use SS316 identity on the generated curve.
- One request can contain up to five Flow @ Head rows; KeyBot selects one model across all points and plots D1 through D5 on the curve report.

## Deployment

1. Upload the V4.29.11 application files.
2. Redeploy `supabase/functions/telegram-webhook`, including both `index.ts` and `curve-pdf.ts`.

No database migration is required.
