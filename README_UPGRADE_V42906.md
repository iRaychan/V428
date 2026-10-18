# KeySuite V4.29.06 Upgrade

## Changes

- Company & Pricing now shows **Models** for distinct loaded product models across all families and **Models With Price** for models with at least one populated USD, RMB or MYR price. Each model is counted once even when several variants or currencies have prices.
- Fuel settings now include owner-editable **Fuel Efficiency**, defaulting to 6.3 km/L, and **Return Journey** Yes/No.
- Fuel surcharge uses `(Distance × Journey Multiplier ÷ Fuel Efficiency) × max(Current Fuel Price − Base Fuel Price, 0)`, where the multiplier is 2 for Return Journey Yes and 1 for No.
- Rarity is model-variant data rather than currency data. Saving one currency applies its rarity to USD, RMB and MYR.
- Existing rarity conflicts are normalized by retaining a unanimous value. If values differ, only quoteable priced currencies participate and the priority is Fixed, Rare, Many, then Common. With no quoteable price, the safe default is Common.

## Counter semantics

- A model identity is `product family + model name`; the same name in separate families remains two real catalogue models.
- Materials, phases, pump quantities and currencies do not add extra model counts.
- In schemas that preserve blank as `NULL` (CHC C4/C6, GWS, ES, KeyPLC and Manifold), an entered zero is populated and counts.
- CR, BFI, Motor and Coupling import schemas use zero as the source's blank/unpriced sentinel, so those families require a value above zero for **Models With Price**.

## Deployment

1. Upload the V4.29.06 application files.
2. Run `supabase/migrations/20261018150000_v42906_fuel_and_model_rarity.sql` once.
3. Redeploy the `telegram-webhook` edge function so KeyBot uses the same fuel and rarity rules.

The migration is repeat-safe, backfills existing currency rarity conflicts, protects fuel-setting changes with the existing owner check, and keeps all other pricing behavior unchanged.
