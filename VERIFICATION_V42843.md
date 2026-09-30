# V4.28.43 verification

Automated checks performed on the packaged source:

- Existing CHC/ES numerical curve regression remains enabled.
- ES Selection is mounted in the real shared `productCurveDialog` and `productCurveHost` used by Product.
- BFI Selection is mounted in that same real shared Product Curve panel and host.
- ES Selection receives `product-frame` and `ks3963-product-es` after every iframe load.
- ES Selection and Product ES share the same 1550/350 geometry, Safari 1480/340 geometry, chart grid and visibility rules.
- ES Selection receives the same outer iframe sizing selector as all three Product frames.
- BFI Selection receives `product-frame`, the shared Product BFI layout rules and the same outer iframe sizing selector.
- The obsolete V4.28.40 Selection-only fit stylesheet is removed at load, leaving one shared source of Product ES geometry.
- The separate Selection imitation panel and host are absent.
- CHC Selection behavior remains unchanged.
- Visible version, page cache keys and service-worker cache are V4.28.43.

Manual acceptance target:

- In Safari, compare Selection → B.G.Reich → ES with Product → B.G.Reich → End Suction → Curve.
- Both ES routes must display the same surrounding Product Curve panel and internal geometry.
- Selection ES must remain fully contained when the KeySuite window is narrowed; no control or chart may clip beyond the page.
- ES Selection must show all five top options, including Bare Shaft Pump.
- The main curve and all three right-side charts must remain inside the page without horizontal clipping.
- In Safari, compare Selection → B.G.Reich → BFI with Product → B.G.Reich → BFI → Curve; the surrounding panel and internal geometry must match.

Run `node tests/v42843-release-regression.cjs` to repeat the automated checks.
