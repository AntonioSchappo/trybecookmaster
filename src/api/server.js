const app = require('./app');

const { validateJWT } = require('./schemas/loginSchema');

const User = require('./controllers/usersController');

const Login = require('./controllers/loginController');

const Recipe = require('./controllers/recipesController');

const PORT = 3000;

app.get('/recipes', Recipe.getAll);

app.post('/users', User.create);
app.post('/login', Login.logUser);
app.post('/recipes', validateJWT, Recipe.create);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
