const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes/router');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(router);

app.get('/', (req, res) => {
    res.send('Hello World!');
  })

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})