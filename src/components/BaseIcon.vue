<template>
  <div class="icon-wrapper">
    <users-icon class="icon" />
    <slot></slot>
  </div>
</template>

<script>
import { UsersIcon } from 'vue-feather-icons';

export default {
  components: {
    UsersIcon,
  },
};
</script>

<style scoped>
.icon-wrapper {
  display: inline-flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.4);
  font-size: 1rem;
  font-weight: 600;
}
.icon {
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
  margin-right: 6px;
}
</style>
