# KeySuite V4.28.06 FULL CLEAN

Baseline: V4.28.05 FULL CLEAN.


## V4.28.06 - Chemical template + exact GS selection

- Typing `chem` or `chemical` opens a copy-and-fill template:
  - Medium
  - Concentration
  - Flow
  - Pressure
  - Temperature
- The same template can also be started with common dosing/metering aliases.
- Temperature parsing accepts `70C`, `70°C`, `70 deg C`, `70 degree C` and similar forms.
- `Hydrochloric Acid`, `HCl` and `Muriatic acid` normalize to the same chemical family.
- Flow + pressure are the only hard requirements for hydraulic sizing. Missing medium, concentration or temperature no longer blocks a preliminary pump recommendation.
- When chemical information is incomplete, KeyBot shows the available TESK catalogue material/concentration/temperature reference instead of simply stopping.
- Added exact GS hydraulic points GS001-GS060. Example: `30 L/hr @ 5 bar` selects `GS030` (30 L/hr, 7 bar catalogue point).
- For 30% HCl above the conservative complete-seal limit, PVDF/fluoroplastic can remain a preliminary pump-head recommendation where supported by the catalogue, while final seal/O-ring confirmation remains required.
- Preserves all V4.28.05 routing fixes: direct chemical technical sizing, TESK clean-water family isolation, and no TESK-to-B.G.Reich ES fallback.

TESK Chemical Pump / Metering Selection:
- Key > Customer includes a customer-specific **TESK Chemical Pump** assignment.
- **Chemical / Material Selection** can be enabled separately for each Customer.
- KeyBot directly recognizes `TESK Chemical Pump`, while retaining `TESK Metering Pump` and `Dosing Pump` as aliases.
- The guided Product menu shows **TESK · Chemical Pump** only when it is permitted and assigned to the selected Customer.
- KeyBot routes normal water/transfer pump duties separately from dosing/metering duties.
- Chemical dosing asks for medium, concentration, temperature, flow in L/hr and pressure in bar.
- Material recommendations use conservative rules digitized from the TESK metering-pump catalogue; conditions outside those rules are marked **Engineering Review Required** instead of guessed.
- Exact CKS hydraulic points are used when the duty is covered.
- Exact GS hydraulic points are used for GS001-GS060; larger duties outside digitized exact points return a TESK series candidate and require model confirmation against the catalogue flow/pressure table.
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

TESK KeyBot selection corrections:
- Direct chemical dosing requests perform technical sizing before any Customer selection.
- The pump recommendation is shown before chemical material details.
- Missing temperature no longer blocks hydraulic sizing and is not treated as 0°C; it remains required for final wetted-parts confirmation.
- Normal clean-water TESK requests use only active TESK OEM family mappings.
- TESK cannot fall back to or display B.G.Reich ES models.
- Brand Series labels without an active OEM Family Map cannot create a searchable hydraulic family.

Deployment:
1. Upload/deploy the V4.28.06 web files to GitHub.
2. Redeploy Supabase Edge Function `telegram-webhook`.
3. No new database migration is required.
4. Refresh KeySuite after deployment.
