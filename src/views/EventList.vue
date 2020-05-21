<template>
  <div>
    <h1>Events Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';
import axios from 'axios';

export default {
  components: {
    EventCard,
  },
  data() {
    return {
      events: [],
    };
  },
  created() {
    axios
      .get('http://localhost:2020/events')
      .then(res => {
        this.events = res.data;
      })
      .catch(err => {
        console.log('Error: ', err.response);
      });
  },
};
</script>
