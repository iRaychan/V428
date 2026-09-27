# KeySuite V4.28.15 Upgrade

## Safari/macOS selector PDF blank-page repair

This release fixes Safari/macOS PDF pagination that inserts blank pages between the selector report's Curve, Technical Data, and Dimension pages.

The existing 8 mm content inset is preserved. Each page now uses a zero-margin A4 print context and a 296 mm high page box, leaving a 1 mm Safari rounding buffer before an explicit page break.

Updated selector PDF paths:

- CHC C4 selector and product report
- CHC C6 selector and product report
- BFI selector and product report
- ES selector report

No database migration or KeyBot redeploy is required.
