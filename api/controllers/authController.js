const jwtDecode = require('jwt-decode')
const { Account, User } = require('../db/db');

async function getAuthSwoopCallback(req, res) {
  try {
    const { id_token } = await this.swoop.getAccessTokenFromAuthorizationCodeFlow(req);

    const { email } = jwtDecode(id_token);

    const user = await User.findOrCreateByEmail({ email });

    const { accountId, id, roles } = user;

    const account = await Account.findByPk(accountId)

    const tokenData = {
      account: account ? account.toJSON() : null,
      email,
      id,
      roles,
    }

    const accessToken = this.jwt.sign(tokenData, {
      expiresIn: 864000
    });

    const response = {
      accessToken,
      user: {
        ...user.toJSON(),
        account: account ? account.toJSON() : null
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
