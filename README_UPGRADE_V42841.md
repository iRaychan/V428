# KeySuite V4.28.41 Upgrade

This release makes B.G.Reich ES under Selection fit within the available KeySuite page. It retains the dedicated Product Curve panel, pins the iframe viewport to the panel's measured width, and uses the same `product-frame` rules as Product ES. The old Selection-only fit layer has been removed so it can no longer compete with Product geometry.

Upload all contents of the V4.28.41 Upgrade package over V4.28.40, preserving the folder paths. For an earlier installation, use the Full package. Back up the installation first and preserve your deployment-specific `config.js`. No database migration is required.

After deployment, reload the application and confirm V4.28.41. Open Selection → B.G.Reich → ES at normal and narrower window widths. The complete panel must remain inside the page, with controls and charts stacking instead of clipping horizontally.
