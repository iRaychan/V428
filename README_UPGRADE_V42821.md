# Upgrade to KeySuite V4.28.21

This release fixes CHC component pricing and independent CHC generation exchange-rate presentation.

- Complete CHC selections now resolve pump and motor costs separately. The motor match is exact on kW/HP, pole and selected IE1–IE5 class; no complete-item source-cost record is required.
- Missing component diagnostics identify either the pump model or the requested motor specification.
- G1 and G2 retain independent stored base/effective rate objects. Effective rates use full precision in calculation and display to three decimals in the rates table and pricing-rule badge.
- Bare-shaft CHC pricing now uses the pump cost directly, without subtracting a hard-coded IE3 motor.

No database migration is required. Upload all files, including the cache-busted V4.28.21 HTML entry point.
