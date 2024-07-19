<template>
    <div>
        <NavbarNavbar class="fixed-top" style="background-color: rgba(31, 34, 54, 1)"></NavbarNavbar>
        <div class="container ms-auto" style="min-height: 300px; margin-top: 120px; margin-bottom: 120px;">
                <div class="row">
                    <div class="col-md-3">
                        <ul class="nav flex-column nav-pills">
                            <li class="nav-item m-2">
                                <a class="nav-link" :class="{ active: selectedTab === 'allPictures' }"
                                   @click="selectedTab = 'allPictures'">所有图片</a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-9">
                        <div class="row">
                            <image-card v-for="image in images" :key="image.uuid" :image="image"></image-card>
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
import ImageCard from "@/components/ImageCard.vue";
import axios from "axios";

export default {
    name: "MyPictures",
    components: {
        FooterFooter,
        NavbarNavbar,
        ImageCard,
    },
    data() {
        return {
            selectedTab: 'allPictures',
            images: [],
        };
    },
    methods: {
        fetchAllPictures() {
            axios.post('/files/image/get-user-all-pictures', {
                token: localStorage.getItem('token'),
            })
                .then(response => {
                    this.images = response.data;
                })
                .catch(error => {
                    alert('获取图像信息失败');
                    console.log(error);
                });
        },
    },
    created() {
        if (this.selectedTab === 'allPictures') {
            this.fetchAllPictures();
        }
    },
}
</script>