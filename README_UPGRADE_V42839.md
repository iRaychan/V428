# KeySuite V4.28.39 Upgrade

This release makes B.G.Reich ES under Selection run inside a dedicated Product Curve panel. After loading, the Selection ES iframe receives the same `product-frame` and `ks3963-product-es` layout treatment as Product ES. Workspace width, input column, chart grid, visibility rules and surrounding panel are now shared while duty-based pump selection remains available.

Upload all contents of the V4.28.39 Upgrade package over V4.28.38, preserving the folder paths. For an earlier installation, use the Full package. Back up the installation first and preserve your deployment-specific `config.js`. No database migration is required.

After deployment, reload the application and confirm V4.28.39. Compare Selection → B.G.Reich → ES with Product → B.G.Reich → End Suction → Curve. Both should use the Product Curve panel and the same ES layout geometry.
