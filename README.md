# GoogleSheetsToPlayFab
This is a JavaScript that runs in Google Sheets to export a spreadsheet to a PlayFab catalog in uploadable JSON format.

To use it with your Google Sheet:
* Create or open a sheet in Google Sheets
* Select the menu item Tools > Script editor. If you are presented with a welcome screen, click Blank Project on the left to start a new project.
* Replace the code in the script editor with the code from ExportCatalogJSON.js included here.
* Change the value of the catalogVersion variable to match your desired PlayFab catalog version name.
* Select the menu item File > Save. Give the script project a name and click OK.
* After reloading the spreadsheet, you'll see a PlayFab menu item in the menu bar.
* Make sure you have the catalog sheet selected when you run the function.

See Google Apps Script documentation for more info about extending and customizing this script:
https://developers.google.com/apps-script/guides/sheets/functions
