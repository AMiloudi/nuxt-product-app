<template>
<div>
<h1>{{product.name}}</h1><br>
<p>{{product.description}}</p>
<p>{{product.price}}</p>
<p v-if="product.stock">{{product.stock.name}}</p>
<button @click="removeProduct">Verwijder dit product</button>
<nuxt-link to="/">Terug naar het overzicht</nuxt-link>
</div>
 </template>

<script>
import axios from 'axios' 
import {mapState} from 'vuex';

export default {
components: {
},
data() {
return {
	product: {},
	product_id: 0,
}
      },
async mounted(){
let split_url = this.$route.path.split('/');
this.product_id = split_url[split_url.length -1];
let res = await        axios.get( `https://assessment.7apps.nl/api/products/${this.product_id}`, {
        headers: {
        Authorization: 'Bearer ' + this.token
}
});
 if(!!res){
	this.product = res.data;
} 

},
computed: {
	...mapState({
	token: (state) => state.token,
}),
},
methods: {
		 async removeProduct() {
let res = await  axios.delete( `https://assessment.7apps.nl/api/products/${this.product_id}`, {
        headers: {
        Authorization: 'Bearer ' + this.token
}
});
	this.$router.push('/');
},
		 async logout() {
}
},
};
</script>

<style>
</style>
