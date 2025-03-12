const express = require('express');
const cors = require('cors');
const router = require('./route/routes');


const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());
app.use('/api',router);

app.listen(port, () =>{
  console.log(`Server start in http://localhost:${port}`);
});
