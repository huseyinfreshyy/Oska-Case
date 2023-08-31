const express = require('express');
const downloadRoutes = require('./routes/downloadRoutes.js');
const pageRoutes = require('./routes/pageRoutes.js');
const cookieParser = require('cookie-parser')
const app = express();

app.use(cookieParser())
app.use(express.json());

app.use("/", pageRoutes)

app.use('/download', downloadRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});