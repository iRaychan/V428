# V4.28.41 verification

Automated checks performed on the packaged source:

- Existing CHC/ES numerical curve regression remains enabled.
- ES Selection is mounted in a dedicated Product Curve panel and host.
- ES Selection receives `product-frame` and `ks3963-product-es` after every iframe load.
- ES Selection and Product ES share the same 1550/350 geometry, Safari 1480/340 geometry, chart grid and visibility rules.
- ES Selection pins its iframe viewport to the measured Product-panel host width and follows future width changes.
- The obsolete V4.28.40 Selection-only fit stylesheet is removed at load, leaving one shared source of Product ES geometry.
- The wrapper uses inline-size containment so iframe intrinsic width cannot enlarge or clip the KeySuite page.
- BFI and CHC Selection behavior remains unchanged.
- Visible version, page cache keys and service-worker cache are V4.28.41.

Manual acceptance target:

- In Safari, compare Selection → B.G.Reich → ES with Product → B.G.Reich → End Suction → Curve.
- Both ES routes must display the same surrounding Product Curve panel and internal geometry.
- Selection ES must remain fully contained when the KeySuite window is narrowed; no control or chart may clip beyond the page.
- ES Selection must show all five top options, including Bare Shaft Pump.
- The main curve and all three right-side charts must remain inside the page without horizontal clipping.

Run `node tests/v42841-release-regression.cjs` to repeat the automated checks.
