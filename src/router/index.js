import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewTask from '@/components/NewTask'
import EditTask from '@/components/EditTask'
import ViewCols from '@/components/ViewCols'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/new',
      name: 'new-task',
      component: NewTask
    },
    {
      path: '/edit/:task_id',
      name: 'edit-task',
      component: EditTask
    }
    ,
    {
      path: '/view/cols',
      name: 'view-cols',
      component: ViewCols
    }
  ]
})
