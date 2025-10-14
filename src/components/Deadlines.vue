<script>
import axios from "axios";
import { store } from "../store";
export default {
  name: "Deadlines",
  setup() {
    return { store };
  },
  data() {
    return {
      deadlines: [],
      error: null,
      isLoading: false,
    };
  },
  mounted() {
    this.callApi();
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleString("it-IT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    async callApi() {
      this.error = null;
      this.isLoading = true;

      try {
        const response = await axios.get("http://127.0.0.1:3333/deadlines", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = response.data;
        this.deadlines = data;

        // Aggiorno lo userRole nell
      } catch (error) {
        console.error("Errore nel caricamento delle deadlines:", error);
        this.error =
          error.response?.data?.message || "Errore durante il caricamento";
        localStorage.removeItem("token");
      } finally {
        this.isLoading = false;
      }
    },
    takeDeadline(id) {
      try {
        const response = axios.post(
          `http://127.0.0.1:3333/deadlines/${id}/take`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        alert("Hai preso in carico la deadline con ID: " + id);
      } catch (error) {
        console.error("Errore nel prendere in carico la deadline:", error);
        this.error =
          error.response?.data?.message || "Errore durante il caricamento";
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<template>
  <!-- <h1>Pagina Delle Deadlines</h1> -->

  <div v-if="isLoading">Caricamento...</div>
  <div v-else-if="error" class="error">{{ error }}</div>

  <table v-else class="deadlines-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Titolo</th>
        <th>Descrizione</th>
        <th>Scadenza</th>
        <th>Azioni</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="deadline in deadlines" :key="deadline.id">
        <td>{{ deadline.id }}</td>
        <td>{{ deadline.title }}</td>
        <td>{{ deadline.description }}</td>
        <td>
          {{ formatDate(deadline.deadline) }}
        </td>

        <td>
          <!-- QUI POI ANDRANNO I BOTTONI -->
          <!-- Esempi (per ora solo placeholder) -->
          <button v-if="store.userRole === 'ADMIN'" class="action-btn">
            Modifica
          </button>
          <button @click="takeDeadline(deadline.id)" class="action-btn">
            Prendi in carico
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
thead {
  display: run-in;
}

.error {
  color: #ff6b6b;
  text-align: center;
  margin: 1rem 0;
}
.deadlines-table {
  width: 90%;
  margin: 2rem auto;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  background-color: #2b2b2b; /* dark grey background */
  color: rgba(255, 255, 255, 0.87); /* testo leggero */
  font-family: "Google Sans Code", monospace;
  font-weight: 300;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.deadlines-table thead {
  background-color: #1f1f1f;
  text-align: left;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.deadlines-table th,
.deadlines-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #3a3a3a;
}

.deadlines-table tbody tr:hover {
  background-color: #3a3a3a;
  cursor: default;
  transition: background-color 0.2s ease-in-out;
}

.deadlines-table th {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
}

.deadlines-table td {
  font-size: 0.9rem;
}

/* Pulsanti */
.action-btn {
  background-color: #3a3a3a;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid #555;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-family: "Google Sans Code", monospace;
  font-size: 0.85rem;
  transition: all 0.2s ease;
  margin-right: 6px;
}

.action-btn:hover {
  background-color: #42b983;
  border-color: #42b983;
  color: #000;
}

/* Responsive per mobile */
@media screen and (max-width: 768px) {
  .deadlines-table {
    width: 100%;
    font-size: 0.8rem;
  }

  .deadlines-table th,
  .deadlines-table td {
    padding: 8px 10px;
  }

  .action-btn {
    padding: 4px 8px;
    font-size: 0.75rem;
  }
}

/* Titolo pagina */
h1 {
  text-align: center;
  margin-top: 2rem;
  font-family: "Google Sans Code", monospace;
  color: rgba(255, 255, 255, 0.87);
  font-weight: 400;
}
</style>
