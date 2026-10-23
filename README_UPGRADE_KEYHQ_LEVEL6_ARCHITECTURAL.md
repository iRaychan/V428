# KeyHQ Level 6 Architectural Office Update

Baseline: **KeySuite V4.29.22 / KeyHQ V0.4 Living Office**  
Built: **24 October 2026**  
Database migration: **none**

This bounded update replaces only the Level 6 visual layout and monitor input handling. It preserves the existing KeySuite launcher, authentication, company-scoped Supabase RPCs, Owner-only assignment controls, dynamic desk capacity and assignments, avatars and movement, KeyBot data, and original quotation PDF handoff.

## Level 6 changes

- Rectangular professional office shell with a warm neutral floor and light architectural walls.
- Connected four-person workstation islands with wood desks, shared dark divider spines, larger monitors, desk numbers, assigned names, task chairs, and integrated plants.
- Full-height glass meeting room with a timber conference table, eight seats, display wall, and framed glazing.
- Detailed pantry with full-height cabinets, worktop, appliance, sink, island, stools, and planting.
- Fully enclosed WC with opaque walls, framed door opening, toilet, basin, and mirror.
- Full-height storage wall, welcome lounge, coffee table, plants, and clearer circulation.
- Adaptive desk-island layouts for one through seven four-person groups without changing secure desk numbering.

## Monitor input changes

- Invisible monitor targets increase from 28×20 px to 64×52 px.
- Canvas raycast radius increases to 32 px and continues to take priority over avatar selection.
- Pointer movement uses a 9 px Euclidean threshold to distinguish orbit dragging from clicking.
- Pointer cancellation clears pending clicks.
- Overlay monitor controls use the same movement threshold and open on pointer-up only when no drag occurred.

Copy the paths in `UPGRADE_FILE_MANIFEST_KEYHQ_LEVEL6_ARCHITECTURAL.txt` over a complete KeySuite V4.29.22 installation. No Supabase migration or access-policy change is required. Production Supabase was checked on 24 October 2026: the existing KeyHQ migrations are present, the project is healthy, and the relevant RPC permissions remain intact. Static web deployment is separate and was not performed because GitHub deployment was explicitly excluded.
