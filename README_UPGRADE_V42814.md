# KeySuite V4.28.14 Upgrade

## Safari/macOS selector PDF pagination repair

This release fixes Safari/macOS PDF pagination that could insert blank pages between the selector report's Curve, Technical Data, and Dimension pages.

The PDF content area and existing 8 mm inset are preserved. The inset now belongs to an explicit `210 mm × 297 mm` A4 page container, while the print page itself has zero external margin. This avoids Safari printable-area rounding overflow.

Updated selector PDF paths:

- CHC C4 selector and product report
- CHC C6 selector and product report
- BFI selector and product report
- ES selector report

No database migration is required. No hydraulic calculation, curve, technical-data, or dimension layout was changed.
