const express = require('express');
const app = express();
const dotenv = require('dotenv')
const path = require('path')
const connectDatabase = require('./config/connectDatabase');
const cors = require('cors')

dotenv.config({path: path.join(__dirname, '.env')})

const products = require('./routes/product');
const orders = require('./routes/order');
const auth = require('./routes/auth');
const uploadRoutes = require('./routes/upload');
const expenseRoutes = require('./routes/expense');

connectDatabase();

app.use(express.json())
app.use(cors());

app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));

app.use('/api/v1/', products);
app.use('/api/v1/', orders);
app.use('/api/v1/', auth);
app.use('/api/v1/', uploadRoutes);
app.use('/api/v1/', expenseRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is listening to port 8000 in ${process.env.NODE_ENV}`)
})

app.get('/hello', (req, res) => {
  res.send('hello');
});