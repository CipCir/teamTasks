<template>
  <div id="dashboard">         
    <div class="fixed-action-btn">
      <router-link to ="/new" class="btn-floating btn-large red">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
    <div class="row">
       <div style="background: #c6f3e3;" class="col s12 m6">
        <center><h3>Category1<br/>Cip</h3></center>
        <div  v-for="task in tasksCip" v-bind:key="task.id" class="col s6">
          <div class="card small blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title truncate"> {{task.task_name}} </span>
              <span v-html="task.task_description"></span>                
            </div>
            <div class="card-action">
              <div class="chip">{{task.task_owner}}</div>
              <router-link class="right" v-bind:to="{name:'edit-task',params:{task_id:task.id}}">
                <i class="fa fa-pencil"></i>
              </router-link>    
            </div>
          </div>
        </div>
      </div>
      <div style="background: #c6eef3;" class="col s12 m6">
        <center><h3>Category2<br/>Others</h3></center>
        <div  v-for="task in tasksOthers" v-bind:key="task.id" class="col s6">
          <div class="card small blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title truncate"> {{task.task_name}} </span>
                <span v-html="task.task_description"></span>
            </div>
            <div class="card-action">
              <div class="chip">{{task.task_owner}}</div>
              <router-link class="right" v-bind:to="{name:'edit-task',params:{task_id:task.id}}">
                <i class="fa fa-pencil"></i>
              </router-link>    
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
      .onSnapshot(querySnapshot => {
        this.tasksCip = [];
        this.tasksOthers = [];
        querySnapshot.forEach(doc => {          
          const data = {
            id: doc.id,
            task_name: doc.data().tName,
            task_description:doc.data().tDescription,
            task_deadline: doc.data().tDeadline,
            task_owner: doc.data().tOwner,
            task_status: doc.data().tStatus
          };
          if (data.task_owner=="Cip"){
            this.tasksCip.push(data);
          }else{
            this.tasksOthers.push(data);
          }
          
        });
      }); 
  }
};
</script>
