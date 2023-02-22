## Technologies Used

- `node.js`
- `express.js`
- `typescript`
- `mongodb`
- `mongoose`
- `http-errors`
- `express-validator`
- `winston`
- `jest`

**Due to the deadline, I tried to come up with a quick demo regarding the requirements mentioned in the sent assignment, but there is some room for improvement.**

## Room for Improvement

To Do:

- Use `dotenv` module that loads environment variables from a .env file into `process.env` to keep our sensitive data secure.
- Use `jest` for testing each unit in the app
- Use `supertest` it's for testing API endpoint by simulating HTTP requests and receive the corresponding responses from `Node.js` server.
- Add more functionalities to auth controller like forget password, update password, and logout endpoints.
- Remove any hard coding data like database connection information when we deploy to the production environment.

## Discussion

#### What did I choose Express.js, not any framework else?

I think that Express.js is the right choice for this app. Express aimed to be minimalist and a good choice for small to medium size apps, In contrast, nest.js as an example aimed for medium to large apps.

### Dependency Injection

Although I'm in love with this technique where it makes a class independent of its dependencies, which definitely makes our code more readable and organized by following SOLD principles, Unfortunately, I was unable to implement this pattern due to time constraints in addition to the simplicity of the given assignment "Task CRUD app"
