import Web3 from "web3";

class ContractInit{
	constructor(web3,account,meta,artifact,contractAddress,abi) {
	    this.web3 = web3;
		this.account = account;
		this.meta = meta;
		
		this.artifact = artifact;
		
		//以下2种情况对应，后端开发人员直接给出合约地址与合约abi的情况（比如只给了json文件的abi部分）
		this.contractAddress=contractAddress;
		this.abi = abi;
	}
	
	init(){
		return new Promise((resolve,reject)=>{
			
			let url = 'https://ropsten.infura.io/v3/undefined';
			
			if (window.ethereum) {
			  // use MetaMask's provider
			  this.web3 = new Web3(window.ethereum);
			  window.ethereum.enable(); // get permission to access accounts
			  
			} else {
			  console.warn(
			    "No web3 detected. Falling back to"+url+" . You should remove this fallback when you deploy live"
			  );
			  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
			  this.web3 = new Web3(
			    new Web3.providers.HttpProvider(url)
			  );
			  reject("No web3 detected. Falling back to"+url+" . You should remove this fallback when you deploy live")
			}
			this.start().then(res=>{
							  resolve(this)
			})
			
		})
	 			
	}
	
	async start() {
	  const { web3 } = this;
	  
	
	  try {
	    // get contract instance
	    const networkId = await web3.eth.net.getId();
		  
		let address;
		if(this.contractAddress===null){
		  		const deployedNetwork = this.artifact.networks[networkId];
				this.contractAddress = deployedNetwork.address;
		}
		
		if(this.abi===null){
			this.abi =  this.artifact.abi;
		}
	    this.meta = new web3.eth.Contract(
	      this.abi,
		 this.contractAddress
	    );
	
	    // get accounts
	    const accounts = await web3.eth.getAccounts();
	    this.account = accounts[0];
		console.log(this.account);
		
		
		  
	
	   
	  } catch (error) {
		console.error(error);
	    console.error("Could not connect to contract or chain.");
	  }
	}
	 
	
	
}


export{
	ContractInit
}

