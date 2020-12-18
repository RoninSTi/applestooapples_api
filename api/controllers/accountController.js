const { Account, AccountUser, Location, PaymentMethod, Subscription, User } = require('../db/db');
const { sendEmail } = require('../adaptors/mailgunAdaptor')
const nconf = require('nconf');

async function getAccounts(req, res) {
  const { page = 1, pageSize = 100 } = req.query;

  const offset = (page * pageSize) - pageSize;
  const limit = pageSize;

  try {
    const query = {
      include: [{ all: true, nested: true }],
      offset: offset,
      limit: limit,
      order: [
        ['createdAt', 'DESC'],
      ]
    }

    const accounts = await Account.findAll({ ...query })

    const promises = accounts.map(account => Account.getSingle(account.id))

    const response = await Promise.all(promises)

    res.send(response)
  } catch (error) {
    res.send(error)
  }
}

async function getAccountsMe(req, res) {
  const { id } = req.user

  try {
    const user = await User.findByPk(id)

    const account = await Account.findByPk(user.accountId, { include: [{ all: true, nested: true }] })

    const response = account.toJSON()

    res.send(response)
  } catch (error) {
    res.send(error)
  }
}

async function getPaymentMethod(req, res) {
  const { accountId } = req.params

  try {
    const paymentMethod = await PaymentMethod.findOne({
      where: {
        accountId: accountId,
        isDefault: true
      }
    })

    const response = paymentMethod ? paymentMethod.toJSON() : null

    res.send(response)
  } catch (error) {
    res.send(error)
  }
}

async function getSubscription(req, res) {
  const { accountId } = req.params

  try {
    const subscription = await Subscription.findOne({
      where: {
        accountId: accountId,
        isDeleted: false
      }
    })

    const response = subscription ? subscription.toJSON() : null

    res.send(response)
  } catch (error) {
    res.send(error)
  }
}

async function postAccount(req, res) {
  const { type } = req.body;
  const { email } = req.user

  try {
    const account = await Account.create({
      isActive: true,
      type,
    });

    const user = await User.findOne({
      where: {
        email
      }
    });

    await account.addUser(user)

    const accessToken = this.jwt.sign({
      ...req.user,
      account: {
        ...account.toJSON()
      }
    });

    const response = {
      accessToken,
      account: account.toJSON()
    }

    res.send(response);
  } catch (error) {
    res.send(error);
  }
};

async function putAccount(req, res) {
  const { accountId } = req.params;

  const updatedData = req.body;

  try {
    const account = await Account.findByPk(accountId);

    if (updatedData.email !== account.email) {
      await account.addAccountUser({ email: updatedData.email, role: 'super-admin' })
    }

    Object.keys(updatedData).forEach(key => {
      account[key] = updatedData[key]
    })

    await account.save();

    const response = await Account.getSingle(accountId);

    res.send(response);
  } catch (error) {
    res.send(error);
  }
}

async function postAccountUserAdd(req, res) {
  const userData = req.body;
  const { accountId } = req.params;

  try {
    const account = await Account.findByPk(accountId);

    await account.addAccountUser({ userData })

    // await sendEmail({
    //   mg: this.mg,
    //   data: {
    //     to: email,
    //     template: 'account_invite',
    //     'v:sign_in_url': `${nconf.get('app.authCallbackHost')}/login`,
    //     subject: 'Invitation to ApplesTooApples',
    //   }
    // })

    const response = await Account.getSingle(accountId);

    res.send(response);
  } catch (error) {
    res.send(error)
  }
}

const deleteAccount = async (req, res) => {
  const { accountId } = req.params

  try {
    await Account.destroy({
      where: {
        id: accountId
      }
    })

    res.send(200)
  } catch (error) {
    res.send(error)
  }
}

const deleteAccountUser = async (req, res) => {
  const { accountId, userId } = req.params;

  try {
    const user = await User.findByPk(userId)

    user.accountId = null;

    await user.save()

    const response = await Account.getSingle(accountId);

    res.send(response);
  } catch (error) {
    res.send(error)
  }
}

const putAccountUser = async (req, res) => {
  const { accountId, userId } = req.params;
  const { role } = req.body

  try {
    const accountUser = await AccountUser.findOne({
      where: {
        accountId,
        userId
      }
    });

    accountUser.role = role;

    await accountUser.save()

    const response = await Account.getSingle(accountId);

    res.send(response)
  } catch (error) {
    res.send(error)
  }
}

module.exports = {
  deleteAccount,
  deleteAccountUser,
  getAccounts,
  getAccountsMe,
  getPaymentMethod,
  getSubscription,
  postAccount,
  postAccountUserAdd,
  putAccount,
  putAccountUser
};
