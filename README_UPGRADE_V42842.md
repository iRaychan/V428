# KeySuite V4.28.42 Upgrade

This release makes B.G.Reich ES under Selection use the real Product Curve panel. The Selection iframe is mounted directly in the same `productCurveDialog` and `productCurveHost` used by Product ES. The separate Selection imitation wrapper—which gave Safari an oversized canvas and clipped the right side—has been removed.

Upload all contents of the V4.28.42 Upgrade package over V4.28.41, preserving the folder paths. For an earlier installation, use the Full package. Back up the installation first and preserve your deployment-specific `config.js`. No database migration is required.

After deployment, reload the application and confirm V4.28.42. Open Selection → B.G.Reich → ES at normal and narrower window widths. The complete panel must remain inside the page, with controls and charts stacking instead of clipping horizontally.
