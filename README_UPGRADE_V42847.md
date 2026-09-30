# KeySuite V4.28.47 Upgrade

This release corrects the last CHC and BFI curve presentation details. Selection → CHC C6 now reloads once only after its selector host is visible, so its very first Safari render uses the same compact layout seen after switching away and back. CHC C4 and C6 both show the shared `CHC Series` heading. Selection and Product BFI Power curves now extend smoothly to a positive shut-off power at zero flow instead of incorrectly beginning at zero.

Upload all contents of the V4.28.47 Upgrade package over V4.28.41, preserving the folder paths. For an earlier installation, use the Full package. Back up the installation first and preserve your deployment-specific `config.js`. No database migration is required.

After deployment, reload the application and confirm V4.28.47. From Dashboard, open Selection → B.G.Reich → CHC C6 directly and confirm the first view is compact. Open CHC C4 and confirm the heading reads `CHC Series`. Finally, select a BFI pump in both Selection and Product Curve and confirm the Power curve has a positive value at zero flow.
