# KeySuite V4.28.63 Verification

## Automated checks

- `node tests/v42863-assembly-system-pricing-regression.cjs`
- `node tests/v42863-release-regression.cjs`
- retained core pricing and Assembly/System behavior regressions
- JavaScript syntax checks for changed runtime files

## Pricing cases

- Assembly/Pumpset display total uses component quotation prices excluding Fuel, plus MAX Fuel once.
- Assembly/Pumpset quotation receives the same consolidated total and an auditable ASSEMBLY pricing snapshot.
- System display and quotation use the same rule.
- Nested Pumpset in System is flattened to leaf components once; wrapper price is excluded.
- Set Discount and Final Discount are resolved per leaf through normal quotation repricing.
- A missing live catalogue record is recovered from the saved pricing snapshot with current quotation factors; the UI does not revert to a simple component sum.
- Transport is summed by leaf quantity; Fuel is the single maximum regardless of nesting.

## Layout protection

- No PDF generation or quotation print-layout file was changed for V4.28.63.
