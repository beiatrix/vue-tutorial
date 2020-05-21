<template>
  <div>
    <h1>Create Event, {{ userName }}</h1>
    <p>This event was created by {{ userName }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState({
    userName: state => state.user.name,
    userID: state => state.user.id,
  }),
};
</script>
