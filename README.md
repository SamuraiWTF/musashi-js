# musashi-js
[![Build Status](https://travis-ci.org/SamuraiWTF/musashi-js.svg?branch=master)](https://travis-ci.org/SamuraiWTF/musashi-js)

Musashi.js is a set of Node applications for demonstrating web security concepts. Created for use in Samurai WTF.

## Applications Ready for General Use
 - CORS Demonstrator
 - CSP Demonstrator

 ## Unusable Applications (Work-in-Progress or Roadmap)
 - JWT Demo
 - OAuth Demonstrator
 - Sandbox for CSRF, CORS, XSS exercises
 - Help page

## Starting the services
You need Node and Yarn installed an in the path.
 1. Clone this repo
 2. `yarn install`
 3. Create a `.env` that's appropriate to your environment. The [sample.env](sample.env) file is available as a reference. Detailed further in the following section.
 4. `yarn start`

## Customizing your .env
There are a handful of settings in the `.env` file. Here's what they are and what they do:
 - **CORS_API_PORT** (default: `3020`) - Port to bind to for the CORS Demonstrator API
 - **CORS_API_HOST** (default: `localhost:3020`) - Hostname for the CORS Demonstrator API, used to populate defaults in the CORS demo client
 - **CORS_CLIENT_HOST** (default: `localhost:3021`) - Hostname for the CORS demonstrator client, used to dynamically generate Regex-based CORS policies
 - **CORS_CLIENT_PORT** (default: `3021`) - Port to bind to for the CORS client
 - **OAUTH_PROVIDER_PORT** (default: `3030`) - Port to bind to for the OAuth Identity Provider *(Currently disabled)*
 - **OAUTH_CLIENT_PORT** (default: `3031`) - Port to bind to for the OAuth Client app *(Currently disabled)*
 - **CSP_APP_PORT** (default: `3041`) - Port to bind to for the Content Security Policy demo app
 - **USE_TLS** (default: `FALSE`) - Affects the protocol used in the CORS demonstrator to call the API. `TRUE` for **https**, `FALSE` for **http**. *This does not actually enable TLS on the listener at this time. It's useful if going through a reverse-proxy with TLS enabled. In a future release, it will be required that this be TRUE. This is due to coming changes in standard browser behavior around cookies.*
 - **KEYSTORE_FILE** (default: undefined) - Optional path to a PKCS#12 keystore file for using a self-signed certificate. For example, this can be an exported certificate from Burp Suite. Note that USE_TLS must be `TRUE` for this to function properly.
 - **KEYSTORE_PASS** (default: undefined) - Required if `KEYSTORE_FILE` is defined. It is the passphrase for the keystore file.

Here's a default local dev configuration:
```
CORS_API_PORT=3020
CORS_API_HOST=localhost:3020
CORS_CLIENT_HOST=localhost:3021
CORS_CLIENT_PORT=3021
OAUTH_PROVIDER_PORT=3030
OAUTH_CLIENT_PORT=3031
CSP_APP_PORT=3041
USE_TLS=FALSE
```

## CORS Demonstrator
### Usage
 1. Open the CORS Client app, which is on localhost:3021 by default.
 2. The API URL box will indicate the actual hostname/port that will be targeted for your API. If you're not using a reverse proxy or hostname resolution, localhost:3020 would be the right default value here. This value can be modified in the *Settings* page if necessary, although only the home page will be affected. Typically if this is incorrect, it should be corrected in the `.env` which will necessitate restarting the application.
 3. The policy selector on the top right lets you set which CORS policy you're reaching the on the server. The Regex option is dynamically generated based on the **CORS_CLIENT_HOST** supplied in the `.env` file. It allows that Origin, and subdomains of that Origin.
 4. Down the left side of the *Home* page are a variety of request types. The Auth one will take any set of credentials and will set a cookie. It is *never* blocked by a CORS policy. The other request types all require an auth cookie.
 5. The *Exercises* each provide a scenario, a goal (success condition), and the ability to generate a sample request. Note that the `Origin` header in the sample request may not be an allowed Origin in the context of the exercise. The scenario will explain what the intended behavior is. Exercises are completed by modifying the request in your interception proxy until the goal is met. There is no automatic detection of a success, it is up to the student to determine based on the response if they have met the goal.

### Additional notes
 - Some of the HTTP Methods used will always trigger a CORS preflight (e.g. PUT and DELETE)
 - When set to Same-Origin (no CORS policy), the CORS middleware isn't used at all, and therefore preflights will get an Unauthorized response.


 ## CSP Demonstrator
 ### Usage
  1. Open the CSP app, which is localhost:3041 by default. This should match the port specified in your `.env`.
  2. The home page provides the ability to execute XSS-style JavaScript payloads in through both reflected and DOM-based interactions. There is no filtering on these.
  3. The *Set CSP* page allows you to set a custom content-security-policy. This applies across the application, except on the *Set CSP* page itself. It may not have every directive, but the all of the common ones and some of the uncommon ones are included. Including the string `$nonce` in any of the directives will have it replaced with an actual generated nonce at dynamically when the policy header is served.
  4. Each of the *Execises* provides a CSP bypass or evasion challenge. They each have a button that replaces the application's CSP with the challenge CSP. They also have directions explaining the success condition for the exercise.
 
## Running from a docker container
We have a Dockerfile!  So you can build and run the dockerized version as a convenience.

### Building the docker image
```
docker build -t musashi-js .
```
### Running the docker image
```
docker run -p 3020:3020 -p 3021:3021 -p 3030:3030 -p 3031:3031 -p 3041:3041 musashi-js
```

_Note: The ports are mapped to the same ports as the default configuration.  If you change the ports in your .env file, you will need to change the port mappings in the docker run command._