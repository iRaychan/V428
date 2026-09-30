# KeySuite V4.28.44 Upgrade

This release restores Selection BFI with a visible startup fallback and re-synchronizes it with the shared Product Curve panel after every page, brand and Selection navigation change. It also reorganizes the Selection menu into the requested top-level order: `B.G.Reich`, `Tesk`, then `Brand`. Other selling brands remain under `Brand`.

Upload all contents of the V4.28.44 Upgrade package over V4.28.41, preserving the folder paths. For an earlier installation, use the Full package. Back up the installation first and preserve your deployment-specific `config.js`. No database migration is required.

After deployment, reload the application and confirm V4.28.44. Expand Selection and verify the order `B.G.Reich`, `Tesk`, `Brand`. Open Selection → B.G.Reich → BFI and confirm the complete BFI panel appears immediately and uses the Product BFI geometry.
