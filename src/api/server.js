const app = require('./app');

const User = require('./controllers/usersController');

const Login = require('./controllers/loginController');

const PORT = 3000;

app.post('/users', User.create);
app.post('/login', Login.logUser);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
