# General Information

This application is a version of PulseTile-ReactAdmin project, which used NodeRed tool as a server side. Client side of the project is based on ReactAdmin framework as same as all other versions of this project.

# Tools and Technologies 

**React-Admin** is a framework based on ReactJS-library. Basis functionality of this tool is adaptated to create the client side of CMS.

It was developed and maintains by french Marmelab company.

Tutorial for React-Admin framework is available by this link: https://marmelab.com/react-admin

**Node-RED** is a flow-based programming tool for wiring together hardware devices, APIs and online services in new and interesting ways.

It provides a browser-based editor that makes it easy to wire together flows using the wide range of nodes in the palette that can be deployed to its runtime in a single-click.

It was developed by IBM’s Emerging Technology Services team and now a part of the JS Foundation.

Tutorial for Node-Red is available by this link: https://nodered.org

We are combining **NodeRed** and **Redis** as separate elements in this project.

**Redis** is an open source (BSD licensed), in-memory data structure store, used as a database, cache and message broker. It supports data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs, geospatial indexes with radius queries and streams. More information about this technology is presented by this link: https://redis.io/

# Initial project component

The initial point of the project is `/index.js` file, which renders `/core/App.js` file. The last one unites all required parts of application.

```
import React, { Component } from "react";
import { Admin, Resource } from "react-admin";

...
...

const App = () => {
    return (
        <Admin
            authProvider={authProvider}
            customSagas={[customSagas]}
            customReducers={{custom: customReducers}}
            customRoutes={customRoutes}
            dataProvider={customDataProvider}
            dashboard={Homepage}
            appLayout={Layout}
            loginPage={InitializePage}
            locale="en"
            i18nProvider={i18nProvider}
        >
            {
                plugins.map(item => {
                    return (
                        <Resource
                            name={item.name}
                            options={{ label: item.label }}
                            list={item.list}
                        />
                    );
                })
            }
        </Admin>
    );
}

export default App;
```
 
The file `/core/App.js` is used to define the most important parts of project. These parts are defined as attributes of the main component `<Admin />`:
 
 **authProvider** is used to provide following actions: 
 - user login to application;
 - saving information about user (user ID, user name and role) in the browser local storage;
 - user sign out from application.
 
 **dataProvider** is used to provide typical request to the server side and server response handling:
 - to get list of data;
 - to get information about one list item;
 - to create new item;
 - to update information about item;
 - to delete item (it is possible in React-Admin, but it isn't used in PulseTile-ReactAdmin project).
 
 **customSagas** and **customReducers** are used to provide non-typical request to the server side and server response handling. It means, that all requests, which can't be done by basis React-Admin functionality, should be realized by custom Sagas. 
  
 **customRoutes** is used to add custom pages to the application. The main content of any React-Admin application is a list of CRUD pages. These pages are created automatically by React-Admin functionality. If we want to add non-typical pages, we should create custom routes for them.
 
 **dashboard** defines component renders Home page of application (the page where user should be redirected after login).
 
 **appLayout** defines custom Layout of user interface. If this parameter is empty application will use default React-Admin layout.
 
 **loginPage** defines component renders the page where user passes when comes to application.
 
 **locale** and **i18nProvider** are used to provide translation.
 
More information about additional possibilities of this component is presented there: https://marmelab.com/react-admin/Admin.html

# Project structure

React-Admin framework doesn't need in strict compliance to the project structure. Structure of current project is described below:

```
|
|--public
|--src
|----core
|--------actions
|--------common
|--------config
|--------dataProviders
|--------images
|--------pages
|--------plugins
|--------reducers
|--------sagas
|----version
|--index.js
```

The `public/` directory is used to locate fonts, main images, favicon and index.html file.

The `src/` directory include two main directories:
- `core/` for main functionality of application (common for all application versions);
- `version/` for additional functionality, which can be differ in the different project version.
 
The appointment of other directories in the `core/`:
- `actions/` is a storage of actions used for custom operations with reducers and sagas;
- `common/` is used to locate common parts of UI (templates, buttons, toolbars etc.);
- `config/` is used to locate information for configuration (list of plugins, style settings etc.);
- `dataProvider/` is a storage of data providers;
- `images/` is a storage of images which are used as a separate components of React;
- `pages/` is a directory for additional pages (not for CRUDs);
- `plugins/` is a storage of CRUDs;
- `reducers/` is a storage of custom reducers;
- `sagas/` is a storage of custom sagas;

The `version/` directory has similar structure.

# Before installing

Before installing the Generator, you will need the following:

    Node.js 9 or higher
    npm 3 or higher (which comes bundled with Node)
    Git

You can check current versions by:

$ node --version  
$ npm --version   
$ git --version

# Installing 

If you want to install this project at your local machine, it is necessary to do following:

Clone this repository from GitHub:

```
$ git clone https://github.com/PulseTile/PulseTile-RA
```

Install all required dependencies from package.json:
```
$ cd /MyWorkDirectory
$ npm install
```

If you want to run the project at your local machine, you should run the command:
```
$ npm start
```
If you want to create build, you should run the command:
```
$ npm run build
```

After this application is available at your local machine by the link http://[localhost]:3000, but your application can't work because server side hasn't been installed yet.

You should install Node-Red at your local machine:
``` 
$ docker run -it -d -p 1880:1880 --name my-nodered nodered/node-red-docker
$ docker exec -it my-nodered bash
$ npm install node-red-contrib-redis
$ exit
$ docker stop my-nodered
$ docker start my-nodered
$ docker run -it -p 6379:6379 -d -v 'DIRECTORY_PATH'/redis.conf:/usr/local/etc/redis/redis.conf --name my-redis redis redis-server /usr/local/etc/redis/redis.conf
```

Node-Red is available by this link: http://[localhost]:1880

For this reason you should define domain name in the public/index.html file:

``` 
<html>
    <head>
    ...
    </head>
    <body>
        <div id="root"></div>
        <script type="text/javascript">
          window.config = {
            domainName: "http://[my-localhost-name]:1880"
          }
        </script>
    </body>
</html>
```

After this you should import required flows to your local Node-Red. Flows are located inside your project in the /flows directory.
