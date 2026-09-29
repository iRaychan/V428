# V4.28.38 verification

Automated checks performed on the packaged source:

- Existing CHC/ES numerical curve regression remains enabled.
- ES and BFI Selection use CHC's compact 1220 px workspace and 330 px input-column scale.
- ES and BFI retain their corresponding Product Curve result-chart composition.
- CHC, ES and BFI Selection use the same contained outer-card treatment.
- Visible version, page cache keys and service-worker cache are V4.28.38.

Manual acceptance target:

- In Safari, compare CHC, BFI and ES under Selection → B.G.Reich.
- BFI and ES must no longer appear enlarged or zoomed relative to CHC.
- ES Selection must show all five top options, including Bare Shaft Pump.
- The main curve and all three right-side charts must remain inside the page without horizontal clipping.

Run `node tests/v42838-release-regression.cjs` to repeat the automated checks.
