# GoogleSheetsToPlayFab
This is a JavaScript that runs in Google Sheets to export a spreadsheet to a PlayFab catalog in uploadable JSON format.

To use it with your Google Sheet:
* Create or open a sheet in Google Sheets
* The first row of the sheet should contain column names. You can have as many arbitrary columns as you like, but only the columns that match column names in the export script will be included in the exported JSON (currently: ItemId, ItemClass, CatalogVersion, DisplayName, Description).
* Freeze the first row: View > Freeze > 1 row
* Select the menu item Tools > Script editor. If you are presented with a welcome screen, click Blank Project on the left to start a new project.
* Replace the code in the script editor with the code from ExportCatalogJSON.js included here.
* Change the name of the sheet by double-clicking the tab near the bottom of the sheet. This name will be the name used for the catalog version.
* Select the menu item File > Save. Give the script project a name and click OK.
* After reloading the spreadsheet, you'll see a PlayFab menu item in the menu bar.
* Make sure you have the catalog sheet selected and then run the function from the menu item.
* Copy the text that is displayed, and save it in a text file.
* Use your PlayFab Game Manager to upload the file to add/overwrite your catalog.

See Google Apps Script documentation for more info about extending and customizing this script:
https://developers.google.com/apps-script/guides/sheets/functions
