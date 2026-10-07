# KeySuite V4.28.72 Upgrade

Upgrade from V4.28.71 by copying this package over the current installation.

## Changes

1. **Selector scale correction:** removes the V4.28.71 child-frame `outerWidth / innerWidth` zoom and width injection from Selector → CHC C4, CHC C6 and CR.
2. **Proven layout reuse:** those three selectors again use their own native 100% CSS geometry, the same sizing model already working in BFI and Product curves.
3. **Lifecycle retained:** the V4.28.71 visible-host navigation, opacity concealment, bounded 0/40/120/280/650 ms stabilization and safe reveal remain in place.
4. **Strict isolation:** BFI, ES, every Product page and Windows behavior are unchanged.
5. **Behavior preservation:** selector data, pricing, curves, calculations, PDF, Assembly, Quote, permissions and all other modules remain unchanged.

No database migration or edge-function deployment is required.
