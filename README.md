# Feedback Kiosk

A premium, tablet-optimized single-page web application to collect user feedback ("Happy" or "Sad"). The app captures the location from the URL and sends the response to a Google Sheet.

## 🚀 Setup Instructions

### 1. Backend (Google Sheets & Apps Script)
To store the incoming feedback, we use a Google Sheet combined with Google Apps Script.

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet named "Feedback Kiosk Results".
2. Create column headers in row 1: **Timestamp**, **Location**, **Sentiment**.
3. In the top menu, click **Extensions > Apps Script**.
4. Delete any code in the script editor and copy-paste the contents of `google_apps_script.gs` into it.
5. Save the project (Ctrl+S / Cmd+S).
6. Click the blue **Deploy** button at the top right and select **New deployment**.
7. In the "Select type" gear icon, choose **Web app**.
8. Set the configuration as follows:
   - **Description**: "Feedback Webhook v1"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone"
9. Click **Deploy**. (You may need to authorize the script; follow the prompts, click "Advanced", and proceed).
10. Copy the generated **Web app URL**.

### 2. Frontend Configuration
1. Open `script.js` in your code editor.
2. Locate the line at the top:
   ```javascript
   const WEBHOOK_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";
   ```
3. Replace `"YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL"` with the Web app URL you copied in the previous step.

### 3. Running the Kiosk
You can host this static site on any platform (e.g., GitHub Pages, Vercel, Netlify, or simply open `index.html` in a browser).

#### Setting the Location
The kiosk uses a URL parameter to know where it is deployed. When opening the app on a tablet, append `?location=YourLocationName` to the URL.

**Examples:**
- `https://your-domain.com/?location=Canteen`
- `https://your-domain.com/?location=Front_Desk`
- `https://your-domain.com/?location=Meeting_Room_A`

If no location is provided, it defaults to "Unknown Location".

## 🎨 Features
- **Responsive & Full-Screen**: Designed for tablet kiosks.
- **Premium Aesthetics**: High contrast, subtle gradients, and glassmorphism elements.
- **Micro-Animations**: Satisfying click interactions and smooth view transitions.
- **Auto-Reset**: The "Thank You" screen automatically returns to the feedback screen after 3 seconds.
