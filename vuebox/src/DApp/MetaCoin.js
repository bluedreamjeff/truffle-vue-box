import metaCoinArtifact from "../../../build/contracts/MetaCoin.json";

import {ContractInit} from './init.js';

let api = {
	async refreshBalance() {
	  const { getBalance } = this.methods;
	  const {account} = this.contractObj;
	  const balance = await getBalance(account).call();
		return balance;
	
	  
	},
	  async sendCoin(amount,receiver) {
		const {account} = this.contractObj;
	    const { sendCoin } = this.methods;
		
		let res = await sendCoin(receiver, amount).send({ from: account });
		
		  console.log(res);
		
	    let coins = this.refreshBalance();
		return coins;
		console.log(coins);
	  },
}

let MetaCoin = {
	contractObj:null,
	methods:null,
	async initObj(){
		
		let instance = new ContractInit(null,null,null,metaCoinArtifact,null,null);
		let obj = await instance.init();
		this.contractObj = obj;
		this.methods = obj.meta.methods;
		return this;
	},
	...api
	
	
}


export {
	MetaCoin
}

