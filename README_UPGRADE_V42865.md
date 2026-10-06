# KeySuite V4.28.65 Upgrade

Upgrade from V4.28.64 by copying this package over the current installation.

## Changes

1. Assembly/System to Quotation now carries the displayed final assembly unit price exactly. The BOM is not repriced and Fuel is not applied again during handoff or quotation refresh.
2. Quotation PDF spacing is reduced only between a model title and its Capacity row.
3. Display Capacity remains in the collapsed quotation title, while PDF/output uses a clean model title plus one Capacity row. Unticked items have no Capacity row.
4. Quotation PDF filenames use `Company - YYMMDD - 0000.pdf`, with `-R1`, `-R2`, and later revision suffixes.
5. Curve PDF filenames retain the user's original duty value and unit.
6. Product auto-generated duty display/output rounds flow and head to whole numbers for CHC, CR, CHC C4/G1, BFI, and ES. Curve calculations keep their existing precision.
7. CHC and CR Curve PDF export reuses dimension-scan and image-optimization results, removing redundant work without changing curve points, report content, or page geometry.

No database migration is required.
