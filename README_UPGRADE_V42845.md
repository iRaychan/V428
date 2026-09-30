# KeySuite V4.28.45 Upgrade

This release removes the oversized first-open flash from Selection CHC C4 and C6. Safari previously laid out the CHC iframe while its page was hidden, using a small fallback viewport; navigating away and back supplied the missing layout pass. V4.28.45 measures the visible CHC host, forces that layout pass automatically, and reveals the iframe only after its responsive width is stable.

Upload all contents of the V4.28.45 Upgrade package over V4.28.41, preserving the folder paths. For an earlier installation, use the Full package. Back up the installation first and preserve your deployment-specific `config.js`. No database migration is required.

After deployment, reload the application and confirm V4.28.45. From Dashboard, open Selection → B.G.Reich → CHC C4, then repeat with CHC C6 after another fresh reload. Both selectors must appear at their normal scale on the first visit without navigating away and back.
