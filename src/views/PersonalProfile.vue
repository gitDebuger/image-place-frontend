<template>
    <div>
        <NavbarNavbar class="fixed-top" style="background-color: rgba(31, 34, 54, 1)"></NavbarNavbar>
        <div class="container ms-auto" style="min-height: 300px; margin-top: 120px; margin-bottom: 120px;">
            <div class="row">
                <div class="col-md-3">
                    <ul class="nav flex-column nav-pills">
                        <li class="nav-item m-2">
                            <a class="nav-link" :class="{ active: selectedTab === 'personalInfo' }"
                               @click="selectedTab = 'personalInfo'">个人信息</a>
                        </li>
                        <li class="nav-item m-2">
                            <a class="nav-link" :class="{ active: selectedTab === 'changePassword' }"
                               @click="selectedTab = 'changePassword'">修改密码</a>
                        </li>
                    </ul>
                </div>
                <div class="col-md-9">
                    <div v-if="selectedTab === 'personalInfo'">
                        <PersonalInfo></PersonalInfo>
                    </div>
                    <div v-if="selectedTab === 'changePassword'">
                        <ChangePassword class="mt-2 text-center" style="max-width: 400px; margin-left: 200px"></ChangePassword>
                    </div>
                </div>
            </div>
        </div>
        <FooterFooter style="background-color: rgba(31, 34, 54, 1)"></FooterFooter>
    </div>
</template>

<script>
import NavbarNavbar from "@/components/NavbarNavbar.vue";
import FooterFooter from "@/components/FooterFooter.vue";
import PersonalInfo from "@/components/PersonalInfo.vue";
import ChangePassword from "@/components/ChangePassword.vue";

export default {
    name: "PersonalProfile",
    components: {
        ChangePassword,
        PersonalInfo,
        NavbarNavbar,
        FooterFooter,

    },
    data() {
        return {
            selectedTab: "personalInfo",
        };
    }
};
</script>

<style>
.nav-item {
    cursor: pointer;
}

.nav-link {
    font-size: 18px;
}
</style>