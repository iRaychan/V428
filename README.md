# KeySuite V4.28.02 FULL CLEAN

Baseline: V4.27.15.

TESK Chemical Pump / Metering Selection:
- Key > Customer includes a customer-specific **TESK Chemical Pump** assignment.
- **Chemical / Material Selection** can be enabled separately for each Customer.
- KeyBot directly recognizes `TESK Chemical Pump`, while retaining `TESK Metering Pump` and `Dosing Pump` as aliases.
- The guided Product menu shows **TESK · Chemical Pump** only when it is permitted and assigned to the selected Customer.
- KeyBot routes normal water/transfer pump duties separately from dosing/metering duties.
- Chemical dosing asks for medium, concentration, temperature, flow in L/hr and pressure in bar.
- Material recommendations use conservative rules digitized from the TESK metering-pump catalogue; conditions outside those rules are marked **Engineering Review Required** instead of guessed.
- Exact CKS hydraulic points are used when the duty is covered. Larger duties return a TESK series candidate and require exact model confirmation against the catalogue flow/pressure table.
- Customer assignment is stored inside the existing V4.17.10 generic preference JSON.

Deployment:
1. Upload/deploy the V4.28.02 web files to GitHub.
2. Redeploy Supabase Edge Function `telegram-webhook` (the new `tesk-metering-data.ts` file must be deployed with it).
3. No new database migration is required if V4.17.10 Customer Price Preference is already installed.
4. Refresh KeySuite after deployment.
