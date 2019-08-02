const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routers/index');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/heatmap';
const db = mongoose.connection;

mongoose.connect(mongoURI, { useNewUrlParser: true });
db.on('error', (err) => {
  console.error('database connection error: ' + err);
});
db.once('open', () => {
  console.log('Database connected !!');
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port} !!!`);
});