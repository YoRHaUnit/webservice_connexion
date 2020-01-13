const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
const port = 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const db = require('./routes/queries');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
);

app.get('/users', db.getUsers);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));
app.post('/users', db.createUser);
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});
