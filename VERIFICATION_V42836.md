# V4.28.36 verification

Automated checks performed on the packaged source:

- Existing CHC/ES numerical curve regression remains enabled.
- ES Selection has explicit viewport containment for the option row, two-column layout, main curve and right chart stack.
- BFI Selection has explicit viewport containment for the Product-style curve grid and chart stack.
- Visible version, page cache keys and service-worker cache are V4.28.36.

Manual acceptance target:

- In Safari, compare Product and Selection under B.G.Reich for ES and BFI.
- ES Selection must show all five top options, including Bare Shaft Pump.
- The main curve and all three right-side charts must remain inside the page without horizontal clipping.

Run `node tests/v42836-release-regression.cjs` to repeat the automated checks.
