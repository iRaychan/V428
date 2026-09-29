# KeySuite V4.28.38 Upgrade

This release corrects the oversized appearance of B.G.Reich ES and BFI under Selection. Both now use CHC Selection's compact 1220 px workspace, 330 px input column and contained outer card. Their result areas still keep the corresponding Product Curve chart composition.

Upload all contents of the V4.28.38 Upgrade package over V4.28.37, preserving the folder paths. For an earlier installation, use the Full package. Back up the installation first and preserve your deployment-specific `config.js`. No database migration is required.

After deployment, reload the application and confirm V4.28.38. Compare Selection → B.G.Reich → CHC, BFI and ES. Their overall visual scale and outer containment should align, while BFI and ES retain their family-specific Product chart layouts.
