import Vue from "vue";
import VueRouter from "vue-router";
import EventList from '../views/EventList'
import EventCreate from '../views/EventCreate'
import EventShow from '../views/EventShow'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventList
  },
  {
    path: "/event",
    name: "event-show",
    component: EventShow
  },
  {
    path: "/event/create",
    name: "event-create",
    component: EventCreate
  }
];

const router = new VueRouter({
  routes
});

export default router;
