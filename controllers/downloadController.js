const axios = require('axios');
const fs = require('fs');
const path = require('path');

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

module.exports = {
  downloadFile
};