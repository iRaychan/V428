# KeySuite V4.28.48 Upgrade

This release adds a macOS Safari-only quotation print fit. Safari's native print preview can apply the selected printer's physical margins to the full A4 quotation canvas and turn two logical pages into four sheets. V4.28.48 fits that unchanged canvas into Safari's printable area. Windows and other browsers keep the existing locked quotation/PDF output without any scaling or layout change. All V4.28.47 CHC, BFI, ES and power-curve corrections remain included.

Upload all contents of the V4.28.48 Upgrade package over V4.28.41, preserving the folder paths. For an earlier installation, use the Full package. Back up the installation first and preserve your deployment-specific `config.js`. No database migration is required.

After deployment, reload the application and confirm V4.28.48. On macOS Safari, open a two-page quotation from Quote History and confirm the native print preview reports two pages. On Windows, confirm the quotation preview remains identical to V4.28.47.
