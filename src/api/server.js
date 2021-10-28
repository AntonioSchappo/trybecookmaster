const app = require('./app');

const User = require('./controllers/usersController');

const PORT = 3000;

app.post('/users', User.create);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
