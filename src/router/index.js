import Vue from 'vue'
import Router from 'vue-router'
import CategoryComponent from '@/components/pages/categories/CategoryIndexComponent.vue'


Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'HelloWorld',
        component: CategoryComponent
    }
]

export default new Router({
  routes
})
