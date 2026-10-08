# KeySuite V4.28.73 — Quick Search first-load curve fix

Base: V4.28.72 FULL CLEAN.

Change: `v40201-quick-selection.js` only for runtime behavior. In the CHC Quick Search → Curve handoff, the model-open acknowledgement is now accepted only after the selected model and the curve SVG are present in the active, visible selector iframe and survive a short settling interval. If missing at the end of retries, the model-open message is resent once. Existing duty units/values are preserved.

Version metadata/cache: `index.html`, `sw.js`, and `v42873-version-lock.js`. The V4.28.72 selector first-open sizing script remains unchanged.

**Unchanged:** All selector HTML and curve layout/scaling, pricing, quotation, PDF/print layout.

**Manual Safari verification required:** Quick Search 56 IGPM @ 100 ft, select CHC 15-3 the first time; back and repeat; verify both show curves. The live authenticated Safari session was not available for automated verification.
