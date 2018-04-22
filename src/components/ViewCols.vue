<template>
  <div id="dashboard">         
    <div class="fixed-action-btn">
      <router-link to ="/new" class="btn-floating btn-large red">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
    <div class="row">
       <div style="background: #c6f3e3;" class="col m4 s12">
        <center><h3>Cip</h3></center>
        <div  v-for="task in ViewCat1" v-bind:key="task.id" class="col s6">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title truncate"> {{task.task_name}} </span>
              <span v-html="task.task_description"></span>                
            </div>
            <div class="card-action">
              <div class="chip">{{task.task_status}}</div>
              <router-link class="right" v-bind:to="{name:'edit-task',params:{task_id:task.id}}">
                <i class="fa fa-pencil"></i>
              </router-link>    
            </div>
          </div>
        </div>
      </div>
      <div style="background: #c6eef3;" class="col m4 s12">
        <center><h3>Pipo</h3></center>
        <div  v-for="task in ViewCat2" v-bind:key="task.id" class="col s6">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title truncate"> {{task.task_name}} </span>
                <span v-html="task.task_description"></span>
            </div>
            <div class="card-action">
              <div class="chip">{{task.task_status}}</div>
              <router-link class="right" v-bind:to="{name:'edit-task',params:{task_id:task.id}}">
                <i class="fa fa-pencil"></i>
              </router-link>    
            </div>
          </div>
        </div>
      </div>
      <div style="background: #eab7ac;" class="col m4 s12">
        <center><h3>Ana</h3></center>
        <div  v-for="task in ViewCat3" v-bind:key="task.id" class="col s6">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title truncate"> {{task.task_name}} </span>
                <span v-html="task.task_description"></span>
            </div>
            <div class="card-action">
              <div class="chip">{{task.task_status}}</div>
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
      tasks:[]
    };
  },
  created() {
    db
      .collection("Tasks")
      .orderBy("tStatus")        
      .onSnapshot(querySnapshot => {
        this.tasks = [];        
        querySnapshot.forEach(doc => {          
          const data = {
            id: doc.id,
            task_name: doc.data().tName,
            task_description:doc.data().tDescription,
            task_deadline: doc.data().tDeadline,
            task_owner: doc.data().tOwner,
            task_status: doc.data().tStatus
          };
          // if (data.task_owner=="Cip"){
          //   this.tasksCip.push(data);
          // }else{
          //   this.tasksOthers.push(data);
          // }
          this.tasks.push(data);
          
        });
      }); 
  },
   computed: {
        ViewCat1: function() {
            return this.tasks.filter(function(task) {
                return task.task_owner == "Cip";
            });
        },
        ViewCat2: function() {
            return this.tasks.filter(function(task) {
               return task.task_owner == "Pipo";;
            });
        },
        ViewCat3: function() {
            return this.tasks.filter(function(task) {
                return task.task_owner == "Ana";
            });
        }
    }
};
</script>
