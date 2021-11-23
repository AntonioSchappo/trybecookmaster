const multer = require('multer');
const express = require('express');
const path = require('path');
const app = require('./app');

const { validateJWT } = require('./schemas/loginSchema');

const User = require('./controllers/usersController');

const Login = require('./controllers/loginController');

const Recipe = require('./controllers/recipesController');

const directory = path.join(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, directory);
    },
    filename: (req, file, cb) => {
        const { id } = req.params;
      cb(null, `${id}.jpeg`);
    },
  });

const upload = multer({ storage });

const PORT = 3000;

app.get('/recipes', Recipe.getAll);
app.get('/recipes/:id', Recipe.getById);
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.put('/recipes/:id', validateJWT, Recipe.update);

app.delete('/recipes/:id', validateJWT, Recipe.remove);

app.post('/users', User.create);
app.post('/login', Login.logUser);
app.post('/recipes', validateJWT, Recipe.create);
app.put('/recipes/:id/image/', validateJWT, upload.single('image'), Recipe.postImage);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));