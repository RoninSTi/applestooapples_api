const { getSignedFileUrl } = require('../adaptors/amazonAdaptor');
const { slugify } = require('../utils/strings')

const postUploadSignedUrl = async (req, res) => {
  const { fileName: fn, contentType } = req.body;

  const fileName = slugify(fn);

  try {
    fileData = await getSignedFileUrl({ contentType, fileName });

    res.send(fileData);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  postUploadSignedUrl
};
