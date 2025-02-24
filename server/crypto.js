const { secp256k1 } = require ("ethereum-cryptography/secp256k1.js");
const utils = require ("ethereum-cryptography/utils.js");


// const PRIVATE_KEY = utils.bytesToHex(secp256k1.utils.randomPrivateKey());
// console.log({ PRIVATE_KEY });
// const PUBLIC_KEY = utils.bytesToHex(secp256k1.getPublicKey(PRIVATE_KEY));
// console.log({ PUBLIC_KEY });
// const ADDRESS = PUBLIC_KEY.slice(1).slice(-20);
// console.log({ ADDRESS });

class crypto {
    constructor(){};
    PRIVATE_KEY(){
        return utils.bytesToHex(secp256k1.utils.randomPrivateKey());
    }

    PUBLIC_KEY(private_key){
        return utils.bytesToHex(secp256k1.getPublicKey(private_key));
    }

    ADDRESS(public_key){
        return public_key.slice(1).slice(-20);
    }

    SIGN(private_key, message){
        return secp256k1.sign(private_key, message);
    }

    VERIFY(public_key, signature, message){
        return secp256k1.verify(public_key, signature, message);
    }
}

module.exports = crypto