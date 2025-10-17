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
        const token = localStorage.getItem("token");
        if (!token) {
          this.error = "Non autenticato";
          return;
        }

        const response = await axios.get("http://127.0.0.1:3333/deadlines", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data;

        // Filtra in base al ruolo
        this.deadlines =
          store.userRole === "ADMIN"
            ? data // Admin vede tutte le deadlines
            : data.filter(
                // Prendo tutte le deadline dato che sono admin
                (deadline) => !deadline.takenByUserId
              );
      } catch (error) {
        console.error("Errore nel caricamento delle deadlines:", error);
        this.error =
          error.response?.data?.message || "Errore durante il caricamento";

        // se il token è invalido, rimuovilo
        localStorage.removeItem("token");
        store.loggedIn = false;
        store.userRole = null;
      } finally {
        this.isLoading = false;
      }
    },
    async takeDeadline(id) {
      try {
        const response = await axios.post(
          `http://127.0.0.1:3333/deadlines/${id}/take`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // Aggiorna la lista locale per riflettere il cambio
        this.callApi();
      } catch (error) {
        console.error("Errore nel prendere in carico la deadline:", error);
        this.error =
          error.response?.data?.message || "Errore durante il caricamento";
      }
    },
  },
};
</script>

<template>
  <div v-if="isLoading">Caricamento...</div>
  <div v-else-if="error" class="error">{{ error }}</div>

  <table v-else class="deadlines-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Titolo</th>
        <th>Descrizione</th>
        <th>Scadenza</th>
        <th>Status</th>
        <th v-if="store.userRole == 'ADMIN'">Presa in Carido da</th>
        <th>Azioni</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="deadline in deadlines" :key="deadline.id">
        <td>{{ deadline.id }}</td>
        <td>{{ deadline.title }}</td>
        <td>{{ deadline.description }}</td>
        <td>{{ formatDate(deadline.deadline) }}</td>
        <td
          :class="{
            yellow: deadline.status === 'sospeso',
            red: deadline.status === 'scaduto',
            green: deadline.status === 'completato',
          }"
        >
          {{ deadline.status }}
        </td>

        <td v-if="store.userRole == 'ADMIN'">
          <span v-if="deadline.takenBy">
            {{ deadline.takenBy.name }}
          </span>
          <span v-else> — </span>
        </td>
        <td>
          <router-link :to="{ name: 'modify', params: { id: deadline.id } }">
            <button v-if="store.userRole === 'ADMIN'" class="action-btn">
              Modifica
            </button>
          </router-link>

          <span>
            <button
              v-if="!deadline.takenByUserId"
              @click="takeDeadline(deadline.id)"
              class="action-btn"
            >
              Prendi in carico
            </button>
            <button v-else class="disattivato">Prendi in carico</button>
          </span>
        </td>
      </tr>
    </tbody>
  </table>

  <div v-if="!deadlines.length && !isLoading" class="error">
    Non sono presenti deadline.
  </div>
</template>

<style scoped>
/* General */
.disattivato {
  background-color: #555;
  color: #aaa;
  border: 1px solid #555;
  padding: 6px 12px;
  border-radius: 6px;
  font-family: "Google Sans Code", monospace;
  font-size: 0.85rem;
  margin-right: 6px;
  cursor: not-allowed;
}

tr th {
  text-align: center;
}

tr td {
  text-align: center;
}

.red {
  color: #ff6b6b;
  font-weight: bold;
}
.yellow {
  color: #ffd93b;
  font-weight: bold;
}
.green {
  color: #6bcf6b;
  font-weight: bold;
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
  background-color: #2b2b2b;
  color: rgba(255, 255, 255, 0.87);
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
</style>
