import Vue from 'vue';
import Vuex from 'vuex';
import EventService from '@/services/EventService.js';
import * as user from '@/store/modules/user.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community',
    ],
    events: [],
    eventsTotal: 0,
    event: {},
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENTS(state, events) {
      state.events = events;
    },
    SET_EVENT_TOTAL(state, total) {
      state.eventsTotal = total;
    },
    SET_EVENT(state, event) {
      state.event = event;
    },
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event);
      });
    },
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then(res => {
          commit('SET_EVENT_TOTAL', res.headers['x-total-count']);
          commit('SET_EVENTS', res.data);
        })
        .catch(err => {
          console.log('Error: ', err.response);
        });
    },
    fetchEvent({ commit, getters }, id) {
      let event = getters.getEventById(id);
      // prevent us making duplicate API calls
      if (event) {
        commit('SET_EVENT', event);
      } else {
        EventService.getEvent(id)
          .then(res => {
            commit('SET_EVENT', res.data);
          })
          .catch(err => {
            console.log('Error: ', err.response);
          });
      }
    },
  },
  getters: {
    // function that returns a function
    getEventById: state => id => {
      return state.events.find(event => (event.id = id));
    },
  },
  modules: {
    user,
  },
});
