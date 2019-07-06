const express = require("express");
const routes = require('./server/routes/');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
console.log("Node env: " + env);

const app = express();
const router = express.Router();

let port = process.env.PORT || 5000;

routes(router);
app.use('/api', router);

/** we need this only for heroku in prod */
if (env === "production") {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});