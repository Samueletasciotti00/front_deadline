<script>
import { store, logout } from "../store";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    function handleLogout() {
      logout();
      router.push("/login");
      store.userName = null;
    }

    return { store, logout: handleLogout };
  },
};
</script>

<template>
  <nav>
    <div class="left">
      <span class="user-name" v-if="store.userName && store.loggedIn">
        {{ store.userName }}
      </span>
      <span class="user-name" v-else> 
        <i class="fa-solid fa-circle-user"></i>
      </span>
      <span>Scadenziario - Comune di Priverno</span>
    </div>
    <ul>
      <li v-if="store.loggedIn && store.userRole == 'ADMIN'">
        <router-link to="/create"><button>Crea</button></router-link>
      </li>

      <!-- Mostra se NON loggato -->
      <li v-if="!store.loggedIn">
        <router-link to="/"><button>Home</button></router-link>
      </li>

      <!-- Mostra Deadlines solo se loggato -->
      <li v-if="store.loggedIn">
        <router-link to="/my-deadlines"><button>My Tasks</button></router-link>
      </li>

      <li v-if="store.loggedIn">
        <router-link to="/deadlines"><button>Tasks</button></router-link>
      </li>

      <!-- Se NON loggato -> mostra Login -->
      <li v-if="!store.loggedIn">
        <router-link to="/login"><button>Login</button></router-link>
      </li>

      <!-- Se loggato -> mostra Logout -->
      <li v-else>
        <button @click="logout">Logout</button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
/* General */
button:focus {
  outline: none;
}

.user-name {
  color: white;
  font-weight: bolder;
  text-align: center;
  border: 1px solid white;
  padding: 0.5rem;
}

.user-name i {
  color: white;
  font-size: 1.5rem;
}

nav {
  display: flex;
  justify-content: space-between; /* Sinistra e destra */
  align-items: center; /* Allinea verticalmente */
  background-color: #303134;
  color: white;
  padding: 1rem;
}

/* Gruppo sinistro (nome utente + titolo) */
nav .left {
  display: flex;
  align-items: center;
  gap: 1rem; /* spazio tra nome e titolo */
}

/* Gruppo destro (menu) */
nav ul {
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
  align-items: center;
}

a {
  text-decoration: none;
  color: white;
}

/* Impostazioni della navbar */
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Impostazioni della lista */
nav ul {
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
}

button {
  background-color: #303134;
  border: 1px solid white;
  color: white;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
  transition: 0.4s;
  font-weight: bolder;
}

button:hover {
  background-color: #42b983;
}
</style>
