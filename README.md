# React Vitest Template

A starter template for building React apps with Vite. Includes Vitest for unit testing and
a hefty .gitignore file.

## Usage

```
mkdir your-app-name
cd your-app-name
npx degit criesbeck/react-vitest
npm install
```

## Setting up Firebase
This app uses Firebase to store all the data in the backend. To use Firebase, you will need to login to Firebase using any Google login. For more information on setting up Firebase click here: https://firebase.google.com/docs/database/

## Configuration Data
Firebase configuration data should be placed in utils/firebase.js in the const 'firebaseConfig'
 


## Test

Verify that the initial app works. Run

```
npm start
```

and open the URL displayed.

Verify that the unit tests work with

```
npm test
```

Two tests should run and pass. 

## Scripts

**package.json** defines the following scripts:

| Script         | Description                                         |
| -------------- | --------------------------------------------------- |
| npm start      | Runs the app in the development mode.               |
| npm run dev    | Runs the app in the development mode.               |
| npm run build  | Builds the app for production to the `dist` folder. |
| npm run serve  | Serves the production build from the `dist` folder. |
| npm test       | Starts a Jest-like test loop                        |


## Git

If everything is working, set up [your local and remote repositories](https://docs.github.com/en/get-started/importing-your-projects-to-github/importing-source-code-to-github/adding-locally-hosted-code-to-github#adding-a-local-repository-to-github-using-git).

## Folder Structure

```
your-app-name
├── node_modules
├── public
│   ├── favicon.svg
│   └── robots.txt
└── src
    ├── App.css
    ├── App.jsx
    ├── index.css
    ├── index.jsx
    └── logo.svg
├── .gitignore
├── index.html
├── package.json
├── README.md
├── vite.config.js
```

## Known Bugs
1. Utensil rentals are currently hard coded and need implementation for when not all utensils are rented
2. Filtering by zip code is not implemented
3. Information displayed in order screen (order status timeline) is only implemented for the front end and not stored in the Firebase
4. No information regarding returns are stored in the Firebase (return time/date, return utensils, return confirmation, etc.)

## Future Implementations
1. Currently only the customer side of the app is implemented, future implementation would include implementing the restaurant side to confirm orders and edit existing menus
    **Note, you can currently add additional items to a menu by using the /upstream route*
2. Adding Google authentication for user login (currently no authentication exists)
3. Implementing order cancellation
4. Including push notifications
5. Implementing real payments
6. Including a page to look at history of returns (similar to order history page)
7. Allowing messaging between clients and restaurants
8. Creating a user profile tab



## Credits

React-Vitest built and maintained by [Chris Riesbeck](https://github.com/criesbeck).

Inspired by [SafdarJamal/vite-template-react](https://github.com/SafdarJamal/vite-template-react).
Expanded to include Vitest and some sample tests.

Thanks to Rich Harris for [degit](https://www.npmjs.com/package/degit).

Gitignore file created with [the Toptal tool](https://www.toptal.com/developers/gitignore/api/react,firebase,visualstudiocode,macos,windows).

Styled primarily with [Mantine](https://mantine.dev/pages/getting-started/)

Icons taken from [React Icons](https://react-icons.github.io/react-icons/)

Usage of global variables from [Zustand](https://github.com/pmndrs/zustand)

## License

This project is licensed under the terms of the [MIT license](./LICENSE).