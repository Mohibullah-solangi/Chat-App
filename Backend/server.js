const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const http = require('http');
// const server = http.createServer(app);
// const { Server } = require("socket.io");
app.use(cors());
const io = require('./routes/index');



app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})


 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

io.listen(4000);
