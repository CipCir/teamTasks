<template>
  <nav>
    <div class="nav-wrapper green">
        <span style="margin-left:20px" class="brand-logo left hide-on-small-only">IQConcepts team tasks</span>
      <ul id="nav-mobile" class="right">       
        <li><router-link to="/" >View Dashboard</router-link></li>
        <li v-if="isLoggedIn"><router-link to="/view/cols" class="">Active per owner</router-link></li>  
        <li v-if="!isLoggedIn"><router-link to="/login" class="">Login</router-link></li>
        <!-- <li v-if="!isLoggedIn"><router-link to="/register" class="">Register</router-link></li> -->
        <li v-if="isLoggedIn"><button v-on:click="logout" class="btn black">Logout</button></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import firebase from 'firebase';
export default {
  name: 'navbar',
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
           this.$router.go({ path: this.$router.path });
        });
    }
  }
};
</script>
