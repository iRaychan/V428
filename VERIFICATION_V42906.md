# KeySuite V4.29.06 Verification

Run from the package root:

```text
node tests/v42906-release-regression.cjs
```

Expected result:

```text
V4.29.06 pricing coverage, fuel journey and model rarity regression: PASS
```

The regression checks release wiring, all-family distinct-model counts, populated-price counting including preserved zero values, rarity conflict resolution, one-way and return fuel formulas, secured migration definitions, KeyBot parity, and JavaScript syntax.
