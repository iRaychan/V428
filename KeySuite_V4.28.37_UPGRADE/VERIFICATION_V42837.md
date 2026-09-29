# V4.28.37 verification

Automated checks performed on the packaged source:

- Existing CHC/ES numerical curve regression remains enabled.
- ES Selection has the same top-control, input-column and chart-grid geometry as ES Product Curve.
- BFI Selection has the same content frame, input-column and chart-grid geometry as BFI Product Curve.
- ES and BFI Selection use the Product-style flat outer frame rather than the old clipping card.
- Visible version, page cache keys and service-worker cache are V4.28.37.

Manual acceptance target:

- In Safari, compare Product and Selection under B.G.Reich for ES and BFI.
- ES Selection must show all five top options, including Bare Shaft Pump.
- The main curve and all three right-side charts must remain inside the page without horizontal clipping.

Run `node tests/v42837-release-regression.cjs` to repeat the automated checks.
