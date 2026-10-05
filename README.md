# KeySuite V4.28.59 FULL CLEAN

Baseline: V4.28.41 FULL CLEAN.

## V4.28.59 - CHC G1 refresh and CR selector/pricing upgrade

- Includes the amended CHC C4/G1 V1.3 hydraulic data and CHC G1 price updates.
- Replaces Product → CR Price List with a CHC-style CR/CRS/CRN product search and selector using `004 - CR 261003 - V1.0.xlsx`.
- Keeps the CR Price List editor available separately under Price List.
- Makes all CR Mechanical Seal Add-On values owner-editable and uses the saved MYR values in CR quotation pricing.
- Reduces the Mechanical Seal Add-On input columns to approximately half width for both CHC and CR.
- Requires `supabase/migrations/20261005090000_v42858_cr_mechanical_seal_addons.sql` when upgrading from V4.28.57.
- Retains all V4.28.57 behavior outside these requested CHC/CR changes.

## V4.28.57 - CHC G1 update and editable Mechanical Seal Add-On

- Updates CHC C4/G1 from `004 - CHC G1 261003 - V1.3 - CHC 32 Amend.xlsx`.
- Replaces the CHC 32 flow, efficiency, NPSHr, head-per-stage, secondary-efficiency and secondary-head source series in both the shared and standalone selector data.
- Adds a Mechanical Seal Add-On table to the CHC Price List for Ca SiC, SiC SiC and TC TC.
- Keeps separate, owner-editable MYR add-on values for CHC C4/G1 and CHC C6/G2.
- Uses the saved generation-specific add-on automatically when CHC quotation prices are calculated.
- Requires `supabase/migrations/20261004190000_v42857_chc_mechanical_seal_addons.sql`.
- Retains the V4.28.56 universal zero-flow Power rule and all earlier behavior/layout.

## V4.28.56 - universal zero-flow Power rule

- Sets generated Power Point 1 at `Q = 0` to exactly `Power[1] × 0.68` for CHC C4/C6, BFI, and ES curves.
- Uses a third-order polynomial for Power curves across CHC C4/C6, BFI, ES, enhanced curves, and generated PDFs.
- Leaves every positive-flow Power source point and all flow, head, efficiency, NPSH, interpolation, selection, and motor-sizing data unchanged.
- Applies the same rule to interactive curves and generated KeySelector/KeyBot PDF curves.
- Preserves the existing frozen PDF/print layout.

## V4.28.55 - CR Price List and Category Pricing

- Adds CR / CRS / CRN to the main Price List dashboard.
- Adds CR as its own Category Pricing sector in Category Management and Company & Pricing.
- Adds an owner-only CR Category Pricing save function and allows CR currency selection per category.
- Requires `supabase/migrations/20261001203000_v42855_cr_category_pricing.sql` after the V4.28.54 CR migration.

## V4.28.54 - B.G.Reich CR Price List

- Adds Product → B.G.Reich → CR with the CHC-style CR / CRS / CRN price editor.
- Imports 439 unique CR models and their RMB/MYR prices and per-variant rarity from `010 - CR (Pricelist) - 261001 - V1.0.xlsx`.
- Includes the workbook's CR mechanical-seal add-on reference table.
- Adds independent CR USD and RMB multipliers and a database-backed owner save workflow.
- Shows both CR and BFI in General Pricelist → Effective Product Exchange Rates.
- Requires `supabase/migrations/20261001190000_v42854_cr_pricelist.sql`.
- V4.28.53 curve, BFI ranking, and CHC first-click fixes remain included.

## V4.28.17 - balanced macOS Safari selector PDF layout

- Keeps the Safari-only pagination repair after every legacy print rule, so it takes precedence reliably.
- macOS Safari now uses equal visible 8 mm margins at the top, bottom, left, and right.
- Windows and non-macOS browser output remains the V4.28.21 layout.

## V4.28.16 - macOS Safari-only PDF pagination

- Restores the exact V4.28.21 print CSS and layout for Windows and non-macOS browsers.
- Applies the V4.28.15 blank-page prevention only when the browser is Safari on macOS.
- Keeps the macOS Safari PDF as Curve, Technical Data, and Dimension on three pages.

## V4.28.15 - Safari/macOS PDF blank-page repair

- Fixes Safari/macOS selector PDFs that insert a blank page after each intended page.
- Each report page uses a zero-margin A4 print context and a 296 mm high page box, leaving a 1 mm Safari rounding buffer before the explicit page break.
- The existing 8 mm inset and the visible Curve, Technical Data, and Dimension layouts are preserved.
- Applied to CHC C4/C6, BFI and ES selector PDF paths, including CHC/BFI Product reports.
- No hydraulic logic, data, KeyBot function, or database migration changed.




## V4.28.21 - Global System Curve +5% display cap

- System Curve display now stops at **105% of the design/system-point head** instead of extending far above the selected operating point.
- Example: a 100 m system point draws to 105 m; the verified 103 m ES example draws to 108.15 m.
- Applied to CHC C4/C6, BFI and ES in KeySuite screen/PDF, plus KeyBot ES motor-limited PDF curves.
- Hydraulic calculations and operating-point intersections are unchanged; this is a display-length rule only.
- V4.28.12 ES natural endpoint fix, global Power 5th-order fitting and PDF curve-line widths remain unchanged.
- No database migration is required. Redeploy `telegram-webhook` for the KeyBot PDF change.

## V4.28.12 - KeyBot ES PDF natural curve endpoint fix

- Fixes the remaining KeyBot ES PDF issue where Head, Efficiency, Power and NPSH could fall vertically to zero at the final flow point.
- Root cause: the final sampled x could be microscopically greater than the polynomial fit maximum because of floating-point arithmetic. `ESCore.polyEval(..., false)` then returned `null`, and the previous generic finite check converted `null` to numeric zero.
- The ES PDF sampler now pins the first and last points exactly to `fit.min` and `fit.max` and rejects `null` / `undefined` results rather than coercing them to zero.
- The selected-impeller label therefore follows the real final Head point instead of being drawn near the x-axis.
- Regression example: `ES 80-32H / 100 HP / 2P / 500 IGPM`, selected impeller Ø280 mm, now ends naturally near 231.88 m³/hr at approximately 84.08 m Head, 66.83% efficiency, 106.81 HP and 10.07 m NPSH.
- V4.28.10/V4.28.11 originally used global Power = 5th order; V4.28.57 supersedes only that Power order with third order while preserving the curve-line widths and `500 IGPM (136.4 m³/hr) @ 103 mtr` duty display.
- No database migration is required.


## V4.28.11 - CHC/BFI screen curve visibility regression fix

- Fixes the V4.28.10 regression where CHC C4/C6 and BFI on-screen curves could render with zero stroke width after Quick Selection/Product selection.
- `curveWidth = null` now correctly uses the normal existing screen thickness; only an explicit positive width overrides it.
- Applied to both Selector and Product/Quick Selection curve renderers.
- KeySuite PDF curve width remains 1.8 SVG units.
- KeyBot PDF remains 1.35 pt (~1.8 px).
- Global Power curve remains 5th order.
- No database migration is required.

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
1. Upload/deploy the V4.28.21 web files to GitHub.
2. Redeploy Supabase Edge Function `telegram-webhook`.
3. No new database migration is required.
4. Refresh KeySuite after deployment.
