const sendEmail = async ({ mg, data }) => {
  const promise = new Promise((resolve, reject) => {
    const sendData = {
      ...data,
      from: 'ApplesTooApples Admin <admin@applestooapples.com>',
    };

    mg.messages().send(sendData, (error, body) => {
      if (error) {
        reject(error)
      }

      resolve(body)
    });
  });

  return promise;
}

module.exports = {
  sendEmail
}
