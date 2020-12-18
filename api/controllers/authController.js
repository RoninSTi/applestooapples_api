const jwtDecode = require('jwt-decode')
const { Account, User } = require('../db/db');

async function getAuthSwoopCallback(req, res) {
  try {
    const { id_token } = await this.swoop.getAccessTokenFromAuthorizationCodeFlow(req);

    const { email } = jwtDecode(id_token);

    const user = await User.findOrCreateByEmail({ email });

    const { accountId, id, roles } = user;

    const account = await Account.findByPk(accountId)

    const accountResponse = account.toJSON()

    const accessToken = this.jwt.sign({
      account: accountResponse,
      email,
      id,
      roles,
    }, {
      expiresIn: 864000
    });

    const response = {
      accessToken,
      user: {
        ...user.toJSON(),
        account: accountResponse
      }
    }

    res.send(response)
  } catch (error) {
    res.send(error)
  }
}

module.exports = {
  getAuthSwoopCallback,
}
