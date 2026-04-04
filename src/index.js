const express = require("express");
const bodyparser = require("body-parser");
const app = express();


const { PORT } = require("./config/server-config");
const apiRoutes = require('./routes/index');

const startServer = () => {

  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({ extended: true }));

  app.use('/api', apiRoutes);
  
  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
  });

}

startServer();