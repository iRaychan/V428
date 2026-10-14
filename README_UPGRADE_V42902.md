# KeySuite V4.29.02 Upgrade

## Change

The Product curve wrapper no longer suppresses the existing alternative-model recommendation panels for ES and BFI. The selectors' existing recommendation rules and candidate cards are reused without modification.

## Scope

- Runtime change: family-specific Product curve visibility rule in `v394411-product-curve.js` only.
- ES and BFI alternatives are restored.
- CHC and CR alternatives remain suppressed in Product curve views.
- No selector data, ranking, calculations, pricing, actions, PDF output or layout styling is changed.
- Release metadata is updated to V4.29.02.
- No database migration or edge-function deployment is required.
