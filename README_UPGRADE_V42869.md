# KeySuite V4.28.69 Upgrade

Upgrade from V4.28.68 by copying this package over the current installation.

## Changes

1. **CHC C4 first paint:** hides the previous or unscaled iframe during the C6-to-C4 route change and reveals C4 only after the replacement document has a usable viewport. This applies to Safari and Windows.
2. **macOS CR Selector:** removes the CR-only CSS zoom reset so CR inherits the same browser/page scale as CHC C6. The reference geometry remains a 340 px duty sidebar, 27 px series title and zero horizontal overflow.
3. **Behavior preservation:** CR data, models, curves, PDF, Assembly and Quote behavior are unchanged.

No database migration or edge-function deployment is required.
