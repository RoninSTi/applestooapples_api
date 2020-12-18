const { Account, Address } = require('../db/db');

async function deleteAddress(req, res) {
  const { accountId, addressId } = req.params;

  try {
    await Address.destroy({
      where: {
        id: addressId
      }
    });

    const account = await Account.findByPk(accountId);

    const response = await account.getAddresses();

    res.send(response)
  } catch (error) {
    res.send(error);
  }
}

async function getAddresses(req, res) {
  const { account: { id: accountId } } = req.user;

  try {
    const account = await Account.findByPk(accountId);

    const response = await account.getAddresses();

    res.send(response)
  } catch (error) {
    res.send(error)
  }
}

async function postAddress(req, res) {
  const { accountId } = req.params;
  const data = req.body;

  try {
    const account = await Account.findByPk(accountId);

    const address = await Address.create({
      ...data
    });

    await account.addAddresses([address]);

    const response = await account.getAddresses()

    res.send(response);
  } catch (error) {
    res.send(error)
  }
}

async function putAddress(req, res) {
  const { accountId, addressId } = req.params;
  const data = req.body;

  try {
    const account = await Account.findByPk(accountId);

    const address = await Address.findByPk(addressId)

    Object.keys(data).forEach(key => {
      address[key] = data[key]
    })

    await address.save();

    const response = await account.getAddresses()

    res.send(response);
  } catch (error) {
    res.send(error)
  }
}

module.exports = {
  deleteAddress,
  getAddresses,
  postAddress,
  putAddress,
}
