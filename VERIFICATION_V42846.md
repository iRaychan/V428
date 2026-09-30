# V4.28.46 verification

Automated checks performed on the packaged source:

- Product BFI publishes a fresh model identity after Motor Phase and Pump Material changes.
- BFI uses the `BFIN` prefix for Stainless Steel 316 and the `BFI` prefix for Stainless Steel 304.
- The `T` suffix is present for 3 Phase and removed for 1 Phase.
- The Product Curve title, selected-pump heading and export payload use the same live BFI identity.

- Existing CHC/ES numerical curve regression remains enabled.
- ES Selection is mounted in the real shared `productCurveDialog` and `productCurveHost` used by Product.
- BFI Selection is mounted in that same real shared Product Curve panel and host.
- ES Selection receives `product-frame` and `ks3963-product-es` after every iframe load.
- ES Selection and Product ES share the same 1550/350 geometry, Safari 1480/340 geometry, chart grid and visibility rules.
- ES Selection receives the same outer iframe sizing selector as all three Product frames.
- BFI Selection receives `product-frame`, the shared Product BFI layout rules and the same outer iframe sizing selector.
- BFI Selection retains a visible iframe fallback and re-synchronizes after page, brand and Selection navigation events.
- Selection navigation renders `B.G.Reich`, `Tesk`, then `Brand`; other selling brands remain inside `Brand`.
- CHC C4 and C6 measure their visible Selection host and complete a bounded iframe reflow before the first frame is revealed.
- CHC first-open stabilization runs on page navigation, generation iframe loads, browser resize and page restoration.
- The obsolete V4.28.40 Selection-only fit stylesheet is removed at load, leaving one shared source of Product ES geometry.
- The separate Selection imitation panel and host are absent.
- CHC selection and calculation behavior remains unchanged; only first-visible viewport stabilization is added.
- Visible version, page cache keys and service-worker cache are V4.28.46.

Manual acceptance target:

- Open Product → B.G.Reich → BFI → BFI 10-3T → Curve.
- Change Supply to 1 Phase: the visible model must become `BFI 10-3`.
- Change Pump Material to Stainless Steel 316: the visible model must become `BFIN 10-3`.
- Change Supply back to 3 Phase: the visible model must become `BFIN 10-3T`.

- In Safari, compare Selection → B.G.Reich → ES with Product → B.G.Reich → End Suction → Curve.
- Both ES routes must display the same surrounding Product Curve panel and internal geometry.
- Selection ES must remain fully contained when the KeySuite window is narrowed; no control or chart may clip beyond the page.
- ES Selection must show all five top options, including Bare Shaft Pump.
- The main curve and all three right-side charts must remain inside the page without horizontal clipping.
- In Safari, compare Selection → B.G.Reich → BFI with Product → B.G.Reich → BFI → Curve; the surrounding panel and internal geometry must match.
- Reload while Selection BFI is active and click BFI repeatedly; the selector must never remain blank.
- From a fresh Dashboard load, open CHC C4 and CHC C6 separately; neither may show the oversized initial Safari layout.

Run `node tests/v42846-release-regression.cjs` to repeat the automated checks.
