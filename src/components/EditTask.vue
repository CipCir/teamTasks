<template>
  <div id="edit-task">
      <h3>Edit task</h3>
      <div class="row">
<form @submit.prevent="updateTask" class="col s12">
  <div class="row">
    <div class="input-field col s12">
      <input placeholder="Task name" type="text" v-model="task_name" required>      
      <label class="active">Name:</label>
    </div>
  </div>
  <div class="row">
    <div class="input-field col s12">
      <input type="text" placeholder="Task details" v-model="task_details" required>      
      <label class="active">Details:</label>
    </div>
  </div>
  <div class="row">
    <div class="input-field col s12">
      <input type="text" placeholder="Task deadline" v-model="task_deadline" required>      
      <label class="active">Deadline:</label>
    </div>
  </div>
  <div class="row">
    <div class="input-field col s12">      
      <select style="display:block" v-model="task_owner" >        
        <option v-for="owner in Owners" v-bind:key="owner.id" v-bind:value="owner">{{owner}}</option>        
      </select>
      <label class="active">Owner:</label>
    </div>
  </div>
  <div class="row">
    <div class="input-field col s12">
      <input type="text" placeholder="Task status" v-model="task_status" required>      
      <label class="active">Status:</label>
    </div>
  </div>
  <button type="submit" class="btn">Save</button>
  <router-link to="/" class="btn grey">Cancel</router-link>
</form>
      </div>
  </div>
</template>

<script>
import db from "./firebaseInit";

export default {
  name: "edit-task",
  data() {
    return {
      task_name: null,
      task_details: null,
      task_deadline: null,
      task_owner: null,
      task_status: null,
      Owners:[]
    };
  },  
  methods: {   
    updateTask() {
      db
        .collection("Tasks")
        .doc(this.$route.params.task_id)
        .set({
            tName:this.task_name,
            tDescription:this.task_details,
            tDeadline:this.task_deadline,
            tOwner:this.task_owner,
            tStatus:this.task_status
        })
        .then(docRef => this.$router.push("/"))
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    }
  },
  created() {
    db
      .collection("Tasks")
      .doc(this.$route.params.task_id)
      .get()
      .then(doc => {
        this.task_name = doc.data().tName;
        this.task_details = doc.data().tDescription;
        this.task_deadline = doc.data().tDeadline;
        this.task_owner = doc.data().tOwner;
        this.task_status = doc.data().tStatus;
      });

      //get users
      db
      .collection("Owners")
      .get()
      .then((querySnapshot) => {        
        querySnapshot.forEach((doc) => {     
          // console.log(doc.id)     
          this.Owners.push(doc.id)          
        })
      })
  }
  };
</script>