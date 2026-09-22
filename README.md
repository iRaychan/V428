# KeySuite V4.28.04 FULL CLEAN

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

BFI Product Curve phase synchronization:
- Product > BFI > Curve now changes a 3-phase `T` model to the base model immediately when 1-phase is selected.
- Example: `BFI 2-3T` becomes `BFI 2-3`; changing back to 3-phase restores `BFI 2-3T`.
- The same rule applies to SS316 models: `BFIN 2-3T` becomes `BFIN 2-3`.

KeyBot routing restoration:
- Brand, series, model and duty searches take priority over the legacy Customer-search fallback.
- `CHC`, `BFI`, `ES`, `VMS` and `HMS` entered alone start a scoped pump search.
- Brand-first two-line input such as `OK` followed by `VMS 32-4` is recognized as an O.K.Pump model request.
- Brand or series can be followed by either an exact model or a duty point.
- `ES 2P` and `ES 4P` retain the selected pole when the duty is entered next.

Deployment:
1. Upload/deploy the V4.28.04 web files to GitHub.
2. Redeploy Supabase Edge Function `telegram-webhook`.
3. No new database migration is required.
4. Refresh KeySuite after deployment.
