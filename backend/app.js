const express = require('express');
const app = express();
const dotenv = require('dotenv')
const path = require('path')
const connectDatabase = require('./config/connectDatabase');
const cors = require('cors')

dotenv.config({path: path.join(__dirname, '.env')})

const products = require('./routes/product');
const orders = require('./routes/order');

connectDatabase();

app.use(express.json())
app.use(cors());

app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));

app.use('/api/v1/', products);
app.use('/api/v1/', orders);

app.listen(process.env.PORT, () => {
    console.log(`Server is listening to port 8000 in ${process.env.NODE_ENV}`)
})

app.get('/hello', (req, res) => {
  res.send('hello');
});