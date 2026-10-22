# KeySuite V4.29.21

- Replaced invented agent tasks, percentages and ETAs with explicit source-backed states.
- Separated live Telegram, connected with no enquiries, demo, locked and unavailable projector modes.
- Added a twenty-second authorized projector refresh and same-origin frame messaging.
- Scoped KeyBot inbox and last-activity queries to the signed-in company.
- Added secure, persistent company floor configuration for Owners and Admins, up to four expansion floors.
- Added differentiated departmental furniture, enclosed amenity zones, circulation walls and clearer floor plans.
- Furnished each WC with a toilet bowl, cistern and wall-mounted urinal, and each pantry with a table, legs and seating.
- Rebuilt the tower as a solid modern headquarters with a complete façade, windows, entrance canopy, landscaped base and rooftop courts.
- Changed floor selection to a large Sims-style cutaway workspace with character-like agents instead of a transparent stacked-floor diagram.
- Re-rendered the original Keylargo artwork as deep-blue outlined neon tubing with a narrow cool-white core, mounted directly to the upper façade without a signboard. Its perspective now rotates with the building.
- Replaced line-drawn agent limbs with filled chibi characters including hair, faces, jackets, hands, legs and shoes.
- Added internal asset revision `42921r3` and a fresh service-worker cache to prevent Safari from retaining an earlier V4.29.21 KeyHQ scene.
- Retired the obsolete KeyAI-project inbox dependency: KeySuite Supabase is now the only enquiry source of record.
- Made the KeyBot projector verify the company-scoped KeySuite inbox directly; it never substitutes demo content for a failed live feed.
- Preserved the V4.29.20 quotation save, numbering, history, backup and role-scope behavior.
