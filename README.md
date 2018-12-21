# hackaton-weecop

## Installation, and Configuration
1. Clone project.
2. Run `npm install` from inside the 
  a) /API, and the
  b) /web-app folders.
3. Follow Step 1 described [here](https://developers.google.com/calendar/quickstart/nodejs), and save the credentials.json file in the /API folder. 
4. Rename this file "client_secret.json".
5. In the /API folder, run `node getToken()`.

## Running the app
1. From inside the /API folder: run `node index.js`.
2. Simultaneously, from inside the /web-app folder, run `ng serve`.
3. Access `http://localhost:4200/` in browser.
