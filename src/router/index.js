import {createRouter, createWebHistory} from 'vue-router';
import HomeHome from "@/components/HomeHome.vue";
import PersonalProfile from "@/views/PersonalProfile.vue";
import MyPictures from "@/views/MyPictures.vue";
import UploadPictures from "@/views/UploadPictures.vue";
import ImageDetail from "@/views/ImageDetail.vue";
import UserManagement from "@/views/UserManagement.vue";
import PictureManagement from "@/views/PictureManagement.vue";

const routes = [
    {
        path: '/',
        component: HomeHome
    },
    {
        path: '/profile',
        component: PersonalProfile,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/pictures',
        component: MyPictures,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/upload',
        component: UploadPictures,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/image/:uuid',
        component: ImageDetail,
        props: true,
    },
    {
        path: '/user-management',
        component: UserManagement,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/picture-management',
        component: PictureManagement,
        meta: {
            requiresAuth: true
        }
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!localStorage.getItem('token') && !localStorage.getItem('adminToken')) {
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