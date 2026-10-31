# Upgrade V5.00.17 to V5.00.18

This overlay is specifically for the older attached V5.00.17 build (`KeySuite_V5.00.17_FULL_BUILD 01.zip`).

1. Back up the current application directory.
2. Copy the contents of the upgrade ZIP over the V5.00.17 application root, preserving paths and replacing matching files.
3. No additional production Supabase migration is needed: the required KV migrations are already deployed. The SQL files remain included for clean environments.
4. Clear the browser/service-worker cache once after deployment.
5. Run `node tests/v50018-regression.cjs` if Node.js is available.

GitHub is not used.
