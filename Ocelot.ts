import Web3 from "web3";
import { Contract } from 'web3-eth-contract';
import CONFIG from './config.json'; 
import ABI from './abi.json'; 
import { AbiItem } from 'web3-utils'

export class Ocelot{
    private web3 : Web3;
    private smart_contract : Contract;
    private account : string;
    private MAX_CUSTOM_NFT : number;
    private MAX_NORMAL_NFT : number;

    constructor(provider : any, account : string){      
        this.web3 = new Web3(provider);
        this.account = account;
        this.smart_contract = new this.web3.eth.Contract(ABI as AbiItem[],CONFIG.CONTRACT_ADDRESS);
        this.MAX_CUSTOM_NFT = -1;
        this.MAX_NORMAL_NFT = -1;
    }

    public async getCirculation(){
      return await this.getCirculationNormal() + await this.getCirculationCustom();
    }

    public getCirculationNormal(){
      return this.smart_contract.methods.circulationNormal().call();
    }

    public getCirculationCustom(){
      return this.smart_contract.methods.circulationCustom().call();
    }

    public getBalanceOf(address : string){
      return this.smart_contract.methods.balanceOf(address).call();
    }

    public getBalance(){
      return this.smart_contract.methods.balance().call();
    }

    public getOwnerNFT(token_id : number){
      return this.smart_contract.methods.ownerOf(token_id).call();
    }

    public getOwnerContract(){
      return this.smart_contract.methods.owner().call();
    }

    public getNameCollection(){
      return this.smart_contract.methods.name().call();
    }

    public getSymbolCollection(){
      return this.smart_contract.methods.symbol().call();
    }

    public getUriNFT(token_id : number){
      return this.smart_contract.methods.tokenURI(token_id).call();
    }

    public getApproved(token_id : number){
      return this.smart_contract.methods.getApproved(token_id).call();
    }

    public isApprovedForAll(owner : string, operator : string){
      return this.smart_contract.methods.isApprovedForAll(owner, operator).call();
    }

    public getPrice(){
      return this.smart_contract.methods.getPrice().call();
    }

    public getAvailabeNFTs(){
      return this.smart_contract.methods.availabeNFTs().call();
    }

    public getTokenURI(token_id : number){
      return this.smart_contract.methods.tokenURI(token_id).call();
    }

    public async maxCustomNFTs(){
      if(this.MAX_CUSTOM_NFT == -1)
        this.MAX_CUSTOM_NFT = await this.smart_contract.methods.maxCustomNFTs().call();
      else
        return this.MAX_CUSTOM_NFT;
    }

    public async maxNormalNFTs(){
      if(this.MAX_NORMAL_NFT == -1)
        this.MAX_NORMAL_NFT = await this.smart_contract.methods.maxNormalNFTs().call();
      else
        return this.MAX_NORMAL_NFT;
    }
  
    public getWeb3() : Web3{
      return this.web3;
    }

    public getSmartContract() : Contract{
      return this.smart_contract;
    }

    public getAccount() : string{
      return this.account;
    }




