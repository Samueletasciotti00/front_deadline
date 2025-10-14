import { reactive } from "vue";

export const store = reactive({
    loggedIn: false,
    userRole: null, // 'admin' or 'user'
    userId: null,
    userName: null,
});