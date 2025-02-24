const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const crypto = require("./crypto");

app.use(cors());
app.use(express.json());

const _crypto = new crypto();
const private_key = (_crypto.PRIVATE_KEY());
const public_key = _crypto.PUBLIC_KEY(private_key);
const address = _crypto.ADDRESS(public_key);
console.log({private_key, public_key, address})

const balances = {
  "4c10424c2a09c3ee570e": 100,
  "3155e66f19d076ada689": 50,
  "4381b3fd943d3b3e112d": 75,
};

const PRIVATE_KEY = {
  '4c10424c2a09c3ee570e': '5dabe5be0ae8f96dbf805b1723d3e6a5a0b20d29449ad6718a930baee9c6e64d',
  '3155e66f19d076ada689': '9dfbdfb781bc38109bd98e07871235a999c6f9e93d9b8c338e31ac57c8443ea2',
  '4381b3fd943d3b3e112d': 'ff822bbb0011615cbe3fe9858ed00c032872c46a4fd23f55fe3225c4e44219ee'
}

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  console.log(req.body)
  const { sender, sender_key, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else if (sender_key !== PRIVATE_KEY[sender]) {
    res.status(400).send({ message: "Invalid private key!" });
  }
  else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
