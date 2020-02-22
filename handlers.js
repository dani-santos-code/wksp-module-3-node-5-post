const { stock, customers } = require("./data/promo");

const handleOrder = (req, res) => {
  console.log(customers);
  const { order, size, givenName, surname, address, country } = req.body;
  if (order === "shirt" && size === "undefined") {
    res.status(422).json({ status: "error", error: "000" });
  }
  customers.forEach(customer => {
    if (
      (customer.givenName === givenName && customer.surname === surname) ||
      customer.address === address
    ) {
      res.status(403).json({ status: "error", error: "550" });
    }
  });
  if (country !== "Canada") {
    res.status(403).json({ status: "error", error: "650" });
  }
  res.status(200).json({ status: "success" });
};

// const handleConfirmation = (req, body) => {
//   const { order, size } = req.body;
//   if (order === "t-shirt") {
//     if (!size) {
//       res.send({ status: "error", error: 000 });
//     }
//   }
// };
module.exports = { handleOrder };
