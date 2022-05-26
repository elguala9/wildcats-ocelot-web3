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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Ocelot = void 0;
var web3_1 = __importDefault(require("web3"));
var abi_json_1 = __importDefault(require("./abi.json"));
var Ocelot = /** @class */ (function () {
    function Ocelot(provider, account, chain_id) {
        this.web3 = new web3_1["default"](provider);
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
        this.smart_contract = new this.web3.eth.Contract(abi_json_1["default"], this.contract_address);
        this.MAX_CUSTOM_NFT = -1;
        this.MAX_NORMAL_NFT = -1;
    }
    Ocelot.prototype.getContractAddress = function () {
        return this.contract_address;
    };
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
                        return [2 /*return*/, this.MAX_CUSTOM_NFT];
                    case 2: return [2 /*return*/, this.MAX_CUSTOM_NFT];
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
                        return [2 /*return*/, this.MAX_NORMAL_NFT];
                    case 2: return [2 /*return*/, this.MAX_NORMAL_NFT];
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
      * @return {Promise<Array<number>>} - id of the nfts already minted
    */
    Ocelot.prototype.nftsMinted = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.customNftsMinted()];
                    case 1:
                        _b = (_a = (_c.sent())).concat;
                        return [4 /*yield*/, this.normalNftsMinted()];
                    case 2: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    /**
      * @return {Promise<Array<number>>} - id of the nfts already minted
    */
    Ocelot.prototype.customNftsMinted = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token_id, custom_ids, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token_id = new Array();
                        return [4 /*yield*/, this.getCirculationCustom()];
                    case 1:
                        custom_ids = _a.sent();
                        for (i = 0; i < custom_ids; i++) {
                            token_id.push(i);
                        }
                        return [2 /*return*/, token_id];
                }
            });
        });
    };
    /**
      * @return {Promise<Array<number>>} - id of the nfts already minted
    */
    Ocelot.prototype.normalNftsMinted = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token_id, normal_ids, _a, i;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        token_id = new Array();
                        return [4 /*yield*/, this.getCirculationNormal()];
                    case 1:
                        _a = (_b.sent());
                        return [4 /*yield*/, this.maxCustomNFTs()];
                    case 2:
                        normal_ids = _a + (_b.sent());
                        return [4 /*yield*/, this.maxCustomNFTs()];
                    case 3:
                        i = _b.sent();
                        _b.label = 4;
                    case 4:
                        if (!(i < normal_ids)) return [3 /*break*/, 6];
                        token_id.push(i);
                        _b.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 4];
                    case 6: return [2 /*return*/, token_id];
                }
            });
        });
    };
    /**
      * @param {Array<number>} token_id - List of the NFTs
      * @return {Promise<string[]>} List of uri
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
      * @return {Promise<{ids : number[] , uris : string[]}>} - id of the nft, uri of the nft
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
      * @return {Promise<string[]>} List of custom uri owned by the address
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
      * @return {Promise<string[]>} List of normal uri owned by the address
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
    // Mint a normal Ocelot
    Ocelot.prototype.mintOcelot = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = {};
                        return [4 /*yield*/, this.web3.eth.getBlock("latest")];
                    case 1:
                        _a.gasLimit = (_b.sent()).gasLimit,
                            _a.to = this.contract_address,
                            _a.from = this.account;
                        return [4 /*yield*/, this.getPrice()];
                    case 2:
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
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = {};
                        return [4 /*yield*/, this.web3.eth.getBlock("latest")];
                    case 1: return [2 /*return*/, (_a.gasLimit = (_b.sent()).gasLimit,
                            _a.to = this.contract_address,
                            _a.from = this.account,
                            _a)];
                }
            });
        });
    };
    //Mint a custom Ocelot
    Ocelot.prototype.mintCustomOcelot = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transactionConfig()];
                    case 1:
                        config = _a.sent();
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
                        return [2 /*return*/];
                }
            });
        });
    };
    return Ocelot;
}());
exports.Ocelot = Ocelot;
