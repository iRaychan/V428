# KeySuite V4.28.35 Upgrade

This release includes the macOS selector layout correction, the ES Product two-column series layout, corrected ES impeller flow ranges, faster PDF printing, matching natural power curves in CHC Selection and Product, and BFI Selection aligned to the approved Product BFI curve method.

Upload all contents of the V4.28.35 Upgrade package over V4.28.34, preserving the folder paths. For an earlier installation, use the Full package. Back up the installation first and preserve your deployment-specific config.js. No database migration is required.

The upgrade is generated from byte differences against V4.28.34, including the new shared power-curve.js dependency and updated page loaders. Deploy the files together, then reload the application and confirm V4.28.35.

This release removes the ES macOS expanded-body width workaround and constrains both Selection and Product layouts. CHC/ES shutoff power is an estimate for display, not manufacturer test data; hydraulic calculations and motor sizing are unchanged. BFI retains the specifically approved Product curve method in both routes.

See VERIFICATION_V42835.md for automated results and the remaining manual Safari/PDF checks. This package has not been visually verified in Safari in this session.
