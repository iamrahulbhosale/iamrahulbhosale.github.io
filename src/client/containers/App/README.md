# App Component <App/>

Responsible for rendering the application routes, and any overlay dialogs.  
Configuration is kept to react-router v4

In production, webpack switches the files `getStaticoutes.js` with `getDynamicRoutes.js`

The only important requirement is to keep these 2 files in sync.

### <AuthRoute/>

This component checks for valid authentication before a route is loaded
In case of invalid authentication the default is to redirect to home `/`

### AsyncComponent HOC

This allows for code-splitting.  
Use this in `getDynamicRoutes.js` only.

A loading and error state mechanism is provided to handle component loading.
