# KeySuite V4.28.64 Upgrade

Upgrade from V4.28.63 by replacing the files in this package.

## Shared Fuel across Assembly/System BOM prices

- The single highest Fuel Charge is divided equally by the number of visible BOM lines.
- The divisor updates automatically: four lines use Fuel ÷ 4, three use Fuel ÷ 3, two use Fuel ÷ 2, and so on.
- Each displayed BOM unit price is recalculated with its Fuel share and rounded up to RM10.
- Displayed line totals now add exactly to the displayed Consolidated Total.
- A line with quantity above one receives one BOM share, divided across that line's units.
- Saved standalone component prices are unchanged; sharing applies only inside the Assembly/System presentation.
- V4.28.63 quotation consolidation, Set/Final Discount logic, Transport summing, MAX Fuel, and nested System handling remain intact.
- Frozen PDF and quotation print layouts are unchanged.

No new V4.28.64 database migration is required.
