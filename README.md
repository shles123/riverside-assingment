## Envoirment Setup:

  ### **Configure Environment Variables**

   **Backend** - Create a `.env` file in the `backend/` directory:
   ```bash
   cp backend/.env.example backend/.env
   ```

   **Frontend** - Create a `.env` file in the `frontend/` directory:
   ```bash
   cp frontend/.env.example frontend/.env
   ```

  ### **Installation:**
    npm install
    npm run dev

  **What ports it runs on:**
    Frontend: http://localhost:5173
    Backend: http://localhost:5001



  ### Project Structure

  ```
  riverside-assignment/
  ├── backend/
  │   ├── src/
  │   │   ├── models/
  │   │   │   └── dataStore.js       # Data access layer
  │   │   ├── routes/
  │   │   │   └── riskRoutes.js      # API risk route handler
  │   │   ├── services/
  │   │   │   └── riskService.js     # Business logic
  │   │   └── server.js              # Express server entry point
  │   ├── data/
  │   │   ├── users.json             # User data
  │   │   └── sessions.json          # Session data
  │   ├── .env.example               # Environment variables template
  │   └── package.json
  ├── frontend/
  │   ├── src/
  │   │   ├── hooks/
  │   │   │   ├── useRiskSessions.jsx    # Session fetching hook
  │   │   │   └── useTriggerRecovery.jsx # Recovery trigger hook
  │   │   ├── App.jsx                # Dashboard
  │   │   └── App.css                # Styles
  │   ├── .env.example               # Environment variables template
  │   └── package.json
  ├── .gitignore
  └── README.md
  ```

---

## Security

for this assignment we are using a local .env file to store our API keys. In a production environmnet we could use a secrets manager like AWS secrets manager or HashiCorp Vault for example. In terms of rotation strategy we could implement a system that rotates API keys on a regular basis i.e. every 30-90 days. In addition we can configure a monitoring system to alert us of any unusual activity and trigger an emergency rotation protocol. 

---

## Error Handling

On the backend we have a global error handler that catches all errors, logs them to the console and returns a consisten JSON response with the corresponding status code and error message.

on the frotend we use custom react hooks to handle our API request and handle errors. We catch and store these erros and translate them into user friendly pop ups to display to the user.

For this current assigmnet we have, 500 internal server errors, 404 API route not found and 400 bad request errors. In a more advanced system with users and permissions we would also have 401 unauthorized and 403 forbidden erorrs

---

## Data Handling

When extracting data for our at-risk dashboard we filter out any user or sessions that dont have a valid id field. Without this field we cannot connect a sessiont to a user or trigger a recovery for a session. In a more robust system we could store these imcomplete records in a seperate database or display them in a seperate view for manual review. Other than the critical fields, we have secondary priority fields that instead of filtering out we have dafault values for them. If time since start is uknown we defualt to infinity incase there ticket has been open for a long time. If the user email or session name is missing we default aswell to unknown values. This is obviously not ideal but better than filtering them out entirely and 