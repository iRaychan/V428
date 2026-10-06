# KeySuite V4.28.66 Verification

## Automated checks

- `node tests/v42866-functional-regression.cjs`
- `node tests/v42866-release-regression.cjs`
- JavaScript syntax checks for changed runtime files
- Archive content and checksum verification

## Covered behavior

- All eight V4.28.66 points have static/behavior regression assertions.
- CR/BFI persistence includes separate storage/database namespaces and newest-save conflict handling.
- Quotation filename examples cover base and revision forms, plus the real `beforeprint` title lock.
- CR 8-11 dimensions and Selector/Product shared resolver/drawing fallback are asserted.
- Product PDF optimization is default-on, shared and in-flight de-duplicated; no curve-point reduction is introduced.
- HP-first D1 display is asserted across CHC C4/C6, CR, BFI and ES Selector/Product layouts.
- CR IE3, single-pass C4/C6 stabilization and KeyCore quotation RPC linkage are asserted.

No live database or production deployment was performed.
