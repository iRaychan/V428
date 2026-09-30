# KeySuite V4.28.43 Upgrade

This release applies the proven ES layout correction to B.G.Reich BFI under Selection. Both Selection ES and Selection BFI now mount their existing selector iframe directly in the real `productCurveDialog` and `productCurveHost` used by Product. BFI no longer runs inside the normal Selection page/card wrapper, so it inherits the same Product BFI canvas, input column, curve grid and responsive sizing.

Upload all contents of the V4.28.43 Upgrade package over V4.28.41, preserving the folder paths. For an earlier installation, use the Full package. Back up the installation first and preserve your deployment-specific `config.js`. No database migration is required.

After deployment, reload the application and confirm V4.28.43. Open Selection → B.G.Reich → BFI and compare it with Product → B.G.Reich → BFI → Curve. The complete BFI panel must use the same geometry and remain inside the page at normal and narrower window widths.
