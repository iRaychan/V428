# KeySuite V4.28.46 Upgrade

This release synchronizes Product → B.G.Reich → BFI Curve with its live Pump Material and Motor Phase controls. A 3 Phase SS304 model displays as `BFI 10-3T`; switching to 1 Phase removes `T`, and switching Pump Material to Stainless Steel 316 changes the family prefix to `BFIN`. The curve heading, selected-pump card, PDF/quotation payload and surrounding Product Curve title now update together.

Upload all contents of the V4.28.46 Upgrade package over V4.28.41, preserving the folder paths. For an earlier installation, use the Full package. Back up the installation first and preserve your deployment-specific `config.js`. No database migration is required.

After deployment, reload the application and confirm V4.28.46. Open Product → B.G.Reich → BFI → BFI 10-3T → Curve. Change Supply between 3 Phase and 1 Phase, then change Pump Material between Stainless Steel 304 and Stainless Steel 316. The displayed model must immediately follow the chosen combination, including `T` only for 3 Phase and `BFIN` for SS316.
