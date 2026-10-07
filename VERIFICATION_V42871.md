# KeySuite V4.28.71 Verification

## Automated checks

- `node tests/v42871-functional-regression.cjs`
- `node tests/v42871-release-regression.cjs`
- Retained V4.28.70 pricing, CR Selector, Assembly and release suites
- JavaScript syntax checks for changed runtime files
- Upgrade and full-clean archive content/checksum verification

## Covered behavior

- On macOS Safari, CR and CHC remain `visibility:visible` so WebKit performs layout; opacity alone conceals an intermediate generation.
- CR and each CHC generation perform one guarded visible-host navigation with `ks-visible=1` and the V4.28.71 layout marker.
- Bounded stabilization runs at 0, 40, 120, 280 and 650 ms and cannot leave a correctly routed frame permanently concealed.
- The measured pixel-width to 100%-width reflow and repeated child resize notification run after the visible document loads.
- Safari's actual page-zoom factor is derived from `outerWidth / innerWidth` and applied only to the embedded Mac selector document; at 100% the factor is neutral.
- Non-Safari desktop behavior, including the working Windows generation path, is unchanged from V4.28.70.
- CR retains 100% text-size adjustment, body `zoom:1`, 340 px/17 px desktop grid, 1.55:1 curve grid and the original responsive breakpoints.
- The CR document remains constrained to the iframe width with horizontal overflow suppressed.
- CR data, model selection, curves, PDF, Assembly, Quote, permissions and pricing integration remain unchanged.
- ES and BFI retain their shared Product Curve host, immediate preparation and BFI visible fallback.
- Visible runtime and service-worker cache versions are V4.28.71.

No live database or production deployment was performed.

Local Safari acceptance passed at 75% and 100% zoom. At 75%, the measured 1,638 px iframe was otherwise laid out by Safari as 2,184 px; V4.28.71 normalizes that mismatch and restores the expected CR, C4 and C6 widths.

## Live acceptance required before deployment

- In macOS Safari at 75% and 100% page zoom, open CR, C4 and C6 from a fresh Dashboard load.
- Repeat C4 → C6 → CR → C4 and confirm every selector appears without tab switching, clipping or horizontal overflow.
- On Windows, repeat the sequence and confirm V4.28.70 behavior is unchanged.
