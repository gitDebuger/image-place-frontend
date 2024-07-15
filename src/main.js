import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5000';

createApp(App).use(router).mount('#app')
