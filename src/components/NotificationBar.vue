<template>
  <div class="notification-bar" :class="notificationTypeClass">
    {{ notification.message }}
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      timeout: null,
    };
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 5000);
  },
  // future-proofs app
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
  computed: {
    notificationTypeClass() {
      return `-text-${this.notification.type}`;
    },
  },
  methods: mapActions('notification', ['remove']),
};
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
}
</style>
