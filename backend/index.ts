require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routs = require('./router/router');
const errorMiddleware = require('./middleware/error.middleware');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors({
  credentials:true,
  origin:process.env.CLIENT_URL
}))
app.use('/api', routs)
app.use(errorMiddleware)

app.use((req, res, next) => {
  res.status(404).send(
      "<h1>Page was not found</h1>")
})

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
})
    app.listen(PORT, () => {
      console.log(`the server is running on port ${PORT}`);
  })
  } catch (error) {
    console.log(error)
  }
}

start();
