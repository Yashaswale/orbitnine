/**
 * ORBIT NINE - GOOGLE APPS SCRIPT WEB APP
 * 
 * Instructions to connect your Google Sheet:
 * 1. Open your Google Sheet in your browser.
 * 2. Click "Extensions" > "Apps Script" in the top menu.
 * 3. Delete any default code in Code.gs and paste this ENTIRE file into the editor.
 * 4. Click "Deploy" (top right button) > "New deployment".
 * 5. Click the gear icon next to "Select type" and choose "Web app".
 * 6. Set Description: "Orbit Nine Form Webhook".
 * 7. Set "Execute as": "Me" (your Google account).
 * 8. Set "Who has access": "Anyone" (VERY IMPORTANT: allows website visitors to submit).
 * 9. Click "Deploy". Authorize permissions when prompted by Google.
 * 10. Copy the "Web app URL" (starts with https://script.google.com/macros/s/.../exec).
 * 11. Paste that URL into .env as:
 *     VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/.../exec
 *     or in src/components/EnquiryForm.jsx as the default GOOGLE_SHEETS_WEBHOOK_URL.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Column headers
    var headers = [
      'Timestamp',
      'Audience',
      'Interests',
      'Full Name',
      'Email',
      'Phone / WhatsApp',
      'Company / Organisation',
      'LinkedIn Profile',
      'Country / Region',
      'Preferred Contact Method',
      'Enquiry Message',
      'Additional Details'
    ];

    // If sheet is empty or headers missing, write headers first
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#0d1b2a');
      headerRange.setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    }

    // Parse submitted payload
    var data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    } else {
      data = {};
    }

    var row = [
      data.timestamp || new Date().toLocaleString(),
      data.audience || '',
      data.interests || '',
      data.fullName || '',
      data.email || '',
      data.phone || '',
      data.company || '',
      data.linkedin || '',
      data.country || '',
      data.contactMethod || '',
      data.enquiryText || '',
      data.additionalDetails || ''
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success', row: sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'Orbit Nine Google Sheet Webhook is active and running.' }))
    .setMimeType(ContentService.MimeType.JSON);
}

