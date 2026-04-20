function doPost(e) {
  // Specify your target Google Sheet ID here, or use active spreadsheet if attached
  // const SHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
  // const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
  
  // If the script is bound to a spreadsheet:
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  try {
    // Check if there's post data
    if (typeof e !== 'undefined' && e.postData && e.postData.contents) {
      const data = JSON.parse(e.postData.contents);
      
      const timestamp = data.timestamp || new Date().toISOString();
      const location = data.location || 'Unknown';
      const sentiment = data.sentiment || 'Unknown';
      
      // Append row to sheet: [Timestamp, Location, Sentiment]
      sheet.appendRow([timestamp, location, sentiment]);

      return ContentService.createTextOutput(JSON.stringify({ 'status': 'success' }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      return ContentService.createTextOutput(JSON.stringify({ 'status': 'error', 'message': 'No data received' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 'status': 'error', 'message': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Handle GET requests to verify the webhook is alive
function doGet(e) {
  return ContentService.createTextOutput("Feedback Kiosk Webhook is active.");
}
