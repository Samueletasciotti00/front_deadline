<script>
import axios from "axios";
import { store } from "../store";

export default {
  name: "MyDeadlines",
  setup() {
    return { store };
  },
  data() {
    return {
      deadlines: [],
      myDeadlines: [],
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

      // Controllo se è già stato effettuato il login
      if (!store.loggedIn) {
        this.error = "Non autenticato";
        this.isLoading = false;
        store.userName = null;
        return;
      } else {
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
          console.log("All deadlines(MyDeadlines)->", data);
          this.deadlines = data;
          // Filtra solo le deadline prese dall'utente
          this.myDeadlines = this.deadlines.filter(
            (deadline) =>
              Number(deadline.takenByUserId) === Number(store.userId)
          );
          console.log("deadline filter->", this.myDeadlines);
        } catch (error) {
          console.error("Errore nel caricamento delle deadlines:", error);
          this.error =
            error.response?.data?.message || "Errore durante il caricamento";

          // Pulizia se il token è invalido
          localStorage.removeItem("token");
          store.loggedIn = false;
          store.userRole = null;
        } finally {
          this.isLoading = false;
        }
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
        <th>Stato</th>
        <th>Azioni</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="deadline in myDeadlines" :key="deadline.id">
        <td>{{ deadline.id }}</td>
        <td>{{ deadline.title }}</td>
        <td>{{ deadline.description }}</td>
        <td>{{ formatDate(deadline.deadline) }}</td>
        <td>{{ deadline.status }}</td>
        <td>
          <button @click="removeTask()" class="action-btn">Rimuovi</button>
        </td>
      </tr>
    </tbody>
  </table>

  <div v-if="!myDeadlines.length && !isLoading" class="error">
    Non hai ancora preso nessuna deadline.
  </div>
</template>

<style scoped>
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
