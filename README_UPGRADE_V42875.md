# KeySuite V4.28.75 Upgrade

## Change

Dashboard Quick Selection now accepts `ksSelectorViewportReady`, the readiness state published by `v42872-selector-first-open.js`, while continuing to accept the older `ksChcViewportReady` state.

The previous mismatch rejected a valid ready event and forced the first CHC model open to wait for the 4,500 ms fallback. Repeat opens appeared fast because the selector frame was already warm.

## Scope

- Runtime change: `v40201-quick-selection.js` readiness predicate only.
- Release metadata: V4.28.75 version lock, bootstrap cache tag, service-worker cache, manifest and visible version.
- Unchanged: curve data, selection/ranking calculations, pricing, layouts, Product, Assembly, Quote and frozen PDF.
- No database migration or edge-function deployment is required.

