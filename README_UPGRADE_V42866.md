# KeySuite V4.28.66 Upgrade

Upgrade from V4.28.65 by copying this package over the current installation.

## Changes

1. CR and BFI display settings persist independently through model switches, navigation and refresh; the newest local/account save wins.
2. Quotation print jobs use `[FirstCompanyWord] - YYMMDD - Last4Ref.pdf`, plus `-R1`, `-R2`, etc. for revisions.
3. CR Product and Selector PDFs share dimension resolution. CR 8-11 resolves to 280 × 256 × 991 mm, 68 kg, B1 686, B2 305, D1 197 and D2 148; drawings have a safe fallback.
4. Product PDF image preparation is enabled by default, cached and de-duplicated without reducing curve points or report content.
5. D1 Shaft Power displays HP as the main value and kW as the secondary value throughout curve layouts.
6. CR motor efficiency class displays IE3; numeric efficiency data is unchanged.
7. CHC C4/C6 switching no longer reloads or repeatedly hides the active selector frame.
8. KeyCore reads current company quotation records through the same saved/sealed quotation RPC chain as Quotation.

No database migration is required.
