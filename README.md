# musashi-js
Musashi.js is a set of Node applications for demonstrating web security concepts. Created for use in Samurai WTF.

***Only the CORS Demonstrator is ready for general use at this time, the other parts are still under development***

## Starting the services
You need Node and Yarn installed an in the path.
 1. Clone this repo
 2. `yarn install`
 3. `yarn start`

Console output will discribe which servers are listening on which ports. To override these, add a `.env` file with your own port specifications. The [sample.env](sample.env) file is available as a reference.

## CORS Demonstrator
### Usage
 1. Open the CORS Client app, which is on localhost:3021 by default.
 2. Set the API URL textbox to the actual hostname/port for your API. If you're not using a reverse proxy or hostname resolution, localhost:3020 would be the right default value here.
 3. The policy selector on the top right lets you set which CORS policy you're reaching the on the server. *_NB: The Pattern option uses a hardcoded regex for cors.dem missing the front anchor. If you don't have a compliant hostname set for the client (e.g. client.cors.dem), you will likely want to tamper with the Origin header using a MITM proxy to demonstrate this._*
 4. Down the left side are a variety of request types. The Auth one will take any set of credentials and will set a cookie. It is *never* blocked by a CORS policy. The other request types all require an auth cookie.

### Additional notes
 - Some of the HTTP Methods used will always trigger a CORS preflight (e.g. PUT and DELETE)
 - When set to Same-Origin (no CORS policy), the CORS middleware isn't used at all, and therefore preflights will get an Unauthorized response.
 
