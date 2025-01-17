import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import axios from "axios";
import VueCropper from "vue-cropper";
import Clipboard from "v-clipboard";
import 'vue-cropper/dist/index.css'

axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://file.imageplc.com";

createApp(App)
    .use(router)
    .use(VueCropper)
    .use(Clipboard)
    .mount('#app')
