const { getSignedFileUrl } = require('../adaptors/amazonAdaptor');

const postUploadSignedUrl = async (req, res) => {
  const { fileName, fileType } = req.body;

  try {
    fileData = await getSignedFileUrl({ fileName, fileType });

    res.send(fileData);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  postUploadSignedUrl
};
