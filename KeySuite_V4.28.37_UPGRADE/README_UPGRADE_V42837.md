# KeySuite V4.28.37 Upgrade

This release makes B.G.Reich ES and BFI Selection use the actual Product Curve layout rather than only adding overflow containment. ES now shares the Product top-control, input-column and chart-grid dimensions. BFI shares the Product content width, input column and chart-grid dimensions. Both Selection routes also use the same flat outer frame as Product Curve instead of the old rounded clipping card.

Upload all contents of the V4.28.37 Upgrade package over V4.28.35 or V4.28.36, preserving the folder paths. For an earlier installation, use the Full package. Back up the installation first and preserve your deployment-specific `config.js`. No database migration is required.

After deployment, reload the application and confirm V4.28.37. Compare Selection → B.G.Reich → ES/BFI with the corresponding Product Curve screens; their outer shell, input column and chart grid should now align.
