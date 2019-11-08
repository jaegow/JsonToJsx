# JSON to JSX
> ejected from create-react-app

### Developer Start up
1. **Install Node**: currently using LTS (v10.16.3) as of 10.24.19
1. **Install dependencies**: 
    * `npm install`
1. **Create a `.env.local` file**: 
    * `cd <project-folder>`
    * `touch .env.local`
    * edit file to include local env variables: 
        * `REACT_EDITOR=idea` <-- for Intellij Users
        * > TODO: add more examples
1. **Configure ES-Linting rules with your IDE**:
    * > FYI: es-linting rules in process of being defined
    * Intellij Users: 
        * open `.eslintrc.js`
        * right click anywhere in the file
        * select `Apply ESLint Code Style Rules` 
    * > TODO: add more IDE examples
1. **Start Dev**: 
    * `npm start`

### Available Scripts
#### `npm start`
> Some augmentations have been made from create react app
> * TODO: review changes to webpack for new start processes.

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `npm test`
Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`
> Some augmentations have been made from create react app
> * TODO: review changes to webpack for new build processes.  

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
