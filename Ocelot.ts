import Web3 from "web3";
const fs = require('fs');

export class Ocelot{
    private config_path = "./config.json"
    private abi_path = "./abi.json"
    private CONFIG;
    private web3 : Web3;
    private smart_contract;

    constructor(provider : any){
        
        this.web3 = new Web3(provider);
        let content = fs.readFileSync(this.config_path);
        this.CONFIG = JSON.parse(content);
        content = fs.readFileSync(this.abi_path);
        let abi = JSON.parse(content);
        this.smart_contract = new this.web3.eth.Contract(abi,this.CONFIG.CONTRACT_ADDRESS);
        //console.log(this.smart_contract);
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

    public tryMintOcelot(...args: string[]): any{
      if (args.length > 1)
        throw 'Too much parameters';

      //if (args.length == 0)
        console.log(args[0]);
      
    }

    //configuration of the transction that is used when we start a mint transaction
    private transactionMintConfig() : any{
      return {
        gasLimit: String(this.CONFIG.GAS_LIMIT),
        to: this.CONFIG.CONTRACT_ADDRESS,
        value: this.getPrice(),
      };
    }

    public mintOcelot(): any{

      this.smart_contract.methods
      .mintOcelot()
      .send(this.transactionMintConfig())
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
        gasLimit: String(this.CONFIG.GAS_LIMIT),
        to: this.CONFIG.CONTRACT_ADDRESS
      };
    }

    
}