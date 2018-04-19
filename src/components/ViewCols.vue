<template>
  <div id="dashboard">        
    <div class="fixed-action-btn">
      <router-link to ="/new" class="btn-floating btn-large red">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
    <div class="row">
      <div style="background: #f1ebeb;" class="col s12 m6">
        <center><h3>Category1-Cip</h3></center>
        <div  v-for="task in tasksCip" v-bind:key="task.id" class="col s6">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title"> {{task.task_name}} </span>
              asdfas dfasdfa sdf asdf asdf asdfa sdf asdf asdfa sdf
              <div class="chip">{{task.task_owner}}</div>
            </div>
            <div class="card-action">
              <router-link class="secondary-content" v-bind:to="{name:'edit-task',params:{task_id:task.id}}">
                <i class="fa fa-pencil"></i>
              </router-link>
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>
      </div>
      <div style="background: #c6eef3;" class="col s12 m6">
        <center><h3>Category2-Others</h3></center>
        <div  v-for="task in tasksOthers" v-bind:key="task.id" class="col s6">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title"> {{task.task_name}} </span>
              asdfas dfasdfa sdf asdf asdf asdfa sdf asdf asdfa sdf
              <div class="chip">{{task.task_owner}}</div>
            </div>
            <div class="card-action">
              <router-link class="secondary-content" v-bind:to="{name:'edit-task',params:{task_id:task.id}}">
                <i class="fa fa-pencil"></i>
              </router-link>
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>
      </div>
        
      </div>


  </div>
</template>

<script>
import db from "./firebaseInit";

export default {
  name: "view-cols",
  data() {
    return {
      tasksCip: [],
      tasksOthers:[]
    };
  },
  created() {
    db
      .collection("Tasks")      
      .where('tOwner', '==', "Cip")
      .onSnapshot(querySnapshot => {
        this.tasksCip = [];
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            task_name: doc.data().tName,
            task_deadline: doc.data().tDeadline,
            task_owner: doc.data().tOwner,
            task_status: doc.data().tStatus
          };
          this.tasksCip.push(data);
        });
      });
    db
      .collection("Tasks")      
      .where('tOwner', '>', "Cip")
      .onSnapshot(querySnapshot => {
        this.tasksOthers = [];
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            task_name: doc.data().tName,
            task_deadline: doc.data().tDeadline,
            task_owner: doc.data().tOwner,
            task_status: doc.data().tStatus
          };
          this.tasksOthers.push(data);
        });
      });  
  }
};
</script>
