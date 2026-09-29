# KeySuite V4.28.40 Upgrade

This release makes B.G.Reich ES under Selection fit within the available KeySuite page. It retains the dedicated Product Curve panel and shared `product-frame` layout, while adding Selection-specific width containment, safe shrinking and responsive stacking. Horizontal clipping is prevented without changing Product ES or the duty-based selection workflow.

Upload all contents of the V4.28.40 Upgrade package over V4.28.39, preserving the folder paths. For an earlier installation, use the Full package. Back up the installation first and preserve your deployment-specific `config.js`. No database migration is required.

After deployment, reload the application and confirm V4.28.40. Open Selection → B.G.Reich → ES at normal and narrower window widths. The complete panel must remain inside the page, with controls and charts stacking instead of clipping horizontally.
