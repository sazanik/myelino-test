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
- Implemented the `React Query` for caching and advanced data fetching

Since the server always returned a 404 code on any endpoints,
including those with provided credentials,
it was decided to build the own simple server on the Koa and filesystem storage on localhost (for quick development).

This project is almost completely ready for commercial use the only thing left is
to add an internationalization-framework such as `i18n`, loader components and the optimistic updates for server calls


Enjoy using it!

---

## Instructions

To access the app, enter
email or username in the corresponding field and password

`email: test@gmail.com` or `username: username`
`password: password`

At this stage you can create events for the pre-created plans and delete them.
To create an event, click on the menu icon in the header, enter the data and select the appropriate plan, then select the event date.

The above user and the plans for him have been created in advance
At this point, you can create events for pre-created plans and delete them.

To create an event, click on the menu icon in the header, 
enter the data and select the corresponding plan, 
then select the event date (_to see plans divided by month, select the event date of the corresponding month, 
as events for current month will be created for the Quick Plans plan_).

To delete an event, press the event and confirm it

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
