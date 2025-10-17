<script>
import axios from "axios";
import { store } from "../store";

export default {
  name: "Modifica",
  setup() {
    return { store };
  },
  data() {
    return {
      form: {
        title: "",
        description: "",
        deadline: "",
        remind_at: "",
        repeat: "",
      },
      message: null,
      error: null,
      isLoading: false,
    };
  },
  async mounted() {
    // Controllo accesso ADMIN
    if (store.userRole !== "ADMIN") {
      this.error = "Non autorizzato";
      return;
    }

    // Recupero ID dalla route
    const id = this.$route.params.id;
    await this.loadDeadline(id);
  },
  methods: {
    // Carica i dati esistenti nel form
    async loadDeadline(id) {
      this.error = null;
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://127.0.0.1:3333/deadlines/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = response.data;

        this.form.title = data.title;
        this.form.description = data.description;
        this.form.repeat = data.repeat;

        // Formattazione datetime-local (AAAA-MM-DDTHH:mm)
        this.form.deadline = data.deadline ? data.deadline.slice(0, 16) : "";

        this.form.remind_at = data.remind_at ? data.remind_at.slice(0, 16) : "";
      } catch (err) {
        this.error = "Errore nel caricamento della deadline.";
      }
    },

    async modifyForm(id) {
      this.error = null;
      this.message = null;
      this.isLoading = true;

      try {
        const token = localStorage.getItem("token");

        // Tramite il form preparo il payload da inviare
        const payload = {
          title: this.form.title,
          description: this.form.description,
          deadline: this.form.deadline ? new Date(this.form.deadline) : null,
          remind_at: this.form.remind_at ? new Date(this.form.remind_at) : null,
          repeat: this.form.repeat,
        };

        // Chiamata in put per modificare la deadline specifica con i dati caricati nel playload
        const response = await axios.put(
          `http://127.0.0.1:3333/deadlines/${id}`,
          payload, 
          {
            headers: { Authorization: `Bearer ${token}` }, 
          }
        );

        this.message = "Deadline modificata con successo!";
      } catch (err) {
        console.error("Errore modifyForm:", err.response || err);
        this.error = "Errore durante la modifica della deadline.";
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<template>
  <div class="form-container" v-if="store.userRole === 'ADMIN'">
    <h2>Modifica</h2>

    <div v-if="message" class="success">{{ message }}</div>
    <div v-if="error" class="error">{{ error }}</div>

    <form @submit.prevent="modifyForm($route.params.id)">
      <div class="form-group">
        <label for="title">Titolo</label>
        <input
          id="title"
          v-model="form.title"
          type="text"
          placeholder="Inserisci titolo"
          required
        />
      </div>

      <div class="form-group">
        <label for="description">Descrizione</label>
        <textarea
          id="description"
          v-model="form.description"
          placeholder="Inserisci descrizione"
          required
        ></textarea>
      </div>

      <div class="form-group">
        <label for="deadline">Scadenza</label>
        <input
          id="deadline"
          v-model="form.deadline"
          type="datetime-local"
          required
        />
      </div>

      <div class="form-group">
        <label for="remind_at">Promemoria (opzionale)</label>
        <input id="remind_at" v-model="form.remind_at" type="datetime-local" />
      </div>

      <div class="form-group">
        <label for="repeat">Ripetizione</label>
        <select id="repeat" v-model="form.repeat">
          <option value="giornaliero">Giornaliero</option>
          <option value="settimanale">Settimanale</option>
          <option value="mensile">Mensile</option>
          <option value="annuale">Annuale</option>
        </select>
      </div>

      <button type="submit" class="action-btn" :disabled="isLoading">
        {{ isLoading ? "Modifica..." : "Modifica" }}
      </button>
    </form>
  </div>

  <div v-else class="error">Accesso negato.</div>
</template>

<style scoped>
.form-container {
  width: 500px;
  max-width: 90%;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #2b2b2b;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  color: rgba(255, 255, 255, 0.87);
  font-family: "Google Sans Code", monospace;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

label {
  margin-bottom: 0.5rem;
  font-weight: 500;
}

input,
textarea,
select {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #555;
  background-color: #1f1f1f;
  color: rgba(255, 255, 255, 0.87);
  font-family: "Google Sans Code", monospace;
  font-size: 0.9rem;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

.action-btn {
  width: 100%;
  background-color: #3a3a3a;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid #555;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-family: "Google Sans Code", monospace;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  margin-top: 0.5rem;
}

.action-btn:hover {
  background-color: #42b983;
  border-color: #42b983;
  color: #000;
}

.success {
  text-align: center;
  color: #6bcf6b;
  margin-bottom: 1rem;
  font-weight: 500;
}

.error {
  text-align: center;
  color: #ff6b6b;
  margin-bottom: 1rem;
  font-weight: 500;
  padding: 2rem;
}
</style>
