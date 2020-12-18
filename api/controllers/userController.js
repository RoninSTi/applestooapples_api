const { Account, User } = require('../db/db');

async function getMe(req, res) {
  const { id } = req.user

  try {
    const user = await User.findOne({
      include: [{ all: true, nested: true }],
      where: { id }
    })

    const account = await Account.findByPk(user.accountId)

    const response = {
      ...user.toJSON(),
      account: account.toJSON()
    }

    res.send(response)
  } catch (error) {
    res.send(error)
  }
}

async function getUser(req, res) {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      res.send(null);

      return;
    }

    const response = user.toJSON()

    res.send(response);
  } catch (error) {
    res.send(error)
  }
}

const getUserAccount = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    const account = await user.getAccount({ include: [{ all: true, nested: true }] });

    const response = account.toJSON()

    res.send(response);
  } catch (error) {
    res.send(error)
  }
};

const putUser = async (req, res) => {
  const { ...userData } = req.body;

  const { userId } = req.params;

  try {
    const user = await User.findOne({
      include: [{ all: true, nested: true }],
      where: {
        id: userId
      }
    });

    Object.keys(userData).forEach(key => {
      user[key] = userData[key]
    });

    await user.save()

    const response = user.toJSON()

    res.send(response)
  } catch (error) {
    res.send(error);
  }
}

module.exports = {
  getMe,
  getUser,
  getUserAccount,
  putUser
};
