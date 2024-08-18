<template>
    <div class="fixed-top">
        <NavbarNavbar @show-login="showLogin" @show-register="showRegister"
                      @show-admin-login="showAdminLogin" @show-find-back-password="showFindBackPassword"></NavbarNavbar>
        <LoginLogin v-if="showLoginModal" @close="showLoginModal = false"></LoginLogin>
        <RegisterRegister v-if="showRegisterModal" @close="showRegisterModal = false"></RegisterRegister>
        <AdminLogin v-if="showAdminLoginModal" @close="showAdminLoginModal = false"></AdminLogin>
        <FindBackPassword v-if="showFindBackPasswordModal"
                          @close="showFindBackPasswordModal = false"></FindBackPassword>
        <HomePageClock></HomePageClock>
        <FooterFooter class="fixed-bottom"></FooterFooter>
    </div>
</template>
<script>
import NavbarNavbar from "@/components/NavbarNavbar.vue";
import LoginLogin from "@/components/LoginLogin.vue";
import RegisterRegister from "@/components/RegisterRegister.vue";
import AdminLogin from "@/components/AdminLogin.vue";
import FooterFooter from "@/components/FooterFooter.vue";
import FindBackPassword from "@/components/FindBackPassword.vue";
import HomePageClock from "@/components/HomePageClock.vue";

export default {
    components: {
        HomePageClock,
        FooterFooter,
        NavbarNavbar,
        LoginLogin,
        RegisterRegister,
        AdminLogin,
        FindBackPassword,
    },
    data() {
        return {
            showLoginModal: false,
            showRegisterModal: false,
            showAdminLoginModal: false,
            showFindBackPasswordModal: false,
        }
    },
    methods: {
        showLogin() {
            this.showLoginModal = true;
        },
        showRegister() {
            this.showRegisterModal = true;
        },
        showAdminLogin() {
            this.showAdminLoginModal = true;
        },
        showFindBackPassword() {
            this.showFindBackPasswordModal = true;
        },
    }
}
</script>

<style scoped>
.home {
    background-image: url('@/assets/background.jpg');
    background-size: cover;
    background-position: center center;
    height: 100vh;
    margin: 0;
    padding: 0;
}
</style>