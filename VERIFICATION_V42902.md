# KeySuite V4.29.02 Verification

Run:

```text
node tests/v42902-release-regression.cjs
```

Expected result:

```text
V4.29.02 ES/BFI alternative-model restoration regression: PASS
```

The regression verifies version metadata, confirms ES and BFI Product curve CSS no longer hides their alternative panels, confirms CHC and CR still hide those panels, and confirms no selector calculation/data file is included in the upgrade.
