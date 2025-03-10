import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import * as utils from "ethereum-cryptography/utils.js";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        setPrivateKey={setPrivateKey}
        privateKey={privateKey}
      />
      <Transfer setBalance={setBalance} address={address} privateKey={privateKey}/>
    </div>
  );
}

export default App;
