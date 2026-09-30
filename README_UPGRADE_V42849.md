# KeySuite V4.28.49 Upgrade

This release removes the floating round return button from quotation printouts and changes the rule below the page-2 item headings, including `Pos.`, to the quotation's dark navy `#17365D`. The page dimensions, content positions and existing rule thickness remain unchanged. The macOS Safari two-page print fitting from V4.28.48 remains included, while Windows keeps its existing page sizing and layout.

Upload all contents of the V4.28.49 Upgrade package over V4.28.41, preserving the folder paths. For an earlier installation, use the Full package. Back up the installation first and preserve your deployment-specific `config.js`. No database migration is required.

After deployment, reload the application and confirm V4.28.49. Open a two-page quotation from Quote History and confirm the round button is absent from page 1. On page 2, confirm the rule below `Pos.`, `Qty`, `Unit Price` and `Total` is dark navy and retains its previous thin weight. On macOS Safari, also confirm the preview still reports two pages.
