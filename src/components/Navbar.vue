<script>
import { store } from "../store";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    function logout() {
      localStorage.removeItem("token");
      store.loggedIn = false;
      router.push("/login"); // cambio pagina SENZA refresh
    }

    return { store, logout };
  }
};
</script>

<template>
  <nav>
    <span>Scadenziario - Comune di Priverno</span>

    <ul>
      <!-- Mostra se NON loggato -->
      <li v-if="!store.loggedIn">
        <router-link to="/"><button>Home</button></router-link>
      </li>

      <!-- Mostra Deadlines solo se loggato -->
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
nav {
  background-color: #303134;
  color: white;
  padding: 1rem;
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
  padding: 1rem 2rem;
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
