<template>
    <NavbarNavbar class="fixed-top" style="background-color: rgba(31, 34, 54, 1)"></NavbarNavbar>
    <div class="container ms-auto" style="min-height: 300px; margin-top: 120px; margin-bottom: 120px;">
        <PictureCard v-for="picture in pictures" :key="picture.uuid" :picture="picture"></PictureCard>
    </div>
    <FooterFooter style="background-color: rgba(31, 34, 54, 1)"></FooterFooter>
</template>

<script>
import NavbarNavbar from "@/components/NavbarNavbar.vue";
import FooterFooter from "@/components/FooterFooter.vue";
import axios from "axios";
import PictureCard from "@/components/PictureCard.vue";

export default {
    name: "PictureManagement",
    components: {PictureCard, NavbarNavbar, FooterFooter},
    data() {
        return {
            pictures: [],
        };
    },
    created() {
        axios.post('/api/admin-fetch-all-pictures', {
            token: localStorage.getItem('adminToken'),
        })
            .then((response) => {
                this.pictures = response.data;
            })
            .catch((error) => {
                console.log(error);
                alert('获取图像信息失败');
            })
    }
};
</script>