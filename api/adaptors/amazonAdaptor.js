const aws = require('aws-sdk');
const nconf = require('nconf');

const getSignedFileUrl = async ({ fileName, contentType }) => {
  const S3_BUCKET = nconf.get('keys.amazon.bucket');

  const s3 = new aws.S3();

  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 1000,
    ContentType: contentType,
    ACL: 'public-read'
  };

  return new Promise((resolve, reject) => {
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if (err) {
        reject(err);
      }

      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
      };

      resolve(returnData)
    });
  });
};

module.exports = {
  getSignedFileUrl
};


