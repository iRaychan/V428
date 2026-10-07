# KeySuite V4.28.71 Upgrade

Upgrade from V4.28.70 by copying this package over the current installation.

## Changes

1. **macOS Safari selector lifecycle:** keeps CR and CHC frames in a real visible layout while intermediate CHC generation frames are concealed with opacity. Safari no longer calculates the selector inside a visibility-hidden iframe.
2. **Safari page-zoom normalization:** derives the live Mac page-zoom factor from the browser window and applies it only inside the embedded selector, preventing the 75% iframe layout from becoming 33% oversized without guessing CR/C4/C6 dimensions.
3. **Visible-host initialization:** CR and each CHC generation receive one guarded navigation after the Selection host has a measurable width, followed by bounded 0/40/120/280/650 ms stabilization passes and a safe final reveal.
4. **C4/C6 switching:** preparation is idempotent across pointer and click events, and the requested generation is revealed after the matching document loads without a one-shot readiness dead end.
5. **Platform isolation:** the V4.28.70 Windows lifecycle is unchanged. The working ES/BFI Product Curve host and BFI fallback are untouched.
6. **Behavior preservation:** CR/CHC data, pricing, curves, PDF, Assembly, Quote and permission behavior remain unchanged.

No database migration or edge-function deployment is required.
