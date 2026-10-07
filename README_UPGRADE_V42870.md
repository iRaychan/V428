# KeySuite V4.28.70 Upgrade

Upgrade from V4.28.69 by copying this package over the current installation.

## Changes

1. **CHC C4/C6 first paint:** keeps the Selector iframe hidden throughout a generation route change and reveals it only after the requested document is fully loaded and has completed a three-stage viewport sizing pass. This removes the fast blink and prevents a stale C4/C6 document from being shown.
2. **macOS Safari CR Selector:** restores the verified V4.28.63 embedded layout rules, including 100% text-size adjustment, a fixed 1.0 body zoom, the 340 px/17 px desktop grid, the 1.55:1 curve grid and the original 1050 px/850 px breakpoints.
3. **Behavior preservation:** newer CR data, models, curves, PDF, Assembly, Quote, permissions and pricing behavior remain unchanged.

No database migration or edge-function deployment is required.
