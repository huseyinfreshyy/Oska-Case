# Oska-Case

Merhabalar,
Bu projede  <a href="https://oska.com.tr/">Oska Yazılım</a>'ın  bana göndermiş olduğu case'i yaptım. <br>
<b>Case:</b>
<img src="https://i.hizliresim.com/a42xo3r.png"></img>

```
app.use("/", pageRoutes)

app.use('/download', downloadRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```
"index" ve "download" olmak üzere 2 route bulunmaktadır.

index sayfasına istek atıldığında **pageRoutes**'a istek atılmaktadır.

pageRoutes.js
```
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js');
router.get('/', authMiddleware.createToken)

module.exports = router;

```
pageRoutes API'ye get isteği atarak **JSON Web Token(JWT)** oluşturmaktadır. Bu JWT authMiddleware.createToken ile yapılmaktadır.

authMiddleware.js
```
const createToken =(req,res) =>{
    const user = { id: 123, username: 'user' };
    const token = jwt.sign(user, process.env.SECRET_TOKEN, { expiresIn: '1h' });
    res.cookie("token",token, {
      httpOnly: true
    })
    res.send("token created: " + token);
}
```
Burada token oluşturulduktan sonra cookie'ye **token** olarak set edilmektedir.

Token oluşturulduktan sonra localhost:PORT/download'a **POST** isteği atılarak. Body'de gönderilen link doğrulandıktan sonra axios ile indirme işlemi yapılır.

downloadRoutes.js

```
const express = require('express');
const router = express.Router();
const downloadController = require('../controllers/downloadController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

router.post('/verify', authMiddleware.verifyToken);
router.post('/', downloadController.downloadFile ,authMiddleware.verifyToken)

module.exports = router;
```

POST isteği ```dowloandController.downloadFile``` ve ```authMiddleware.verifyToken``` işlemlerini tetikler.

**KİMLİK DOĞRULAMA**

authMiddleware.js
```
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
```
Burada token cookieden alınarak doğrulama yapılır eğer doğrulama başarılı ise bir sonraki işleme ```next()``` sayesinde geçilir. 

Ve indirme işlemi başlatılır.

downloadController.js

```
const downloadFile = async (req, res) => {
  const downloadLink = req.body.downloadLink;
  console.log(downloadLink)

  if (!downloadLink) {
    return res.status(400).json({ message: 'Missing downloadLink' });
  }


  try {
    const fileUrl = downloadLink;
    if (!fileUrl) {
      return res.status(400).send('No URL provided');
    }
    
    axios({
      method: 'get',
      url: downloadLink,
      responseType: 'stream'
    })
      .then(function (response) {
        const fileName = path.basename(new URL(fileUrl).pathname);
        res.setHeader('Content-Type', response.headers['content-type']);
        res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
        response.data.pipe(fs.createWriteStream(fileName))
        res.status(200).send('File downloaded.')
      });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred');
  }

};
```
İndirme işlemi sırasında Body'den gelen link alınır. Öncelikle link olup olmadığı kontrol edilir. Eğer var ise ```axios``` ile indirme işlemi gerçekleşir.

# UYGULAMA

Aşağıdaki resimlerde görüldüğü üzere  ThunderClient'taki test aşamaları vardır.

<h3><b>TOKEN OLUŞTURMA:</b></h2>
<img src="https://i.hizliresim.com/mh7iwr7.png"></img>

<h3><b>DOĞRULAMA</b></h2>
<img src="https://i.hizliresim.com/bv52cid.png"></img>

Doğrulamak için istek atılırken **Header'a** ```Set-Cookie``` değişkenine oluşturulan token'ı değer olarak atadıktan sonra istek atmamız gerekir.

<h3><b>İNDİRME</b></h2>
<img src="https://i.hizliresim.com/aunwg1s.png"></img>

İstek atarken Body'de ```JSON``` formatında indirme linki eklememiz gerekmektedir.

<h3><b>SONUÇ</b></h2>
<img src="https://i.hizliresim.com/lfuof5w.png"></img>
<img src="https://i.hizliresim.com/hxs19z2.png"></img>

Görüldüğü üzere indirme işlemimiz başarılı bir şekilde gerçekleşmiştir.








