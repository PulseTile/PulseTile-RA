# NES-version

This project is a client side for NES-version of PulseTile framework. It based on React-Admin framework. 

The main features of the NES-version:

**Multi-patients view** 

User has possibility to review information about all available patients. It is necessary to input patient surname to the user search icon in the topbar and click on the loop. Patient surname should be in lower case. 

List of available patients with this surname will be displayed below. If the database doesn't include information about the patients with this surname, the text "No Records found" will be returned. 

If you want to review information about this patient - click on the table row. If you want to review summary about this patient - click on the **View** button.

User also has possibility to add new patients and edit information about patients which are presented in the database.

**ReSPECT-plugin**

ReSPECT-plugin is a virtual medical card of patient, which storage history of changes.

# Before installing

Before installing the Generator, you will need the following:

- Node.js 9 or higher
- npm 3 or higher (which comes bundled with Node)
- Git

You can check current versions by:
```
$ node --version  
$ npm --version   
$ git --version
```

# Installing

If you want to install this project at your local machine, it is necessary to do following:

Clone this repository from GitHub:

```
$ git clone https://github.com/PulseTile/PulseTile-RA
```

Checkout to the **scotland** branch:

```
$ cd /MyWorkDirectory
$ git checkout -b scotland
```

Install all required dependencies from package.json:

```
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

# Local working

If you want to update the project locally, you need to install server path of this project at your local machine. Installation and settings of the server path is described at this link: **place for link** 

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