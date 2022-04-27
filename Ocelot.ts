import Web3 from "web3";
import { Contract } from 'web3-eth-contract';
import CONFIG from './config.json'; 
import ABI from './abi.json'; 
import { AbiItem } from 'web3-utils'

export class Ocelot{
    private web3 : Web3;
    private smart_contract : Contract;
    private account : string;

    constructor(provider : any, account : string){      
        this.web3 = new Web3(provider);
        this.account = account;
        this.smart_contract = new this.web3.eth.Contract(ABI as AbiItem[],CONFIG.CONTRACT_ADDRESS);
    }

    public getCirculation(){
      return this.getCirculationNormal() + this.getCirculationCustom();
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
  
    public getWeb3() : Contract{
      return this.smart_contract;
    }

    public getSmartContract() : Web3{
      return this.web3;
    }

    public getAccount() : string{
      return this.account;
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

    //Mint a common Ocelot
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