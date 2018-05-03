<template>
  <div id="edit-task" class="container">
    <h3>Edit task</h3>
    <div class="row">
      <form @submit.prevent="updateTask" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input placeholder="Task name" type="text" v-model="task_name"
              required>
            <label class="active">Name:</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <textarea id="textarea1" placeholder="Task details" v-model="task_details"
              required />
            <label for="textarea1" class="active">Details:</label>
          </div>
        </div>   
         <div class="row">
          <div class="input-field col s12">
           <select style="display:block" v-model="task_env">
              <option v-for="env in Envmts" v-bind:key="env.id"
                v-bind:value="env">{{env}}</option>
            </select>
            <label class="active">Environment:</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="date" placeholder="Task deadline"
              v-model="task_deadline" required>
            <label class="active">Deadline:</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <select style="display:block" v-model="task_owner">
              <option v-for="owner in Owners" v-bind:key="owner.id"
                v-bind:value="owner">{{owner}}</option>
            </select>
            <label class="active">Owner:</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
           <select style="display:block" v-model="task_status">
              <option v-for="status in Statuses" v-bind:key="status.id"
                v-bind:value="status">{{status}}</option>
            </select>
            <label class="active">Status:</label>
          </div>
        </div>
        <button type="submit" class="btn">Save</button>
        <router-link to="/view/cols" class="btn grey">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "./firebaseInit";
import fireList from "./fireLists";

export default {
  name: "edit-task",
  data() {
    return {
      task_name: null,
      task_details: null,
      task_env: null,
      task_deadline: null,
      task_owner: null,
      task_status: null,
      orig_task_name: null,
      orig_task_details: null,
      orig_task_env: null,
      orig_task_deadline: null,
      orig_task_owner: null,
      orig_task_status: null,      
      Owners:fireList.ownersList,
      Statuses:fireList.statusesList,
      Envmts:fireList.envsList
    };
  },
  methods: {
    updateTask() {
      db
        .collection("Tasks")
        .doc(this.$route.params.task_id)
        .set({
          tName: this.task_name,
          tDescription: this.task_details,
          tEnv:this.task_env,
          tDeadline: this.task_deadline,
          tOwner: this.task_owner,
          tStatus: this.task_status
        })
        .then(docRef => {
          var ChangedInfo = "";
          if (this.orig_task_name != this.task_name) {
            ChangedInfo =
              ChangedInfo +
              "Task name:" +
              this.orig_task_name +
              "##" +
              this.task_name +
              "||";
          }
          if (this.orig_task_details != this.task_details) {
            ChangedInfo =
              ChangedInfo +
              "Details:" +
              this.orig_task_details +
              "##" +
              this.task_details +
              "||";
          }
          if (this.orig_task_env != this.task_env) {
            ChangedInfo =
              ChangedInfo +
              "Environment:" +
              this.orig_task_env +
              "##" +
              this.task_env +
              "||";
          }
          if (this.orig_task_deadline != this.task_deadline) {
            ChangedInfo =
              ChangedInfo +
              "Deadline:" +
              this.orig_task_deadline +
              "##" +
              this.task_deadline +
              "||";
          }
          if (this.orig_task_owner != this.task_owner) {
            ChangedInfo =
              ChangedInfo +
              "Owner:" +
              this.orig_task_owner +
              "##" +
              this.task_owner +
              "||";
          }
          if (this.orig_task_status != this.task_status) {
            ChangedInfo =
              ChangedInfo +
              "Status:" +
              this.orig_task_status +
              "##" +
              this.task_status +
              "||";
          }
          //  console.log(ChangedInfo.slice(0,-2))
          //log the change
          if (ChangedInfo != "") {
            db
              .collection("Log")
              .add({
                date: new Date().toString().slice(0,10) +" "+new Date(new Date()).toString().split(' ')[4],
                tName: this.task_name,
                updated: ChangedInfo.slice(0, -2),
                user: firebase.auth().currentUser.email
              })
              .catch(function(error) {
                console.error("Error adding document ChangedInfo: ", error);
              });
          }
          this.$router.push("/view/cols");
        })
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
        this.task_env = doc.data().tEnv;
        this.task_deadline = doc.data().tDeadline;
        this.task_owner = doc.data().tOwner;
        this.task_status = doc.data().tStatus;
        this.orig_task_name = this.task_name;
        this.orig_task_details = this.task_details;
        this.orig_task_env = this.task_env;
        this.orig_task_deadline = this.task_deadline;
        this.orig_task_owner = this.task_owner;
        this.orig_task_status = this.task_status;
      }); 
  }
};
</script>

<style>
textarea {
  margin-top: 10px;
  height: 107px;
}
</style>

