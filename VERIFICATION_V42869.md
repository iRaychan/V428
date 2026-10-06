# KeySuite V4.28.69 Verification

## Automated checks

- `node tests/v42869-functional-regression.cjs`
- `node tests/v42869-release-regression.cjs`
- Retained V4.28.68 pricing, CR Selector, Assembly and release suites
- JavaScript syntax checks for changed runtime files
- Upgrade and full-clean archive content/checksum verification

## Covered behavior

- CHC C4 generation changes hide the stale iframe before navigation on Safari as well as Windows.
- The iframe stays hidden until the requested C4/C6 document has loaded and received a non-zero parent width.
- CR has no CSS `zoom` or transform override and uses the same 340 px/27 px layout primitives as CHC C6.
- The CR document is constrained to the iframe width with horizontal overflow suppressed.
- CR data, model selection, curves, PDF, Assembly and Quote integration remain unchanged.
- Visible runtime and service-worker cache versions are V4.28.69.

No live database or production deployment was performed.
