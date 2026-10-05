# KeySuite V4.28.62 Upgrade

Upgrade from V4.28.61 by replacing the files in this package.

## CR selector scale repair

- CR Selection now uses the same desktop scale and responsive containment as CHC.
- The CR iframe waits for a measurable visible KeySuite width, reflows, and is revealed only after the viewport is stable.
- macOS Safari is fixed at 100% selector zoom with text inflation disabled.
- Header, duty controls, selected-pump cards, alternatives and curves remain inside the available width.
- CR hydraulic data, model selection, pricing, PDF, Assembly and Quote behavior are unchanged.
- Frozen PDF and quotation print layouts are unchanged.

No new V4.28.62 database migration is required.
