const multer = require('multer');
const app = require('./app');

const { validateJWT } = require('./schemas/loginSchema');

const User = require('./controllers/usersController');

const Login = require('./controllers/loginController');

const Recipe = require('./controllers/recipesController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const { id } = req.params;
      cb(null, id);
    },
  });

const upload = multer({ storage });

const PORT = 3000;

app.get('/recipes', Recipe.getAll);
app.get('/recipes/:id', Recipe.getById);

app.put('/recipes/:id', validateJWT, Recipe.update);

app.delete('/recipes/:id', validateJWT, Recipe.remove);

app.post('/users', User.create);
app.post('/login', Login.logUser);
app.post('/recipes', validateJWT, Recipe.create);
app.put('/recipes/:id/image/', validateJWT, upload.single('image'), Recipe.postImage);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
