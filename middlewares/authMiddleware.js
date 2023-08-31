const jwt = require('jsonwebtoken');

const createToken =(req,res) =>{
    const user = { id: 123, username: 'user' };
    const token = jwt.sign(user, 'Oska', { expiresIn: '1h' });
    res.cookie("token",token, {
      httpOnly: true
    })
    res.send("token created: " + token);
}
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token)

  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }

  jwt.verify(token, 'Oska', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = decoded;
    next();
  });
};

module.exports = {
  verifyToken,
  createToken
};
  