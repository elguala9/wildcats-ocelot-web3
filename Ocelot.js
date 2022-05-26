"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ocelot = void 0;
const web3_1 = __importDefault(require("web3"));
//import * as CONFIG from './config.json'; 
const abi_json_1 = __importDefault(require("./abi.json"));
//import { IPFS } from 'ipfs'
//import { IPFS } from 'ipfs-core'
//import * as IPFS from 'ipfs-core'
//const CID = require('cids')
class Ocelot {
    constructor(provider, account, chain_id) {
        this.web3 = new web3_1.default(provider);
        this.account = account;
        //this.contract_address = CONFIG["CONTRACT_ADDRESS_" + chain_id];
        switch (chain_id) {
            case "1":
                this.contract_address = "0x";
                break;
            case "4":
                this.contract_address = "0x5A78c01ef6B0b9620811C6e827a67Cc42a142483";
                break;
            default: {
                throw ("Error on chain id");
            }
        }
        this.smart_contract = new this.web3.eth.Contract(abi_json_1.default, this.contract_address);
        this.MAX_CUSTOM_NFT = -1;
        this.MAX_NORMAL_NFT = -1;
    }
    getContractAddress() {
        return this.contract_address;
    }
    getCirculation() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getCirculationNormal()) + (yield this.getCirculationCustom());
        });
    }
    getCirculationNormal() {
        return this.smart_contract.methods.circulationNormal().call();
    }
    getCirculationCustom() {
        return this.smart_contract.methods.circulationCustom().call();
    }
    getBalanceOf(address) {
        return this.smart_contract.methods.balanceOf(address).call();
    }
    getBalance() {
        return this.smart_contract.methods.balance().call();
    }
    getOwnerNFT(token_id) {
        return this.smart_contract.methods.ownerOf(token_id).call();
    }
    getOwnerContract() {
        return this.smart_contract.methods.owner().call();
    }
    getNameCollection() {
        return this.smart_contract.methods.name().call();
    }
    getSymbolCollection() {
        return this.smart_contract.methods.symbol().call();
    }
    getApproved(token_id) {
        return this.smart_contract.methods.getApproved(token_id).call();
    }
    isApprovedForAll(owner, operator) {
        return this.smart_contract.methods.isApprovedForAll(owner, operator).call();
    }
    getPrice() {
        return this.smart_contract.methods.getPrice().call();
    }
    getAvailabeNFTs() {
        return this.smart_contract.methods.availabeNFTs().call();
    }
    getTokenURI(token_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.smart_contract.methods.tokenURI(token_id).call();
            }
            catch (err) {
                throw "Uri for token " + String(token_id) + " not found";
            }
        });
    }
    maxCustomNFTs() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.MAX_CUSTOM_NFT == -1) {
                this.MAX_CUSTOM_NFT = yield this.smart_contract.methods.maxCustomNFTs().call();
                return this.MAX_CUSTOM_NFT;
            }
            else
                return this.MAX_CUSTOM_NFT;
        });
    }
    maxNormalNFTs() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.MAX_NORMAL_NFT == -1) {
                this.MAX_NORMAL_NFT = yield this.smart_contract.methods.maxNormalNFTs().call();
                return this.MAX_NORMAL_NFT;
            }
            else
                return this.MAX_NORMAL_NFT;
        });
    }
    getWeb3() {
        return this.web3;
    }
    getSmartContract() {
        return this.smart_contract;
    }
    getAccount() {
        return this.account;
    }
    _getAddress(args) {
        if (args.length > 1)
            throw "Too much argument";
        if (args.length == 1)
            if (this.web3.utils.isAddress(args[0]))
                return args[0];
            else
                throw "Address is not valid";
        else
            return this.account;
    }
    /**
      * call normalNftOwned(address) method of the smart contract
      * @param {string} args - Address (Optional, if not passed will be used the address passed to the constructor)
      * @return Number of normal NFTs owned by the address
    */
    normalNftsOwned(...args) {
        return this.smart_contract.methods.normalNftsOwned(this._getAddress(args)).call();
    }
    /**
      * call customNftOwned(address) method of the smart contract
      * @param {string} args - Address (Optional, if not passed will be used the address passed to the constructor)
      * @return Number of custom NFTs owned by the address
    */
    customNftsOwned(...args) {
        return this.smart_contract.methods.customNftsOwned(this._getAddress(args)).call();
    }
    /**
      * @param {string} args - Address (Optional, if not passed will be used the address passed to the constructor)
      * @return List of custom NFTs owned by the address
    */
    listOfCustomNftsOwned(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.listOfNftsOwned(this._getAddress(args), 0, yield this.getCirculationCustom());
        });
    }
    /**
      * @param {string} args - Address (Optional, if not passed will be used the address passed to the constructor)
      * @return List of normal NFTs owned by the address
    */
    listOfNormalNftsOwned(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.listOfNftsOwned(this._getAddress(args), yield this.maxCustomNFTs(), yield this.getCirculationNormal());
        });
    }
    listOfNftsOwned(address, start_id, circulation) {
        return __awaiter(this, void 0, void 0, function* () {
            var nfts = new Array();
            for (let i = start_id; i < circulation; i++)
                if ((yield this.getOwnerNFT(i)) === address)
                    nfts.push(i);
            return nfts;
        });
    }
    /**
      * @return {Promise<Array<number>>} - id of the nfts already minted
    */
    nftsMinted() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.customNftsMinted()).concat(yield this.normalNftsMinted());
        });
    }
    /**
      * @return {Promise<Array<number>>} - id of the nfts already minted
    */
    customNftsMinted() {
        return __awaiter(this, void 0, void 0, function* () {
            let token_id = new Array();
            let custom_ids = yield this.getCirculationCustom();
            for (var i = 0; i < custom_ids; i++) {
                token_id.push(i);
            }
            return token_id;
        });
    }
    /**
      * @return {Promise<Array<number>>} - id of the nfts already minted
    */
    normalNftsMinted() {
        return __awaiter(this, void 0, void 0, function* () {
            let token_id = new Array();
            let normal_ids = (yield this.getCirculationNormal()) + (yield this.maxCustomNFTs());
            for (var i = yield this.maxCustomNFTs(); i < normal_ids; i++) {
                token_id.push(i);
            }
            return token_id;
        });
    }
    /**
      * @param {Array<number>} token_id - List of the NFTs
      * @return {Promise<string[]>} List of uri
    */
    listOfURI(token_id) {
        return __awaiter(this, void 0, void 0, function* () {
            var i = 0;
            var uri = new Array();
            while (i < token_id.length) {
                uri.push(yield this.getTokenURI(token_id[i]));
                i++;
            }
            return uri;
        });
    }
    /**
      * @return {Promise<{ids : number[] , uris : string[]}>} - id of the nft, uri of the nft
    */
    allURIs() {
        return __awaiter(this, void 0, void 0, function* () {
            let token_id = yield this.nftsMinted();
            return { ids: token_id, uris: yield this.listOfURI(token_id) };
        });
    }
    /**
      * @param {string} args - Address (Optional, if not passed will be used the address passed to the constructor)
      * @return {Promise<string[]>} List of custom uri owned by the address
    */
    listOfCustomURI(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.listOfURI(yield this.listOfCustomNftsOwned(this._getAddress(args)));
        });
    }
    /**
      * @param {string} args - Address (Optional, if not passed will be used the address passed to the constructor)
      * @return {Promise<string[]>} List of normal uri owned by the address
    */
    listOfNormalURI(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.listOfURI(yield this.listOfNormalNftsOwned(this._getAddress(args)));
        });
    }
    // Mint a normal Ocelot
    mintOcelot() {
        return __awaiter(this, void 0, void 0, function* () {
            let config = {
                gasLimit: (yield this.web3.eth.getBlock("latest")).gasLimit,
                to: this.contract_address,
                from: this.account,
                value: yield this.getPrice()
            };
            this.smart_contract.methods
                .mintOcelot()
                .send(config)
                .once("error", (err) => {
                console.log(err);
                return "Sorry, something went wrong please try again later.";
            })
                .then((receipt) => {
                return receipt;
            });
        });
    }
    //configuration of the transction that is used when we start a non-payable transaction
    transactionConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                gasLimit: (yield this.web3.eth.getBlock("latest")).gasLimit,
                to: this.contract_address,
                from: this.account
            };
        });
    }
    //Mint a custom Ocelot
    mintCustomOcelot() {
        return __awaiter(this, void 0, void 0, function* () {
            let config = yield this.transactionConfig();
            this.smart_contract.methods
                .mintCustomOcelot()
                .send(config)
                .once("error", (err) => {
                console.log(err);
                return "Sorry, something went wrong please try again later.";
            })
                .then((receipt) => {
                return receipt;
            });
        });
    }
}
exports.Ocelot = Ocelot;
