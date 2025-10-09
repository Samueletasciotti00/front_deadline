<script>
import Navbar from './components/Navbar.vue';
import Login from './components/Login.vue';
import Home from './components/Home.vue';
import Deadlines from './components/Deadlines.vue';

export default {
      components: {
        Navbar,
        Login,
        Home,
        Deadlines
      }
    }
</script>

<template>  
  <Navbar></Navbar>
  <router-view></router-view>
</template>

<style scoped>
</style>
