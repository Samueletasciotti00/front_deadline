<script>
import Navbar from "./components/Navbar.vue";
import Login from "./components/Login.vue";
import Home from "./components/Home.vue";
import Deadlines from "./components/Deadlines.vue";
import MyDeadline from "./components/MyDeadlines.vue";

export default {
  components: {
    Navbar,
    Login,
    Home,
    Deadlines,
  },
};
</script>

<template>
  <Navbar></Navbar>
  <transition name="zoom">
    <router-view> </router-view>
  </transition>
</template>


<style scoped>
/* Pausa prima dell'entrata (usiamo delay) */
.zoom-leave-active,
.zoom-enter-active {
  will-change: transform, opacity;
  backface-visibility: hidden;
}

.zoom-leave-active {
  transition: all 0.3s ease;
}

.zoom-leave-from {
  transform: scale(1);
  opacity: 1;
}

.zoom-leave-to {
  transform: scale(0.95);
  opacity: 0;
}

.zoom-enter-active {
  transition: all 0.3s ease;
  transition-delay: 0.15s;
}

.zoom-enter-from {
  transform: scale(0.95);
  opacity: 0;
}

.zoom-enter-to {
  transform: scale(1);
  opacity: 1;
}
</style>

