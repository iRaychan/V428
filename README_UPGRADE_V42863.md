# KeySuite V4.28.63 Upgrade

Upgrade from V4.28.62 by replacing the files in this package.

## Assembly/System consolidated pricing correction

- Assembly and System totals now use the same consolidated calculation as Quotation.
- Every underlying component is repriced through its normal quotation path, retaining its own Set Discount and Final Discount behavior.
- Transport contributions from every included component are summed.
- Fuel Charge is applied once using only the highest underlying component Fuel Charge.
- Nested Pumpset/Assembly items inside a System are flattened to their leaf components once, preventing duplicate components, Transport, and Fuel.
- BOM component price displays remain unchanged; the main total is labelled Consolidated Total.
- Frozen PDF and quotation print layouts are unchanged.

No new V4.28.63 database migration is required.
