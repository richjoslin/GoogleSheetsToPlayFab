/*
  Author: Rich Joslin
  Note:
    - This exports the currently selected sheet.
  Assumptions:
    - The sheet must have one single frozen row containing the column names.
    - You can have any number of columns in your sheet, but it must contain at least these:
            ItemId
            ItemClass
            CatalogVersion
            DisplayName
            Description
*/

// CHANGE THIS VARIABLE:
var catalogVersion = "PreAlpha2"; //alternativly can use the sheet / tab name as the catalog name. I use sheet.getName() in the code below


function onOpen()
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var menuEntries = [
    { name: "Export Sheet as Catalog JSON", functionName: "exportCatalog" },
  ];
  ss.addMenu("PlayFab", menuEntries);
}

function exportCatalog(e)
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
    
  var headersRange = sheet.getRange(1, 1, sheet.getFrozenRows(), sheet.getMaxColumns());
  var dataRange = sheet.getRange(sheet.getFrozenRows() + 1, 1, sheet.getMaxRows(), sheet.getMaxColumns());
  var headers = headersRange.getValues()[0];
  var keys = [];
  for (var columnIndex = 0; columnIndex < headers.length; columnIndex++)
  {
    var key = headers[columnIndex];
    if (key.length > 0)
    {
      keys.push(key);
    }
  }

  var catalogItems = [];
  var rows = dataRange.getValues();

  for (var rowIndex = 0; rowIndex < rows.length; rowIndex++)
  {
    if (rows[rowIndex][keys.indexOf("ItemId")] !== "")
    {
      var catalogItem = {};
      catalogItem["ItemId"]         = rows[rowIndex][keys.indexOf("ItemId")];
      catalogItem["ItemClass"]      = rows[rowIndex][keys.indexOf("ItemClass")];
      catalogItem["CatalogVersion"] = rows[rowIndex][keys.indexOf("CatalogVersion")];
      catalogItem["DisplayName"]    = rows[rowIndex][keys.indexOf("DisplayName")];
      catalogItem["Description"]    = rows[rowIndex][keys.indexOf("Description")];
      
      // will be automatically stringified down below.
      catalogItem["CustomData"] = rows[rowIndex][keys.indexOf("CustomData")] !== undefined && rows[rowIndex][keys.indexOf("CustomData")] !== "" ? rows[rowIndex][keys.indexOf("CustomData")] : null;

      // updates for additional catalog fields
      catalogItem["IsTradable"] = rows[rowIndex][keys.indexOf("IsTradable")] !== undefined ? rows[rowIndex][keys.indexOf("IsTradable")] : false;
      catalogItem["IsStackable"] = rows[rowIndex][keys.indexOf("IsStackable")] !== undefined ? rows[rowIndex][keys.indexOf("IsStackable")] : false;
      
      // optionally you may want to include the following line if you are using the character APIs
      // catalogItem["CanBecomeCharacter"] = rows[rowIndex][keys.indexOf("CanBecomeCharacter")] !== undefined ? rows[rowIndex][keys.indexOf("CanBecomeCharacter")] : false;
      
      // catalog fields that are complex objects 
      catalogItem["Tags"] = rows[rowIndex][keys.indexOf("Tags")] !== undefined && rows[rowIndex][keys.indexOf("Tags")] !== "" ? JSON.parse(rows[rowIndex][keys.indexOf("Tags")]) : [];
      catalogItem["VirtualCurrencyPrices"] = rows[rowIndex][keys.indexOf("VirtualCurrencyPrices")] !== undefined && rows[rowIndex][keys.indexOf("VirtualCurrencyPrices")] !== "" ? JSON.parse(rows[rowIndex][keys.indexOf("VirtualCurrencyPrices")]) : null;
     
      // consumables, keeping this simple for now
      catalogItem["Consumable"] = {"UsageCount": null, "UsagePeriod": null, "UsagePeriodGroup": null };
      if( Number(rows[rowIndex][keys.indexOf("UsageCount")]) > 0 )
      {
        catalogItem["Consumable"].UsageCount = Number(rows[rowIndex][keys.indexOf("UsageCount")]);
      }
      
      // bundles & containers would best be edited and upated after uploading to game manager
      
      // conditionally exclude if not meant for this catalog version
      if(catalogItem["CatalogVersion"] === sheet.getName())
      {
        catalogItems.push(catalogItem);
      }
    }
  }

  var wrapper = {
    "CatalogVersion": sheet.getName(),
    "Catalog": catalogItems
  };

  var app = UiApp.createApplication().setTitle('Exported JSON');
  var textArea = app.createTextArea().setWidth('100%').setHeight('200px').setId("json").setName("json");
  app.add(textArea);
  app.getElementById('json').setText(JSON.stringify(wrapper));
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.show(app);
  return app;
}