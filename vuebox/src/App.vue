<template>
  <div id="app">
	  <div>
		  <img alt="Vue logo" src="./assets/logo.png">
	  </div>
	<div>
		地址 <input type="text"v-model="address">
	</div>
	<div>
		数量 <input type="text" v-model='count'>
	</div>
	<div>
		<button @click="send">发送</button>
	</div>
	<div>
		状态：<span style="color: blue;">{{status}}</span>
	</div>
	<div>
		我的余额：<span style="color: red;">{{balance}}</span>
	</div>
	
	
	
	
	
	
  </div>
</template>

<script>
import Web3 from "web3";
export default {
	data() {
	      return {
	      address:'',
		  count:'',
		  balance:0,
		  status:'待处理...',
		  MetaCoin:{}
	      }
	    },
  name: 'app',
  components: {
  },
  mounted() {
  	console.log(this.$DApp);
	this.init();
	
  },
  methods:{
	  delBlank(str){
		  return str.replace(/\s*/g,"");
	  },
	  async getBlance(){
		  let balance = await this.MetaCoin.refreshBalance();
		  console.log(balance);
		  this.balance = balance;
	  },
	  statu(str){
		  this.status = str;
	  },
	  async send(){
		  let {address,count,delBlank} = this;
		  address = delBlank(address);
		  count = parseInt(count);
		  console.log(address,count);
		  if(address===""||count===""){
			  alert('请输入地址和数量')
		  }
		  else{
			  let coins  = await this.MetaCoin.sendCoin(count,address);
			  console.log(coins);
			  this.balance = coins;
			  this.statu('交易成功')
		  }
		  
	  },
	    init(){
			this.$DApp.MetaCoin.initObj().then(obj=>{
				this.MetaCoin = obj;
				console.log(this.MetaCoin);
				this.getBlance();
			});
			
			
			
			
		 
	  }
  }
}
</script>

<style>
#app {
  margin-top: 200px;
  text-align: center;
  
}
</style>
