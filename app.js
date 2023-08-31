const express = require('express');
const dotenv = require('dotenv');
const downloadRoutes = require('./routes/downloadRoutes.js');
const pageRoutes = require('./routes/pageRoutes.js');
const cookieParser = require('cookie-parser')
const app = express();

dotenv.config();

app.use(cookieParser())

app.use(express.json());

app.use("/", pageRoutes)

app.use('/download', downloadRoutes);


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});