    private _getAddress(args: string[]){
      if(args.length > 1)
        throw "Too much argument";

      if(args.length == 1)
        if(this.web3.utils.isAddress(args[0]))
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
    public normalNftsOwned(...args: string[]){
      return this.smart_contract.methods.normalNftsOwned(this._getAddress(args)).call();
    }

    /**
      * call customNftOwned(address) method of the smart contract
      * @param {string} args - Address (Optional, if not passed will be used the address passed to the constructor)
      * @return Number of custom NFTs owned by the address
    */
    public customNftsOwned(...args: string[]){
      return this.smart_contract.methods.customNftsOwned(this._getAddress(args)).call();
    }

    /**
      * @param {string} args - Address (Optional, if not passed will be used the address passed to the constructor)
      * @return List of custom NFTs owned by the address
    */
    public async listOfCustomNftsOwned(...args: string[]) : Promise<number[]>{
      return this.listOfNftsOwned(this._getAddress(args), 0, await this.getCirculationCustom())
    }

    /**
      * @param {string} args - Address (Optional, if not passed will be used the address passed to the constructor)
      * @return List of normal NFTs owned by the address
    */
    public async listOfNormalNftsOwned(...args: string[]) : Promise<number[]>{
      return this.listOfNftsOwned(this._getAddress(args), await this.maxCustomNFTs(), await this.getCirculationNormal())
    }

    private async listOfNftsOwned(address : string, start_id : number, circulation : number) : Promise<number[]>{
      var nfts : Array<number> = new Array<number>();
      for(let  i = start_id; i < circulation; i++)
        if(await this.getOwnerNFT(i) === address)
          nfts.push(i);
      return nfts;
    }

    /**
      * @param {number[]} token_id - List of the NFTs
      * @return List of uri 
    */
     public async listOfURI(token_id: Array<number>){
      var i = 0;
      var uri : Array<number> = new Array<number>();
      while (i < token_id.length) {
        uri.push(await this.getTokenURI(token_id[i]));
        i++;
      }

      return uri;
    }

    /**
      * @return {number[]} - id of the nfts already minted
    */
    public async nftsMinted(){
      let token_id : Array<number> = new Array<number>();
      let custom_ids = await this.getCirculationCustom()
      for(var i = 0; i < custom_ids; i++){
        token_id.push(i);
      }
      
      let normal_ids = await this.getCirculationNormal() + await this.maxCustomNFTs();
      for(var i : number = await this.maxCustomNFTs(); i < normal_ids; i++){
        token_id.push(i);
      }

      return token_id;
    }

    /**
      * @return {number[], string[]} - id of the nft, uri of the nft
    */
    public async allURIs(){
      let token_id : number[] = await this.nftsMinted();
      return {ids : token_id, uris : await this.listOfURI(token_id)};
    }

    /**
      * @param {string} args - Address (Optional, if not passed will be used the address passed to the constructor)
      * @return List of custom uri owned by the address
    */
    public async listOfCustomURI(...args: string[]){
      return await this.listOfURI(await this.listOfCustomNftsOwned(this._getAddress(args)));
    }

    /**
      * @param {string} args - Address (Optional, if not passed will be used the address passed to the constructor)
      * @return List of normal uri owned by the address
    */
     public async listOfNormalURI(...args: string[]){
      return await this.listOfURI(await this.listOfNormalNftsOwned(this._getAddress(args)));
    }
    

    // Mint a normal Ocelot
    public async mintOcelot(){
      let config =  {
          gasLimit: String(CONFIG.GAS_LIMIT),
          to: CONFIG.CONTRACT_ADDRESS,
          from : this.account,
          value: await this.getPrice()
      }
      
      this.smart_contract.methods
      .mintOcelot()
      .send(config)
      .once("error", (err : any) => {
        console.log(err);
        return "Sorry, something went wrong please try again later.";
      })
      .then((receipt : any) => {
        return receipt;
      });
    }

    //configuration of the transction that is used when we start a non-payable transaction
    private transactionConfig() : any{
      return {
        gasLimit: String(CONFIG.GAS_LIMIT),
        to: CONFIG.CONTRACT_ADDRESS,
        from : this.account
      };
    }

    //Mint a custom Ocelot
    public mintCustomOcelot(){
      
      let config = this.transactionConfig()
      
      this.smart_contract.methods
      .mintCustomOcelot()
      .send(config)
      .once("error", (err : any) => {
        console.log(err);
        return "Sorry, something went wrong please try again later.";
      })
      .then((receipt : any) => {
        return receipt;
      });
    }

    public async safeTransfer(to : string, token_id : number){
      return this.safeTransferFrom(this.account, to, token_id);
    }
    //
    public async safeTransferFrom(from : string, to : string, token_id : number){
      if(!this.web3.utils.isAddress(from))
        return "From address is not valid";

      if(!this.web3.utils.isAddress(to))
        return "To address is not valid";

      if((await this.getOwnerNFT(token_id)) !== from)
        return "You are not owner of the token";

      let config = this.transactionConfig()
      
      this.smart_contract.methods
      .safeTransferFrom(from, to, token_id)
      .send(config)
      .once("error", (err : any) => {
        console.log(err);
        return "Sorry, something went wrong please try again later.";
      })
      .then((receipt : any) => {
        return receipt;
      });
    }


}