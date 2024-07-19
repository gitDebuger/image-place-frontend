import {createRouter, createWebHistory} from 'vue-router';
import HomeHome from "@/components/HomeHome.vue";
import PersonalProfile from "@/views/PersonalProfile.vue";
import MyPictures from "@/views/MyPictures.vue";
import UploadPictures from "@/views/UploadPictures.vue";
import HelpDocument from "@/views/HelpDocument.vue";

const routes = [
    {path: '/', component: HomeHome},
    {path: '/profile', component: PersonalProfile, meta: {requiresAuth: true}},
    {path: '/pictures', component: MyPictures, meta: {requiresAuth: true}},
    {path: '/upload', component: UploadPictures, meta: {requiresAuth: true}},
    {path: '/help', component: HelpDocument, meta: {requiresAuth: true}},
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!localStorage.getItem('token')) {
            next({
                path: '/',
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router