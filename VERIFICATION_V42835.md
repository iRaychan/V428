# V4.28.35 verification

Automated checks performed on the packaged source:

- 984 CHC/ES power curves tested at full and reduced speeds: positive estimated shutoff, preservation of 10,365 curve points, no interval overshoot, continuous slopes at joins.
- 912 ES impeller endpoints tested: finite head at each endpoint and increasing flow extent with increasing diameter.
- Synthetic curved data verifies the low-flow extension is not forced to a straight line. Measured nonzero shutoff is preserved when supplied.
- 80 JavaScript files/inline blocks pass syntax parsing. Existing pricing regression passes.
- CHC Selection and Product both call the same shared power helper. ES Selection and Product share the same page/helper. PDF chart generation uses these chart functions.
- BFI Selection retains the approved Product power method. This is deliberately not represented as a global replacement of BFI engineering data.

Still requires manual verification:

- Live Safari browser access was blocked by policy verification in this session. macOS clipping, header buttons and responsive placement have source-level checks, not a completed visual acceptance test.
- Windows visual regression and actual PDF-button latency/printed output have not been measured in this session. The inherited asset-ready printing delay is 80 ms; this is not a claim about total processing time.
- Compare Selection and Product exports for CHC 8-4 and CHC 45-30 and verify ES 50-20 impeller ordering on screen and in PDF after deployment.

Run `node tests/v42835-release-regression.cjs` to repeat the numerical tests.
