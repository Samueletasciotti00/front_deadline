import { reactive } from "vue";

export const store = reactive({
  loggedIn: localStorage.getItem("token") ? true : false,
  userRole: localStorage.getItem("userRole") || null,
  userId: localStorage.getItem("userId") || null,
  userName: localStorage.getItem("userName") || null,
});

// Funzione di logout centralizzata
export function logout() {
  // Pulisci localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userName");
  localStorage.removeItem("userId");
  localStorage.removeItem("userEmail");

  // Resetta lo store
  store.loggedIn = false;
  store.userRole = null;
  store.userName = null;
  store.userId = null;
}
