<template>
<div class="container">
<div v-if="token == ''" class="bg--gray is-rounded p-2 mb-4">
<p >Log in met uw gegevens.</p>
<div class="row form-group size--sm">
<div class="col-12">
<input v-model="email" type="text" name="username" id="username" value="" placeholder="Uw emailadres" class="form-control">
</div>
</div>
<div class="row form-group size--sm">
<div class="col-12">
<input v-model="password" type="password" name="user-password" id="user-password" value="" placeholder="Uw wachtwoord" class="form-control">
</div>
</div>
<div class="row form-group size--sm">
<div class="col-12">
<button class="btn btn--orange m-0" @click.prevent="login">Inloggen</button>
</div>
</div>
</div>
<div class="col12" v-if="token !== ''"> 
<Profile class="col4" :token="token" />
<Products class="col8" :token="token" />

<button class="btn btn--orange m-0" @click.prevent="logout">Uitloggen</button>
</div>
</div>
</template>

<script>
import Profile from '~/components/Profile.vue'
import Products from '~/components/Products.vue'
import axios from 'axios' 
import { mapState } from 'vuex';

export default {
components: {
	Profile,
	Products,
},
data() {
return {
	      name: '',
	      email: '',
	      password: '',
}
      },
  computed: {
    ...mapState({
      token: (state) => state.token,
    }),
  },

methods: {
		 async login() {
			 let res = await axios.post(
 `https://assessment.7apps.nl/api/login`,{
       email: this.email,
       password: this.password,
});
if (!!res) {
	this.$store.commit('setToken', res.data.accessToken);
}
},
		 async logout() {
	let token = this.token
			 let res = await axios.post(
 `https://assessment.7apps.nl/api/logout`, {},
{	headers: {
	Authorization: 'Bearer' + " " + token
}
})
}
},
	}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
.col12 {
	widht: 100%
}
.col4 {
	widht: 33.33%
}
.col8 {
	widht: 66.67%
}
</style>
