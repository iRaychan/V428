# KeySuite V4.28.65 Verification

## Automated checks

- `node tests/v42865-functional-regression.cjs`
- `node tests/v42865-release-regression.cjs`
- JavaScript syntax checks for changed runtime files
- Archive content and checksum verification

## Covered behavior

- RM5,200 carried assembly price remains RM5,200 in Quotation and is protected from automatic leaf repricing.
- Existing Assembly/System display pricing still records Transport SUM and Fuel MAX-once behavior.
- Capacity appears in the collapsed UI title, once in printed output, and disappears when unticked.
- Quotation and curve filename examples match the V4.28.65 requirements, including revisions and IGPM.
- Auto duty uses whole-number display values while retaining separate full-precision q/h calculation values.
- CHC/CR PDF caches are shared across print frames; chart geometry and curve-point generation remain unchanged.

No live database or production deployment was performed.
