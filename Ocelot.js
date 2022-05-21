"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Ocelot = void 0;
var web3_1 = __importDefault(require("web3"));
var config_json_1 = __importDefault(require("./config.json"));
var abi_json_1 = __importDefault(require("./abi.json"));
//import { IPFS } from 'ipfs'
//import { IPFS } from 'ipfs-core'
var IPFS = __importStar(require("ipfs-core"));
var CID = require('cids');
var Ocelot = /** @class */ (function () {
    function Ocelot(provider, account) {
        this.web3 = new web3_1["default"](provider);
        this.account = account;
        this.smart_contract = new this.web3.eth.Contract(abi_json_1["default"], config_json_1["default"].CONTRACT_ADDRESS);
        this.MAX_CUSTOM_NFT = -1;
        this.MAX_NORMAL_NFT = -1;
    }
    Ocelot.prototype.getCirculation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getCirculationNormal()];
                    case 1:
                        _a = (_b.sent());
                        return [4 /*yield*/, this.getCirculationCustom()];
                    case 2: return [2 /*return*/, _a + (_b.sent())];
                }
            });
        });
    };
    Ocelot.prototype.getCirculationNormal = function () {
        return this.smart_contract.methods.circulationNormal().call();
    };
    Ocelot.prototype.getCirculationCustom = function () {
        return this.smart_contract.methods.circulationCustom().call();
    };
    Ocelot.prototype.getBalanceOf = function (address) {
        return this.smart_contract.methods.balanceOf(address).call();
    };
    Ocelot.prototype.getBalance = function () {
        return this.smart_contract.methods.balance().call();
    };
    Ocelot.prototype.getOwnerNFT = function (token_id) {
        return this.smart_contract.methods.ownerOf(token_id).call();
    };
    Ocelot.prototype.getOwnerContract = function () {
        return this.smart_contract.methods.owner().call();
    };
    Ocelot.prototype.getNameCollection = function () {
        return this.smart_contract.methods.name().call();
    };
    Ocelot.prototype.getSymbolCollection = function () {
        return this.smart_contract.methods.symbol().call();
    };
    Ocelot.prototype.getApproved = function (token_id) {
        return this.smart_contract.methods.getApproved(token_id).call();
    };
    Ocelot.prototype.isApprovedForAll = function (owner, operator) {
        return this.smart_contract.methods.isApprovedForAll(owner, operator).call();
    };
    Ocelot.prototype.getPrice = function () {
        return this.smart_contract.methods.getPrice().call();
    };
    Ocelot.prototype.getAvailabeNFTs = function () {
        return this.smart_contract.methods.availabeNFTs().call();
    };
    Ocelot.prototype.getTokenURI = function (token_id) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.smart_contract.methods.tokenURI(token_id).call()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_1 = _a.sent();
                        throw "Uri for token " + String(token_id) + " not found";
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Ocelot.prototype.maxCustomNFTs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.MAX_CUSTOM_NFT == -1)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.smart_contract.methods.maxCustomNFTs().call()];
                    case 1:
                        _a.MAX_CUSTOM_NFT = _b.sent();
                        return [3 /*break*/, 3];
                    case 2: return [2 /*return*/, this.MAX_CUSTOM_NFT];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Ocelot.prototype.maxNormalNFTs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.MAX_NORMAL_NFT == -1)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.smart_contract.methods.maxNormalNFTs().call()];
                    case 1:
                        _a.MAX_NORMAL_NFT = _b.sent();
                        return [3 /*break*/, 3];
                    case 2: return [2 /*return*/, this.MAX_NORMAL_NFT];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Ocelot.prototype.getWeb3 = function () {
        return this.web3;
    };
    Ocelot.prototype.getSmartContract = function () {
        return this.smart_contract;
    };
    Ocelot.prototype.getAccount = function () {
        return this.account;
    };
    Ocelot.prototype._getAddress = function (args) {
        if (args.length > 1)
            throw "Too much argument";
        if (args.length == 1)
            if (this.web3.utils.isAddress(args[0]))
                return args[0];
            else
                throw "Address is not valid";
        else
            return this.account;
    };
    /**
      * call normalNftOwned(address) method of the smart contract
      * @param {string} args - Address (Optional, if not passed will be used the address passed to the constructor)
      * @return Number of normal NFTs owned by the address
    */
    Ocelot.prototype.normalNftsOwned = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.smart_contract.methods.normalNftsOwned(this._getAddress(args)).call();
    };
    /**
      * call customNftOwned(address) method of the smart contract
      * @param {string} args - Address (Optional, if not passed will be used the address passed to the constructor)
      * @return Number of custom NFTs owned by the address
    */
    Ocelot.prototype.customNftsOwned = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.smart_contract.methods.customNftsOwned(this._getAddress(args)).call();
    };
    /**
      * @param {string} args - Address (Optional, if not passed will be used the address passed to the constructor)
      * @return List of custom NFTs owned by the address
    */
    Ocelot.prototype.listOfCustomNftsOwned = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.listOfNftsOwned;
                        _b = [this._getAddress(args), 0];
                        return [4 /*yield*/, this.getCirculationCustom()];
                    case 1: return [2 /*return*/, _a.apply(this, _b.concat([_c.sent()]))];
                }
            });
        });
    };
    /**
      * @param {string} args - Address (Optional, if not passed will be used the address passed to the constructor)
      * @return List of normal NFTs owned by the address
    */
    Ocelot.prototype.listOfNormalNftsOwned = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.listOfNftsOwned;
                        _b = [this._getAddress(args)];
                        return [4 /*yield*/, this.maxCustomNFTs()];
                    case 1:
                        _b = _b.concat([_c.sent()]);
                        return [4 /*yield*/, this.getCirculationNormal()];
                    case 2: return [2 /*return*/, _a.apply(this, _b.concat([_c.sent()]))];
                }
            });
        });
    };
    Ocelot.prototype.listOfNftsOwned = function (address, start_id, circulation) {
        return __awaiter(this, void 0, void 0, function () {
            var nfts, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nfts = new Array();
                        i = start_id;
                        _a.label = 1;
                    case 1:
                        if (!(i < circulation)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getOwnerNFT(i)];
                    case 2:
                        if ((_a.sent()) === address)
                            nfts.push(i);
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, nfts];
                }
            });
        });
    };
    /**
      * @param {number[]} token_id - List of the NFTs
      * @return List of uri
    */
    Ocelot.prototype.listOfURI = function (token_id) {
        return __awaiter(this, void 0, void 0, function () {
            var i, uri, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        i = 0;
                        uri = new Array();
                        _c.label = 1;
                    case 1:
                        if (!(i < token_id.length)) return [3 /*break*/, 3];
                        _b = (_a = uri).push;
                        return [4 /*yield*/, this.getTokenURI(token_id[i])];
                    case 2:
                        _b.apply(_a, [_c.sent()]);
                        i++;
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/, uri];
                }
            });
        });
    };
    /**
      * @return {number[]} - id of the nfts already minted
    */
    Ocelot.prototype.nftsMinted = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token_id, custom_ids, i, normal_ids, _a, i;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        token_id = new Array();
                        return [4 /*yield*/, this.getCirculationCustom()];
                    case 1:
                        custom_ids = _b.sent();
                        for (i = 0; i < custom_ids; i++) {
                            token_id.push(i);
                        }
                        return [4 /*yield*/, this.getCirculationNormal()];
                    case 2:
                        _a = (_b.sent());
                        return [4 /*yield*/, this.maxCustomNFTs()];
                    case 3:
                        normal_ids = _a + (_b.sent());
                        return [4 /*yield*/, this.maxCustomNFTs()];
                    case 4:
                        i = _b.sent();
                        _b.label = 5;
                    case 5:
                        if (!(i < normal_ids)) return [3 /*break*/, 7];
                        token_id.push(i);
                        _b.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 5];
                    case 7: return [2 /*return*/, token_id];
                }
            });
        });
    };
    /**
      * @return {number[], string[]} - id of the nft, uri of the nft
    */
    Ocelot.prototype.allURIs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token_id;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.nftsMinted()];
                    case 1:
                        token_id = _b.sent();
                        _a = { ids: token_id };
                        return [4 /*yield*/, this.listOfURI(token_id)];
                    case 2: return [2 /*return*/, (_a.uris = _b.sent(), _a)];
                }
            });
        });
    };
    /**
      * @param {string} args - Address (Optional, if not passed will be used the address passed to the constructor)
      * @return List of custom uri owned by the address
    */
    Ocelot.prototype.listOfCustomURI = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.listOfURI;
                        return [4 /*yield*/, this.listOfCustomNftsOwned(this._getAddress(args))];
                    case 1: return [4 /*yield*/, _a.apply(this, [_b.sent()])];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    /**
      * @param {string} args - Address (Optional, if not passed will be used the address passed to the constructor)
      * @return List of normal uri owned by the address
    */
    Ocelot.prototype.listOfNormalURI = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.listOfURI;
                        return [4 /*yield*/, this.listOfNormalNftsOwned(this._getAddress(args))];
                    case 1: return [4 /*yield*/, _a.apply(this, [_b.sent()])];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    // setting the IPFS, cannot be done in the constructor
    Ocelot.prototype.setIPFS = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.node == null)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, IPFS.create()];
                    case 1:
                        _a.node = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
      * @param {string} CID - Identifier of the file into the IPFS
      * @return the file in string format
    */
    Ocelot.prototype.getFileFromIPFS = function (CID) {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function () {
            var stream, data, stream_1, stream_1_1, chunk, e_1_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.setIPFS()];
                    case 1:
                        _b.sent();
                        console.log("CID:" + CID);
                        stream = this.node.cat(CID.trim());
                        data = '';
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 7, 8, 13]);
                        stream_1 = __asyncValues(stream);
                        _b.label = 3;
                    case 3: return [4 /*yield*/, stream_1.next()];
                    case 4:
                        if (!(stream_1_1 = _b.sent(), !stream_1_1.done)) return [3 /*break*/, 6];
                        chunk = stream_1_1.value;
                        // chunks of data are returned as a Buffer, convert it back to a string
                        data += chunk.toString();
                        _b.label = 5;
                    case 5: return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 13];
                    case 7:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 13];
                    case 8:
                        _b.trys.push([8, , 11, 12]);
                        if (!(stream_1_1 && !stream_1_1.done && (_a = stream_1["return"]))) return [3 /*break*/, 10];
                        return [4 /*yield*/, _a.call(stream_1)];
                    case 9:
                        _b.sent();
                        _b.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 12: return [7 /*endfinally*/];
                    case 13: return [2 /*return*/, data];
                }
            });
        });
    };
    /**
      * @param {number} token_id - The token id
      * @return the CID
    */
    Ocelot.prototype.getCID = function (token_id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.getCIDFromURI;
                        return [4 /*yield*/, this.getTokenURI(token_id)];
                    case 1: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                }
            });
        });
    };
    /**
      * @param {string} uri - Uri of a nft
      * @return the CID
    */
    Ocelot.prototype.getCIDFromURI = function (uri) {
        return uri.replace("ipfs://", " ");
    };
    /**
      * @param {number} token_id - The token id
      * @return the json file
    */
    Ocelot.prototype.getJson = function (token_id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.getFileFromIPFS;
                        return [4 /*yield*/, this.getCID(token_id)];
                    case 1: return [4 /*yield*/, _a.apply(this, [_b.sent()])];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    // Mint a normal Ocelot
    Ocelot.prototype.mintOcelot = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = {
                            gasLimit: String(config_json_1["default"].GAS_LIMIT),
                            to: config_json_1["default"].CONTRACT_ADDRESS,
                            from: this.account
                        };
                        return [4 /*yield*/, this.getPrice()];
                    case 1:
                        config = (_a.value = _b.sent(),
                            _a);
                        this.smart_contract.methods
                            .mintOcelot()
                            .send(config)
                            .once("error", function (err) {
                            console.log(err);
                            return "Sorry, something went wrong please try again later.";
                        })
                            .then(function (receipt) {
                            return receipt;
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    //configuration of the transction that is used when we start a non-payable transaction
    Ocelot.prototype.transactionConfig = function () {
        return {
            gasLimit: String(config_json_1["default"].GAS_LIMIT),
            to: config_json_1["default"].CONTRACT_ADDRESS,
            from: this.account
        };
    };
    //Mint a custom Ocelot
    Ocelot.prototype.mintCustomOcelot = function () {
        var config = this.transactionConfig();
        this.smart_contract.methods
            .mintCustomOcelot()
            .send(config)
            .once("error", function (err) {
            console.log(err);
            return "Sorry, something went wrong please try again later.";
        })
            .then(function (receipt) {
            return receipt;
        });
    };
    Ocelot.prototype.safeTransfer = function (to, token_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.safeTransferFrom(this.account, to, token_id)];
            });
        });
    };
    //
    Ocelot.prototype.safeTransferFrom = function (from, to, token_id) {
        return __awaiter(this, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.web3.utils.isAddress(from))
                            return [2 /*return*/, "From address is not valid"];
                        if (!this.web3.utils.isAddress(to))
                            return [2 /*return*/, "To address is not valid"];
                        return [4 /*yield*/, this.getOwnerNFT(token_id)];
                    case 1:
                        if ((_a.sent()) !== from)
                            return [2 /*return*/, "You are not owner of the token"];
                        config = this.transactionConfig();
                        this.smart_contract.methods
                            .safeTransferFrom(from, to, token_id)
                            .send(config)
                            .once("error", function (err) {
                            console.log(err);
                            return "Sorry, something went wrong please try again later.";
                        })
                            .then(function (receipt) {
                            return receipt;
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return Ocelot;
}());
exports.Ocelot = Ocelot;
