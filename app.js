const express = require('express');
const downloadRoutes = require('./routes/downloadRoutes.js');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const app = express();

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/", function (req, res){
  const user = { id: 123, username: 'user' };
  const token = jwt.sign(user, 'Oska', { expiresIn: '1h' });
  res.cookie("token",token, {
    httpOnly: true
  })
  res.send("OSKA");
})

app.use('/download', downloadRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});