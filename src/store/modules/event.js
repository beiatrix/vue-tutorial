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
  createEvent({ commit, rootState, dispatch }, event) {
    // can access another module's state
    console.log('User creating Event is ' + rootState.user.user.name);

    // access another module's actions with dispatch -- import at line 28
    // dispatch('moduleName/actionToCall', payload, {root: true})

    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event);
        const notification = {
          type: 'success',
          message: 'Your event has been created!',
        };
        dispatch('notification/add', notification, { root: true });
      })
      .catch(err => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating your event: ' + err.message,
        };
        dispatch('notification/add', notification, { root: true });
        throw err;
      });
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(res => {
        commit('SET_EVENT_TOTAL', res.headers['x-total-count']);
        commit('SET_EVENTS', res.data);
      })
      .catch(err => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events: ' + err.message,
        };
        dispatch('notification/add', notification, { root: true });
      });
  },
  fetchEvent({ commit, getters, dispatch }, id) {
    let event = getters.getEventById(id);
    // prevent us making duplicate API calls
    if (event) {
      commit('SET_EVENT', event);
      return event;
    } else {
      // return a promise so .then() will work in router hook
      return EventService.getEvent(id)
        .then(res => {
          commit('SET_EVENT', res.data);
          return res.data;
        })
        .catch(err => {
          const notification = {
            type: 'error',
            message: 'There was a problem fetching event: ' + err.message,
          };
          dispatch('notification/add', notification, { root: true });
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
