<template>
    <NavbarNavbar class="fixed-top" style="background-color: rgba(31, 34, 54, 1)"></NavbarNavbar>
    <div class="container ms-auto" style="min-height: 300px; margin-top: 120px; margin-bottom: 120px;">
        <UserCard v-for="user in users" :key="user.username" :user="user"></UserCard>
    </div>
    <FooterFooter style="background-color: rgba(31, 34, 54, 1)"></FooterFooter>
</template>

<script>
import NavbarNavbar from "@/components/NavbarNavbar.vue";
import FooterFooter from "@/components/FooterFooter.vue";
import UserCard from "@/components/UserCard.vue";
import axios from "axios";

export default {
    name: "UserManagement",
    components: {UserCard, FooterFooter, NavbarNavbar},
    data() {
        return {
            users: [],
        };
    },
    created() {
        axios.post('/api/admin-fetch-all-users', {
            token: localStorage.getItem('adminToken'),
        })
            .then((response) => {
                this.users = response.data;
            })
            .catch((error) => {
                console.log(error);
                alert('获取用户信息失败');
            });
    },
};
</script>