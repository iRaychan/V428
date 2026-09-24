# Upgrade to KeySuite V4.28.06

Apply over **V4.28.05**.

## TESK Chemical / Metering improvements

- `chem` / `chemical` opens a copy-and-fill chemical dosing template.
- Template fields: `Medium`, `Concentration`, `Flow`, `Pressure`, `Temperature`.
- Common dosing/metering aliases also open the same template.
- Accepts temperature formats including `70C`, `70°C`, `70 deg C`, and `70 degree C`.
- Hydrochloric Acid / HCl / Muriatic acid are normalized to one chemical lookup.
- Flow and pressure remain the only hard hydraulic requirements. Missing medium, concentration, or temperature produces a preliminary recommendation where possible instead of blocking selection.
- When temperature or concentration is missing, KeyBot shows the relevant TESK catalogue reference limit/condition for the proposed material where available.
- Added exact TESK GS flow/pressure points GS001-GS060.
- `30 L/hr @ 5 bar` selects `GS030` (catalogue point 30 L/hr, max 7 bar).
- For 30% HCl, PVDF/fluoroplastic pump-head compatibility can remain preliminary at elevated temperature where the catalogue supports the material, while the final seal/O-ring is kept for confirmation.

## Preserved from V4.28.05

- Direct chemical dosing technical sizing does not require a Customer first.
- Customer-led flows still respect the Customer-specific TESK Chemical Pump assignment.
- TESK clean-water requests only use active TESK OEM family mappings.
- TESK cannot borrow or display the B.G.Reich ES family.

## Deployment

This corrected upgrade package includes the complete local dependency set required to deploy `telegram-webhook` directly from the V4.28.06 upgrade folder.

1. Upload the V4.28.06 web files to GitHub.
2. Redeploy the Supabase Edge Function:

```powershell
npx.cmd supabase@latest functions deploy telegram-webhook --project-ref skidqdixnnnuhvarekxp
```

3. No SQL migration is required.
4. Refresh KeySuite after deployment.
