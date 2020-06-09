import Vue from 'vue';
import VueRouter from 'vue-router';
import EventList from '../views/EventList';
import EventCreate from '../views/EventCreate';
import EventShow from '../views/EventShow';
import NProgress from 'nprogress';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList,
  },
  {
    path: '/event/:id',
    name: 'event-show',
    component: EventShow,
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store.dispatch('event/fetchEvent', routeTo.params.id).then(event => {
        routeTo.params.event = event;
        next();
      });
    },
  },
  {
    path: '/event/create',
    name: 'event-create',
    component: EventCreate,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

// start the progress bar when routing begins
router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next();
});

// finish the progress bar when routing is about to end
router.afterEach(() => {
  NProgress.done();
});

export default router;
