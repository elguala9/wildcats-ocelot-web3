import Web3 from "web3";
import { Contract } from 'web3-eth-contract';
export declare class Ocelot {
    private web3;
    private smart_contract;
    private account;
    private contract_address;
    private MAX_CUSTOM_NFT;
    private MAX_NORMAL_NFT;
    constructor(provider: any, account: string, chain_id: string);
    getContractAddress(): string;
    getCirculation(): Promise<any>;
    getCirculationNormal(): any;
    getCirculationCustom(): any;
    getBalanceOf(address: string): any;
    getBalance(): any;
    getOwnerNFT(token_id: number): any;
    getOwnerContract(): any;
    getNameCollection(): any;
    getSymbolCollection(): any;
    getApproved(token_id: number): any;
    isApprovedForAll(owner: string, operator: string): any;
    getPrice(): any;
    getAvailabeNFTs(): any;
    getTokenURI(token_id: number): Promise<string>;
    maxCustomNFTs(): Promise<number>;
    maxNormalNFTs(): Promise<number>;
    getWeb3(): Web3;
    getSmartContract(): Contract;
    getAccount(): string;
    private _getAddress;
    /**
      * call normalNftOwned(address) method of the smart contract
      * @param {string} args - Address (Optional, if not passed will be used the address passed to the constructor)
      * @return Number of normal NFTs owned by the address
    */
    normalNftsOwned(...args: string[]): any;
    /**
      * call customNftOwned(address) method of the smart contract
      * @param {string} args - Address (Optional, if not passed will be used the address passed to the constructor)
      * @return Number of custom NFTs owned by the address
    */
    customNftsOwned(...args: string[]): any;
    /**
      * @param {string} args - Address (Optional, if not passed will be used the address passed to the constructor)
      * @return List of custom NFTs owned by the address
    */
    listOfCustomNftsOwned(...args: string[]): Promise<number[]>;
    /**
      * @param {string} args - Address (Optional, if not passed will be used the address passed to the constructor)
      * @return List of normal NFTs owned by the address
    */
    listOfNormalNftsOwned(...args: string[]): Promise<number[]>;
    private listOfNftsOwned;
    /**
      * @return {Promise<Array<number>>} - id of the nfts already minted
    */
    nftsMinted(): Promise<Array<number>>;
    /**
      * @return {Promise<Array<number>>} - id of the nfts already minted
    */
    customNftsMinted(): Promise<Array<number>>;
    /**
      * @return {Promise<Array<number>>} - id of the nfts already minted
    */
    normalNftsMinted(): Promise<Array<number>>;
    /**
      * @param {Array<number>} token_id - List of the NFTs
      * @return {Promise<string[]>} List of uri
    */
    listOfURI(token_id: Array<number>): Promise<string[]>;
    /**
      * @return {Promise<{ids : number[] , uris : string[]}>} - id of the nft, uri of the nft
    */
    allURIs(): Promise<{
        ids: number[];
        uris: string[];
    }>;
    /**
      * @param {string} args - Address (Optional, if not passed will be used the address passed to the constructor)
      * @return {Promise<string[]>} List of custom uri owned by the address
    */
    listOfCustomURI(...args: string[]): Promise<string[]>;
    /**
      * @param {string} args - Address (Optional, if not passed will be used the address passed to the constructor)
      * @return {Promise<string[]>} List of normal uri owned by the address
    */
    listOfNormalURI(...args: string[]): Promise<string[]>;
    mintOcelot(): Promise<void>;
    private transactionConfig;
    mintCustomOcelot(): Promise<void>;
}
