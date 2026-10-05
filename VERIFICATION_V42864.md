# KeySuite V4.28.64 Verification

## Automated checks

- `node tests/v42864-assembly-system-pricing-regression.cjs`
- `node tests/v42864-release-regression.cjs`
- retained core pricing and Assembly/System behavior regressions
- JavaScript syntax checks for changed runtime files

## Pricing cases

- Four visible BOM lines divide MAX Fuel by four; three divide by three; two divide by two.
- Each visible unit price is rounded after its allocated Fuel share is added.
- Displayed BOM line totals sum exactly to the displayed Consolidated Total.
- A multi-quantity line receives one BOM Fuel share divided across its units.
- Saved standalone component prices remain unchanged.
- Assembly/Pumpset quotation is separately consolidated with each component's Set/Final Discount logic and an auditable ASSEMBLY pricing snapshot.
- System display and quotation use the same rule.
- Nested Pumpset in System is flattened to leaf components once; wrapper price is excluded.
- Set Discount and Final Discount are resolved per leaf through normal quotation repricing.
- A missing live catalogue record is recovered from the saved pricing snapshot with current quotation factors; the UI does not revert to a simple component sum.
- Transport is summed by leaf quantity; Fuel is the single maximum regardless of nesting.

## Layout protection

- No PDF generation or quotation print-layout file was changed for V4.28.64.
