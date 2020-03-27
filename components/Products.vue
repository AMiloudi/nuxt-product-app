<template >
   <div >
      <h1>Producten</h1>
      <div v-for="prod in products" :key="prod.id">
         <nuxt-link :to="'products/' + prod.id">
   	 <h1>{{prod.name}}</h1>
         </nuxt-link>
      </div>
      <div class="row form-group size--sm">
         <div class="col-12">
   	 <h1>Voeg hier een nieuw product toe</h1>
   	 <span>Naam</span><br/>
   	 <input v-model="name" type="text" name="productname" id="productname" maxLength="100" value="" placeholder="Product naam"class="form-control">
         </div>
      </div>
      <div class="row form-group size--sm">
         <div class="col-12">
   	 <span>Omschrijving</span><br/>
   	 <input v-model="description" type="text" name="productdesc" maxLength="500" id="productdesc" value="" placeholder="Product omschrijving"class="form-control">
         </div>
      </div>
      <div class="row form-group size--sm">
         <div class="col-12">
   	 <span>Prijs</span><br/>
   	 <input v-model="price" type="text" name="productdesc" id="productdesc" value="" placeholder="Product omschrijving"class="form-control">
   	 <br v-if="showErrorPrice" ><span style="color:red" v-if="showErrorPrice">Vul een prijs in met een komma</span>
         </div>
      </div>
      <div class="row form-group size--sm">
         <div class="col-12">
   	 <span>Voorraad</span><br/>
   	 <span>Kies 1 voor Direct leverbaar en kies 2 voor binnen 5 werkdagen</span><br/>
   	 <input v-model="stock_id" type="number" name="productdesc" id="productdesc" value="" placeholder="Product omschrijving"class="form-control">
         </div>
      </div>
      <div class="row form-group size--sm">
         <div class="col-12">
   	 <button class="btn btn--orange m-0" @click.prevent="addProduct">Voeg product toe</button>
         </div>
      </div>
   </div>
   </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
	token: {
         type: String,                                                             
         required: true,                                                            
       },                
	}, 
  data() {
    return {
	products: [],    
	name: '',
	description: '',
	price: '',
	stock_id: 0,
	showErrorPrice: false,
};
  },
async created() {
let res = await	axios.get( `https://assessment.7apps.nl/api/products`, {
	headers: {
	Authorization: 'Bearer ' + this.token
}
});
	if(!!res){
	this.products = res.data
} 
},
  computed: {
  },
  mounted() {
  },
  methods: {
async addProduct(){
	this.showErrorPrice = false;
	if (!this.price.match(/(\d{0,9},)?\d{0,2}/)){
		this.showErrorPrice = true;
	return;
}
	let res = await	axios.post( `https://assessment.7apps.nl/api/products`, {
		name: this.name,
		description: this.description,
		price: this.price,
		stock_id: this.stock_id,
	}, {
		headers: {
		Authorization: 'Bearer ' + this.token
	}
	});
let res2 = await	axios.get( `https://assessment.7apps.nl/api/products`, {
	headers: {
	Authorization: 'Bearer ' + this.token
}
});
	if(!!res2){
	this.products = res2.data
} 
},
},	
};
</script>

