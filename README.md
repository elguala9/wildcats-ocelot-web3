# wildcats-ocelot

npm install wildcats-ocelot

import { Ocelot } from "wildcats-ocelot";


### Object creation:
var ocelot = new Ocelot(window.ethereum, window.ethereum.selectedAddress, "1"); //(provider, address, chainId)

var ocelot = new Ocelot(window.ethereum, window.ethereum.selectedAddress, "4") // for test purpose

## Interesting methods
ocelot.listOfCustomNftsOwned(); // return the list of custom (0 - 109) Ocelot owned
ocelot.listOfNormalNftsOwned(); // return the list of normal (110 - 620) Ocelot owned
------------

### Get the Web3 Object
ocelot.getWeb3(); //return the Web3 object that can be used to call Web3 functions.
**Documentation:** https://web3js.readthedocs.io/en/v1.7.3/web3.html

------------


### Get the Contract Object
ocelot.getSmartContract(); //return the Contract object (istance of the contract).
**Documentation:** https://web3js.readthedocs.io/en/v1.5.0-rc.0/web3-eth-contract.html

------------


Dependencies:
* web3 ^1.7.3