import Vue from 'vue';
import VueRouter from 'vue-router';
import aaaRoutes from './demo';

Vue.use(VueRouter);
const routes = [...aaaRoutes];

const router = new VueRouter({
    mode: 'hash',
    routes,
});
export default router;
