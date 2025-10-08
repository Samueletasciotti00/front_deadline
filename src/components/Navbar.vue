<script>
export default {
  data() {
    return {
      name: "Navbar",
    };
  },
};
</script>

<template>
  <nav>
    <span>Scadenziario - Comune di Priverno</span>

    <ul>
      <li><button>Login</button></li>
    </ul>
  </nav>
</template>

<style scoped>
/* General */
nav {
  background-color: #303134;
  color: white;
  padding: 1rem;
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

button{
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
