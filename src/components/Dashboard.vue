<template>
  <div id="dashboard" class="container">    
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>Tasks</h4>
      </li>
      <li v-for="task in tasks" v-bind:key="task.id" class="collection-item row">        
        <div class="col m3">{{task.task_name}}</div>
        <div class="chip">{{task.task_owner}}</div>
        <router-link v-if="isLoggedIn" class="secondary-content" v-bind:to="{name:'edit-task',params:{task_id:task.id}}">
          <i class="fa fa-pencil"></i>
        </router-link>         
      </li>
    </ul>

    <div v-if="isLoggedIn" class="fixed-action-btn">
      <router-link to ="/new" class="btn-floating btn-large red">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
    <div style="margin-bottom:100px"></div>    
  </div>
  
</template>

<script>
import db from "./firebaseInit";
import firebase from 'firebase';

export default {
  name: "dashboard",
  data() {
    return {
      isLoggedIn: false,
      tasks: []
       
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;     
    };
    db
      .collection("Tasks")
      .orderBy("tOwner")
      .onSnapshot(querySnapshot => {
        this.tasks = [];
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            task_name: doc.data().tName,
            task_deadline: doc.data().tDeadline,
            task_owner: doc.data().tOwner,
            task_status: doc.data().tStatus
          };
          this.tasks.push(data);
        });
      });
  }
};
</script>
