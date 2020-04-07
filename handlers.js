const { stock, customers } = require("./data/promo");

const handleOrder = (req, res) => {
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
  if (order === "shirt") {
    if (stock[order][size] <= 0) {
      res.status(403).json({ status: "error", error: "450" });
    }
  } else {
    if (stock[order] !== "shirt") {
      if (stock[order] <= 0) {
        res.status(403).json({ status: "error", error: "450" });
      }
    }
  }
  res.status(200).json({ status: "success" });
};

const handleConfirmation = (req, res) => {
  console.log(req.body);
  res.render("pages/order-confirmation");
};
module.exports = { handleOrder, handleConfirmation };
