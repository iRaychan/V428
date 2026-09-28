# Upgrade to KeySuite V4.28.23

This is an upgrade patch from V4.28.22 to V4.28.23.

- C1/C2/BFI package prices retain their included standard motor. A motor upgrade or downgrade subtracts the included motor's raw Price List cost and adds the selected motor using the Motor pricing rule. Bare shaft subtracts the included motor's raw cost only.
- Motor matching is exact on kW/HP, pole and selected IE class. Missing-price feedback identifies the required replacement motor.
- CHC seal changes update the quotation price and description. For example, CHC 1–5 with SiC/SiC adds RM250.00.
- G1 and G2 retain independent stored base/effective rate objects. Calculations retain full precision; USD effective rates display to 2 decimals and RMB effective rates to 3 decimals.
- Existing saved C1 quotations re-resolve their stored pricing source instead of being incorrectly flagged red by the legacy complete-item validation.
- BFI stainless-steel / phase changes refresh the visible and exported model identity immediately.
- macOS Safari PDF output has a real items-table header rule and a slightly wider right margin; Windows PDF geometry is unchanged.
- The visible page/browser version and service-worker cache are locked to V4.28.23.

No database migration or Edge Function deployment is required. Upload all files in this patch to the existing KeySuite web root, replacing files with the same names.
