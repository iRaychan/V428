# KeySuite V4.28.72 Verification

## Automated checks

- `node tests/v42872-functional-regression.cjs`
- `node tests/v42872-release-regression.cjs`
- Retained V4.28.71 pricing, CR Selector, Assembly and release suites
- JavaScript syntax checks for changed runtime files
- Upgrade and full-clean archive content/checksum verification

## Covered behavior

- On macOS Safari, CR and CHC remain `visibility:visible` so WebKit performs layout; opacity alone conceals an intermediate generation.
- CR and each CHC generation perform one guarded visible-host navigation with `ks-visible=1` and the V4.28.72 layout marker.
- Bounded stabilization runs at 0, 40, 120, 280 and 650 ms and cannot leave a correctly routed frame permanently concealed.
- The measured pixel-width to 100%-width reflow and repeated child resize notification run after the visible document loads.
- The V4.28.71 `outerWidth / innerWidth` child-body zoom and matching percentage width are absent.
- Any stale inline child-body `zoom` and `width` left by V4.28.71 are removed on load and during stabilization.
- Native selector CSS supplies the scale: body zoom resolves to 1, controls remain 38 px high on macOS Safari, and no transform is added.
- Non-Safari desktop behavior, including the working Windows generation path, is unchanged from V4.28.71.
- CR retains 100% text-size adjustment, body `zoom:1`, 340 px/17 px desktop grid, 1.55:1 curve grid and the original responsive breakpoints.
- The CR document remains constrained to the iframe width with horizontal overflow suppressed.
- CR data, model selection, curves, PDF, Assembly, Quote, permissions and pricing integration remain unchanged.
- ES and BFI retain their shared Product Curve host, immediate preparation and BFI visible fallback.
- Visible runtime and service-worker cache versions are V4.28.72.

No live database or production deployment was performed.

The live V4.28.71 inspection showed BFI and Product using native CSS scale while CHC C4, CHC C6 and CR alone received the extra child-body zoom. V4.28.72 removes that isolated difference.

## Live acceptance required before deployment

- In macOS Safari at 75% and 100% page zoom, open CR, C4 and C6 from a fresh Dashboard load.
- Repeat C4 → C6 → CR → C4 and confirm every selector appears without tab switching, clipping or horizontal overflow.
- Compare Selector BFI and Product CHC Curve at the same Safari viewport/zoom and confirm CHC C4/C6/CR now use the same native text/control scale.
- On Windows, repeat the sequence and confirm V4.28.71 behavior is unchanged.
