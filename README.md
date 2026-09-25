# KeySuite V4.28.10 FULL CLEAN

Baseline: V4.28.09 FULL CLEAN.


## V4.28.10 - Global Power 5th-order + PDF curve standardisation + ES endpoint correction

- Standardises the **Power curve to 5th-order polynomial** across CHC C4, CHC C6, BFI and ES for both KeySuite and KeyBot.
- Bypasses the older display-only cubic Power smoother so the visible Power line follows the 5th-order polynomial directly.
- KeySuite **PDF only**: all plotted pump/system/orifice/parallel/variable curve lines use **1.8 SVG units**. On-screen curve thickness remains unchanged.
- KeyBot PDF: all plotted curve lines use **1.35 pt**, approximately the visual equivalent of 1.8 px at 96 dpi.
- ES motor-trimmed curves stop at the last valid hydraulic point instead of adding a false trailing zero point; Head, Efficiency, Power and NPSH no longer drop vertically to zero at the high-flow end.
- ES exact model + motor + flow-only requests preserve the original flow unit and show the m³/hr conversion. Derived head is rounded to the nearest whole metre for display only.
- Example: `500 IGPM` is displayed as **500 IGPM (136.4 m³/hr) @ 103 mtr** when the calculated head is approximately 102.9 m. Internal calculations retain the unrounded values.
- Motor-safe impeller selection, safety-factor logic, BEP motor-only behavior and flow/head constrained operating-point logic are otherwise unchanged.

## V4.28.09 - ES suffix + assigned-brand routing correction

- Exact ES Fast Search now recognises one-letter hydraulic model suffixes, including `ES 80-32H` and `ES 80-32G`.
- `HP`, `kW`, `2P`, `4P`, `2Pole`, `4Pole`, `cw` and `c/w` technical tokens are removed before Customer-name inference.
- Unbranded exact ES searches no longer default to B.G.Reich when several assigned brands match. KeyBot shows the matching **Brand / Model** choices first.
- If only one assigned brand matches the exact ES model and pole, KeyBot continues automatically.
- Explicit Brand + ES Model remains strictly scoped to that assigned brand.
- Preserves V4.28.08 motor-safe impeller trimming, complete selected-impeller curve, BEP default rated point, and flow-only/head-only behavior.



## V4.28.08 - ES motor trim + BEP rated point correction

- ES exact model + motor HP now **trims impeller diameter first** until the largest diameter that satisfies the existing KeySuite motor safety-factor rule is found.
- The selected impeller's **full hydraulic curve** is retained; motor HP no longer truncates the curve at an arbitrary end point.
- With motor HP only, the rated point is the **BEP of the selected trimmed impeller**, and the system curve is drawn through that BEP.
- With flow-only or head-only input, the user-specified coordinate remains the operating constraint and the system curve passes through the derived operating point.
- If the motor is insufficient even at minimum impeller size, KeyBot reports that explicitly.
- Fast Search protects HP/kW/pole/cw technical continuation lines from Customer parsing.
- Unbranded exact ES + motor HP requests prefer assigned **B.G.Reich**.


## V4.28.07 - KeyBot hydraulic selection + exact-model curve control

- Adds a **5% head undersize allowance** when no fully suitable model remains in the requested scope. The candidate stays selectable and is explicitly marked **(Undersized)**.
- Adds nominal series filtering: `CHC 15` searches CHC 15-xx only; `ES 65` searches ES 65-xx only.
- Exact CHC / ES model + duty now keeps the selected model, generates its curve, plots the requested duty even outside the curve range, and shows an out-of-curve warning instead of substituting another model.
- ES exact model + motor HP can generate a motor-limited curve using the existing KeySuite ES safety-factor motor sizing rules.
- ES exact model + motor HP + flow-only selects the largest allowable impeller and plots the maximum head available at that flow.
- ES exact model + motor HP + head-only resolves the maximum usable flow at that head.
- Preserves the V4.28.06 TESK Chemical Pump / dosing / exact GS selection changes below.

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
1. Upload/deploy the V4.28.10 web files to GitHub.
2. Redeploy Supabase Edge Function `telegram-webhook`.
3. No new database migration is required.
4. Refresh KeySuite after deployment.
