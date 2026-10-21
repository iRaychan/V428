# KeySuite V4.29.17

## Fixed

- Safari no longer remains indefinitely on “Checking existing session…” when Supabase session initialization does not settle.
- Authentication startup now finishes its initial session read before subscribing to auth-state changes, avoiding the documented persisted-session initialization race in older Supabase browser clients.
- The Supabase UMD browser dependency is pinned to version 2.118.0 instead of resolving a moving `@2` URL.
- Session checks and password sign-in have a 12-second safety bound and return to a usable login screen with a clear message.

## Preserved

- All V4.29.16 quotation integrity, scope and quantity corrections.
- Integrated KeyHQ, KeyBot, role sharing, floor simulation and Kuala Lumpur lighting behavior.
- All other KeySuite modules and database migrations.
