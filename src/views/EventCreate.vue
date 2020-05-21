<template>
  <div>
    <h1>Create Event, {{ user.name }}</h1>
    <p>This event was created by {{ user.id }}</p>
    <p>{{ getEvent(1) }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    getEvent() {
      return this.$store.getters.getEventById;
    },
    ...mapState(['user', 'categories']),
  },
};
</script>
