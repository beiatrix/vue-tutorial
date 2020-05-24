import EventService from '@/services/EventService.js';

// ensures all mutations, actions, and getters will be namespaced under 'event'
export const namespaced = true;

export const state = {
  events: [],
  eventsTotal: 0,
  event: {},
};

export const mutations = {
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
};

export const actions = {
  createEvent({ commit, rootState }, event) {
    // can access another module's state
    console.log('User creating Event is ' + rootState.user.user.name);

    // access another module's actions with dispatch -- import at line 28
    // dispatch('moduleName/actionToCall', payload, {root: true})

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
};

export const getters = {
  // function that returns a function
  getEventById: state => id => {
    return state.events.find(event => (event.id = id));
  },
};
