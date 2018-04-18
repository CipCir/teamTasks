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
              <input type="text" v-model="task_owner" required>
              <label>Task Owner</label>
            </div>
          </div>
            <div class="row">
            <div class="input-field col s12">
              <input type="text" v-model="task_deadline" required>
              <label>Task Deadline</label>
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
      task_owner: null,
      task_deadline: null
    };
  },
  methods: {
    saveTask() {
      db
        .collection("Tasks")
        .add({
          tName: this.task_name,
          tOwner: this.task_owner,
          tDeadline: this.task_deadline
        })
        .then(docRef => this.$router.push("/"))
        .catch(error => console.log(err));
    }
  }
};
</script>
