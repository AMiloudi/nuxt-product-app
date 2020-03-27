<template >
  <div >
 <h1>Profiel</h1>
 <p>Naam: {{name}}</p>
 <p>E-mail: {{email}}</p>
<button v-if="!showFields" @click.prevent="showInputFields">Bewerk je profiel</button>
<br>
<br>
<div v-if="showFields" class="row form-group size--sm">
<div class="col-12">
<p>Nieuwe Naam</p>
<input type="text" name="name" id="name" v-model="newName" class="form-control">
</div>
<div class="col-12">
<p>Nieuw E-mail</p>
<input type="text" name="useremail" id="useremail" v-model="newEmail" class="form-control">
</div>
<div class="col-12">
<p>Nieuw Wachtwoord</p>
<input type="password" name="newpassword" id="newpassword" v-model="newPassword" @blur="checkPassword" class="form-control">
</div>
<div class="col-12">
<p>Wachtwoord bevestigen</p>
<input type="password" name="confirmationPassword" id="confirmationPassword" v-model="confirmationPassword" class="form-control"><br v-if="showErrorConfirmationEmpty || showPasswordFormatError || showErrorNoEqualPassword"/>
<span style="color:red" v-if="showErrorConfirmationEmpty">Je moet ook je wachtwoord bevestigen</span>
<span style="color:red" v-if="showPasswordFormatError">Je wachtwoord moet tenminste bestaan uit 8 karacters, een hoofdletter, een kleine letter, een cijfer en een speciaal teken.</span>
<span style="color:red" v-if="showErrorNoEqualPassword">Je wachtwoorden komen niet overeen</span>
</div>
<button @click.prevent="putProfile">Bewerk</button>
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
	id: "",
	name: "",
	email: "",
	newName: "",
	newEmail: "",
	newPassword: "",
	confirmationPassword: "",
	showFields: false,
	showErrorConfirmationEmpty: false,
	showPasswordFormatError: false,
	showErrorNoEqualPassword : false,
    };
  },
async created() {
let res = await	axios.get( `https://assessment.7apps.nl/api/profile`, {
	headers: {
	Authorization: 'Bearer ' + this.token
}
});
	if(!!res){
	this.id = res.data.id
	this.name = res.data.name
	this.email = res.data.email
} 
},
  computed: {
  },
  mounted() {
  },
  methods: {
    showInputFields() {
	this.showFields = true;
	this.newName = this.name;
	this.newEmail = this.email;
   },
async putProfileNoPassword(){
	let res = await	axios.put( `https://assessment.7apps.nl/api/profile`, {
		name: this.newName,
		email: this.newEmail,
	}, {
		headers: {
		Authorization: 'Bearer ' + this.token
	}
	});
},
async putProfilePassword(){
	let res = await	axios.put( `https://assessment.7apps.nl/api/profile`, {
		name: this.newName,
		email: this.newEmail,
		password: this.newPassword,
		password_confirmation: this.confirmationPassword,
	}, {
		headers: {
		Authorization: 'Bearer ' + this.token
	}
	});
	let res2 = await	axios.get( `https://assessment.7apps.nl/api/profile`, {
		headers: {
		Authorization: 'Bearer ' + this.token
	}
	});
		if(!!res2){
		this.id = res2.data.id
		this.name = res2.data.name
		this.email = res2.data.email
	} 
},	
async   putProfile(){
this.showErrorConfirmationEmpty = false;
this.showErrorNoEqualPassword = false;
if (this.newPassword !== '' && this.confirmationPassword !== '' && this.newPassword == this.confirmationPassword){
	await this.putProfilePassword();
} else if(this.newPassword !== '' && this.confirmationPassword == '') {
	this.showErrorConfirmationEmpty = true;
} else if (this.newPassword !== this.confirmationPassword ) {
	this.showErrorNoEqualPassword = true;
}else {
	await this.putProfileNoPassword();

}
let res2 = await	axios.get( `https://assessment.7apps.nl/api/profile`, {
	headers: {
	Authorization: 'Bearer ' + this.token
}
});
	if(!!res2){
	this.id = res2.data.id
	this.name = res2.data.name
	this.email = res2.data.email
} 
	this.showFields = false;	
},
  checkPassword(){
	this.showPasswordFormatError = false;
     if (!this.newPassword.match(/^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).*$/)) {
	this.showPasswordFormatError = true;	
}
   },

  },
};
</script>

