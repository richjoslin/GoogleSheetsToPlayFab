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

      // TODO: populate custom data
      // var customData = {};
      // catalogItem["CustomData"] = Utilities.jsonStringify(customData);
      catalogItem["CustomData"] = null;

      // TODO: other catalog fields
      catalogItems.push(catalogItem);
    }
  }

  var wrapper = {
    "CatalogVersion": "PreAlpha2",
    "Catalog": catalogItems
  };

  var app = UiApp.createApplication().setTitle('Exported JSON');
  var textArea = app.createTextArea().setWidth('100%').setHeight('200px').setId("json").setName("json");
  app.add(textArea);
  app.getElementById('json').setText(Utilities.jsonStringify(wrapper));
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.show(app);
  return app;
}
