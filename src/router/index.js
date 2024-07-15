import {createRouter, createWebHistory } from 'vue-router';
import HomeHome from "@/components/HomeHome.vue";

const routes = [
    {path: '/', component: HomeHome},
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router