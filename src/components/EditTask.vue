<template>
  <div id="edit-task">
      <h3>Edit task</h3>
      <div class="row">
<form @submit.prevent="editTask" class="col s12">
  <div class="row">
    <div class="input-field col s12">
      <input type="text" v-model="task_name" required>      
    </div>
  </div>
  <div class="row">
    <div class="input-field col s12">
      <input type="text" v-model="task_deadline" required>      
    </div>
  </div>
  <div class="row">
    <div class="input-field col s12">
      <input type="text" v-model="task_owner" required>      
    </div>
  </div>
  <div class="row">
    <div class="input-field col s12">
      <input type="text" v-model="task_status" required>      
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
      task_deadline: null,
      task_owner: null,
      task_status: null
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log(to.params.task_id);
    db
      .collection("Tasks")
      .doc(to.params.task_id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.task_name = doc.data().tName;
            vm.task_deadline = doc.data().tDeadline;
            vm.task_owner = doc.data().tOwner;
            vm.task_status = doc.data().tStatus;
          });
        });
      });
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      db
        .collection("Tasks")
        .doc(to.params.task_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.task_name = doc.data().tName;
            this.task_deadline = doc.data().tDeadline;
            this.task_owner = doc.data().tOwner;
            this.task_status = doc.data().tStatus;
          });
        });
    },
    updateTask() {
      return null;
    }
  }
};
</script>