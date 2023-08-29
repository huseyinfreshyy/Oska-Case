// controllers/downloadController.js
const fs = require('fs');
const path = require('path');
const rp = require('request-promise-native');

const downloadFile =  async (req, res) => {
  const downloadLink = req.body.downloadLink;

  if (!downloadLink) {
    return res.status(400).json({ message: 'Missing downloadLink' });
  }

  
  const filePath = path.join(__dirname, '..', 'downloads', 'file.exe');

  try {
    await rp({ uri: downloadLink, encoding: null }).pipe(fs.createWriteStream(filePath));
    
    res.setHeader('Content-disposition', 'attachment; filename=file.exe');
    const file = fs.createReadStream(filePath);
    file.pipe(res);
  } catch (error) {
    res.status(500).json({ message: 'Error downloading the file' });
  }

};

module.exports = {
  downloadFile,
};
