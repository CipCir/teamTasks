<template>
  <div id="new-task">
      <h3>New task</h3>
      <div class="row">
        <form @submit.prevent="saveTask" class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <input type="text" v-model="task_name" required>
              <label>Task Name</label>
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
              <select style="display:block" v-model="task_owner" >        
                <option v-for="owner in Owners" v-bind:key="owner.id" v-bind:value="owner">{{owner}}</option>        
              </select>
              <label class="active">Owner:</label>
            </div>
          </div>            
            <div class="row">
            <div class="input-field col s12">
              <input type="text" v-model="task_deadline" required>
              <label>Task Deadline</label>
            </div>
          </div>
          <div class="row">
    <div class="input-field col s12">
      <input type="text" placeholder="Task status" v-model="task_status" required>      
      <label class="active">Status:</label>
    </div>
  </div>
          <button type="submit" class="btn">Add</button>
          <router-link to="/" class="btn grey">Cancel</router-link>
        </form>
      </div>
  </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "new-task",
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
    saveTask() {
      db
        .collection("Tasks")
        .add({
          tName: this.task_name,
          tDescription:this.task_details,
          tOwner: this.task_owner,
          tDeadline: this.task_deadline,
          tStatus:this.task_status
        })
        .then(docRef => this.$router.push("/"))
        .catch(error => console.log(err));
    }
  },
  created() {
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
