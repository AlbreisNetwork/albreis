import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import Design1 from './components/Design1.vue';
import Design2 from './components/Design2.vue';
import Design3 from './components/Design3.vue';
import Design4 from './components/Design4.vue';

Vue.use(Router)

const routes = [
  { path: '/', component: Design1 },
  { path: '/design2', component: Design2 },
  { path: '/design3', component: Design3 },
  { path: '/design4', component: Design4 }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new Router({
  routes // short for `routes: routes`
})

const bus = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

Object.defineProperty(Vue.prototype, '$bus', {
    get(){
        return this.$root.bus;
    },
    set(newInstance){
        this.$root.bus = newInstance;
    },
});