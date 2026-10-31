# V5.00.18 regression report

The automated regression suite verifies:

- 39 complete KV1 models only;
- workbook-exact Q=0 kW handling;
- CR hydraulic and pricing files remain byte-identical;
- frozen quotation PDF markup remains unchanged;
- KV category and Material/O-Ring migrations/RPC wiring;
- KV availability in Selection and Product;
- V5.00.18 version, cache, and V5.00.17 upgrade baseline.

Final result: **PASS** on 31 October 2026 using `node tests/v50018-regression.cjs`.
