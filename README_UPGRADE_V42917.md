# Upgrade KeySuite V4.29.16 to V4.29.17

1. Back up the deployed site.
2. Upload every file listed in `UPGRADE_FILE_MANIFEST_V42917.txt`, preserving paths.
3. Confirm the site displays V4.29.17.
4. In Safari, reload the site and confirm an existing session enters KeySuite or the sign-in form appears within 12 seconds.
5. Sign in and confirm the Dashboard, Quotation and KeyHQ open normally.

No new Supabase migration or Edge Function deployment is required.
