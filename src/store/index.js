import Vue from 'vue';
import Vuex from 'vuex';
import EventService from '@/services/EventService.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Adam Jahr' },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community',
    ],
    events: [
      { id: 1, title: '...', organizer: '...' },
      { id: 2, title: '...', organizer: '...' },
      { id: 3, title: '...', organizer: '...' },
      { id: 4, title: '...', organizer: '...' },
    ],
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENTS(state, events) {
      state.events = events;
    },
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event);
      });
    },
    fetchEvents({ commit }) {
      EventService.getEvents()
        .then(res => {
          commit('SET_EVENTS', res.data);
        })
        .catch(err => {
          console.log('Error: ', err.response);
        });
    },
  },
  getters: {
    // function that returns a function
    getEventById: state => id => {
      return state.events.find(event => (event.id = id));
    },
  },
  modules: {},
});
