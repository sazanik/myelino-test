# Myelino Technical Test

## Comments from the developer

Download and run the server https://github.com/sazanik/myelino-server-test

The project is built in a conveniently scalable structure

- The eslint, tslint, prettier is configured (necessary libs and plugins for this are installed) 
- The SVG lib is added
- Anywhere is used constants like colors, routes, etc.
- The optimal folder (with index.ts in each one) structure pattern has been chosen to avoid cluttering the imports
- Added the typed navigation hook, now there is no need to specify `as never` in navigation methods
- The display of the inputs were configured additionally brought to the same view because lineHeight is not applied on android, causing the same styles to look different on devices
- ContextAPI is selected as the global state control. As an example, a theme switch independent of the device theme is implemented
- Fully working dark theme
- As for the logic, I tried to use my observation experience and skills and implemented the most convenient version of the logic where it was not quite obvious from the user's point of view

Since the server always returned a 404 code on any endpoints, including those with provided credentials, it was decided to build the project on typed mocks so that server interaction could be quickly hooked up if needed

This project is almost completely ready for commercial use the only thing left is
to add an internationalization-framework such as `i18n`


Enjoy using it!

---

## Instructions

This repository contains the base project for the Myelino technical test in React Native. Follow the instructions below to clone the project, install dependencies, initialize the project, and review the pre-installed packages.

---

## Setup

Download and run the server https://github.com/sazanik/myelino-server-test

```bash
git clone https://github.com/sazanik/myelino-server-test
cd myelino-server-test
```
Run the following command to install the required dependencies:

```bash
npm install
```

Run the server:

```bash
npm run dev
```

Download and run the client https://github.com/sazanik/myelino-test

```bash
git clone https://github.com/sazanik/myelino-test
cd myelinor-test
```

Run the following command to install the required dependencies:

```bash
npm install
```

Run the client

```bash
npx expo start
```

---

## Pre-installed Packages

This project includes the following pre-installed packages:

1. **Expo Router**: For seamless navigation between screens.

   - Installed with core dependencies for navigation structure.
   - Ensure to follow [Expo Router setup instructions](https://docs.expo.dev/router/introduction/) if additional configuration is required.

2. **Axios**: For handling HTTP requests and interactions with external APIs.
   - Used for calling endpoints and managing API responses.
   - Basic setup is included for quickly making API requests.
