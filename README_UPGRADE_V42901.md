# KeySuite V4.29.01 Upgrade

## Change

The Assembly BOM shared main row is now top-aligned so Model / Item, Qty, Unit Price and Total Price labels and controls remain on the same baseline. The Unit Price Fuel share note stays below the input without pulling that column upward.

## Scope

- Runtime change: Assembly BOM CSS in `index.html` only.
- Release metadata: V4.29.01 version lock, bootstrap cache tag, service-worker cache, manifest and visible version.
- Corrected sections: Pump, Motor, Coupling and Baseplate.
- Unchanged: BOM rendering/data, calculations, pricing, input widths, component details, selectors, Product, Quote and frozen PDF.
- No database migration or edge-function deployment is required.

