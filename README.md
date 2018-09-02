# Token creation and validation app in NodeJS (Express)

You can create / list / delete / validate tokens with this REST API in [NodeJS](https://nodejs.org/en/) / [Express](https://expressjs.com/).

Tokens are stored in [MongoDB](https://www.mongodb.com/), schemas are created with [Mongoose](https://mongoosejs.com/).

Admin section and its endpoints are protected with a basic validation by [Passport](http://www.passportjs.org/).

You can configure some app settings via **.env**

Templates built with [pug](https://pugjs.org/api/getting-started.html).

## Installation

If you have mongo in local (otherwise please install it), run the following command in terminal:
```sh
$ mongod
```
or with specified path
```sh
$ mongod --dbpath /path/to/mongo/data
```

Once mongo is connected, run the following command in a separate terminal:
```sh
$ git clone https://github.com/daveedx/nodejs-token-validation.git
$ cd nodejs-token-validation
$ yarn install
$ yarn start
```
or you can start it with watch mode
```sh
$ yarn watch
```

## Usage

Open [http://localhost:3000/](http://localhost:3000/). On this page you can validate your token(s).

Since you don't have any tokens, yet no admin users, go to [http://localhost:3000/createuser/username/password](http://localhost:3000/createuser/username/password), change **username** and **password** to your desired one, these will be your credentials to the admin.

Now head to [http://localhost:3000/admin](http://localhost:3000/admin) and login with your newly created credentials.

On the main page of the admin, if you click on the **Generate** button, a token (length is random between 6 and 12 chars) gets generated. A token gets expired in 7 days (default), but you can overwrite it in **.env** (**TOKEN_EXPIRY_DAY**), as well as the min (**RAND_TOKEN_LENGTH_RANGE_MIN**) and max (**RAND_TOKEN_LENGTH_RANGE_MAX**) length of a token.

You can check all the generated tokens (hash, created and expiry dates) at [http://localhost:4000/admin/tokens](http://localhost:4000/admin/tokens). Also you are able to delete token(s) here.

Once you copied a generated token, you can check its validity at [http://localhost:3000/](http://localhost:3000/) by pasting into the input and clicking the **Validate** button.
