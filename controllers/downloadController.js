const axios = require('axios');
const fs = require('fs');
const path = require('path');

const downloadFile =  async (req, res) => {
  const downloadLink = req.body.downloadLink;

  if (!downloadLink) {
    return res.status(400).json({ message: 'Missing downloadLink' });
  }

  
  try {
    const fileUrl = downloadLink;
    if (!fileUrl) {
      return res.status(400).send('No URL provided');
    }

    // Download file from URL using Axios
    const response = await axios.get(fileUrl, {
      responseType: 'stream',
    });

    // Determine the file name and extension
    const fileName = path.basename(new URL(fileUrl).pathname);
    
    // Set the headers for the download
    res.setHeader('Content-Type', response.headers['content-type']);
    res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);

    // Stream the file to the client
    response.data.pipe(res);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred');
  }

};

module.exports = {
  downloadFile,
};