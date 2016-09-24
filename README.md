# Node Auth

A Node & Express backend API with basic authenticaton.

## Installation

Install all package dependencies:

```
npm install
```

Create the file **config.js** in the root directory of the application and include a random string of characters as the secret property:

```
module.exports = {
  secret: 'YourSecretStringOfCharacters'
};
```

Run the server using

```
npm run dev
```

The API will be available at <http://localhost:3090>
