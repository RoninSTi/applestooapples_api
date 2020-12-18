const Fastify = require('fastify');
const AutoLoad = require('fastify-autoload');

const jwt = require('fastify-jwt')
const oauthPlugin = require('fastify-oauth2');
const nconf = require('nconf');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const mailgun = require("mailgun-js");

const createRequestId = () => uuidv4();

const createServer = (options) => {
  const { logSeverity } = options;

  const server = Fastify({
    genReqId: createRequestId,
    ignoreTrailingSlash: true,
    logger: {
      level: logSeverity,
    },
  });

  server.register(require('fastify-auth'))

  server.register(oauthPlugin, {
    name: 'swoop',
    scope: 'email',
    credentials: {
      client: {
        id: nconf.get('keys.swoop.clientId'),
        secret: nconf.get('keys.swoop.secret')
      },
      auth: {
        authorizeHost: 'https://auth.swoop.email',
        authorizePath: '/oauth2/authorize',
        tokenHost: 'https://auth.swoop.email',
        tokenPath: '/oauth2/token'
      }
    },
    startRedirectPath: '/auth/swoop',
    callbackUri: `${nconf.get('app.authCallbackHost')}/login`
  })

  server.register(jwt, { secret: nconf.get('jwt.secret') })

  server.register(require('fastify-cors'), {
    origin: (origin, cb) => {
      if (/localhost/.test(origin) || origin === undefined) {
        //  Request from localhost will pass
        cb(null, true);
        return;
      }

      if (origin === 'https://applestooapples-web-staging.herokuapp.com') {
        cb(null, true);
        return;
      }

      if (origin === 'https://applestooapples.com') {
        cb(null, true);
        return;
      }

      cb(new Error('Not allowed'), false);
    },
  });

  server.register(AutoLoad, {
    dir: path.join(__dirname, 'api', 'routes'),
  });


  // const aws = require('aws-sdk');

  // const AWS_ACCESS_KEY_ID = nconf.get('keys.amazon.AWSAccessKeyId');
  // const AWS_SECRET_KEY = nconf.get('keys.amazon.AWSSecretKey');

  // aws.config.update({
  //   region: 'us-east-2',
  //   accessKeyId: AWS_ACCESS_KEY_ID,
  //   secretAccessKey: AWS_SECRET_KEY,
  //   signatureVersion: 'v4'
  // })

  const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });

  server.decorate('mg', mg);

  // start the server
  server.listen(process.env.PORT, '0.0.0.0', (err) => {
    if (err) {
      server.log.error(err);
      console.log(err);
      process.exit(1);
    }

    server.log.info('Server Started');
  });
};

module.exports = {
  createServer,
};
