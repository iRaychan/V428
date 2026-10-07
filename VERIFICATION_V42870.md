# KeySuite V4.28.70 Verification

## Automated checks

- `node tests/v42870-functional-regression.cjs`
- `node tests/v42870-release-regression.cjs`
- Retained V4.28.69 pricing, CR Selector, Assembly and release suites
- JavaScript syntax checks for changed runtime files
- Upgrade and full-clean archive content/checksum verification

## Covered behavior

- CHC C4/C6 generation changes hide the stale iframe before navigation on Safari as well as Windows.
- The iframe stays hidden until the requested C4/C6 document itself reports `readyState=complete`, its loaded path matches the requested generation and it has completed the measured-width and 100%-width sizing passes.
- CR restores the exact V4.28.63 Safari layout controls: 100% text-size adjustment, body `zoom:1`, 340 px/17 px desktop grid, 1.55:1 curve grid and the original responsive breakpoints.
- The CR document remains constrained to the iframe width with horizontal overflow suppressed.
- CR data, model selection, curves, PDF, Assembly, Quote, permissions and pricing integration remain unchanged.
- Visible runtime and service-worker cache versions are V4.28.70.

No live database or production deployment was performed.
