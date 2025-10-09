<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      token: "",
      error: null,
      isLoading: false
    };
  },
  methods: {
    async callApi() {
      this.error = null;
      this.isLoading = true;

      try {
        const response = await axios.post("http://127.0.0.1:3333/login", {
          email: this.email,
          password: this.password,
        });

        const data = response.data;
        console.log(data);

        // Salva il token dalla risposta
        this.token = data.token;
        localStorage.setItem("token", data.token);

        // Opzionalmente salva le info utente
        if (data.email) {
          localStorage.setItem("userEmail", data.email);
        }

        // Reindirizza o emetti un evento di successo
        this.$router.push("/deadlines"); 

      } catch (error) {
        console.error("Errore nel login:", error);
        this.error = error.response?.data?.message || "Errore durante il login";
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<template>
  <div class="login-container">
    <h2>Accedi</h2>
    
    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <form @submit.prevent="callApi">
      <div class="form-group">
        <label for="email">Email</label>
        <input 
          type="email" 
          id="email"
          v-model="email" 
          placeholder="Email" 
          required 
          :disabled="isLoading"
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Password"
          required
          :disabled="isLoading"
        />
      </div>

      <button 
        type="submit" 
        class="login-btn"
        :disabled="isLoading"
      >
        {{ isLoading ? 'Caricamento...' : 'Login' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 350px;
  margin: 50px auto;
  padding: 15px;
  background-color: #1a1a1a;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.login-container h2 {
  text-align: center;
  margin-bottom: 25px;
  font-weight: 500;
  font-size: 1.4rem;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.9rem;
  color: #bfbfbf;
}

input {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #333;
  background-color: #262626;
  color: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus {
  outline: none;
  border-color: #4d90fe;
  box-shadow: 0 0 0 2px rgba(77, 144, 254, 0.3);
}

.login-btn {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  font-weight: 600;
  background-color: #fff;
  color: #000;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.1s;
}

.login-btn:hover {
  opacity: 0.9;
}

.login-btn:active {
  transform: scale(0.98);
}

/* Piccolo link extra (es. password dimenticata) */
.extra-link {
  text-align: center;
  margin-top: 15px;
  font-size: 0.85rem;
}

.extra-link a {
  color: #4d90fe;
  text-decoration: none;
}

.extra-link a:hover {
  text-decoration: underline;
}
</style>
