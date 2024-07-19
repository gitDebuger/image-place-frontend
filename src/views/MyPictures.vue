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
            </div>
        </div>
        <FooterFooter style="background-color: rgba(31, 34, 54, 1)"></FooterFooter>
    </div>
</template>

<script>
import NavbarNavbar from "@/components/NavbarNavbar.vue";
import FooterFooter from "@/components/FooterFooter.vue";

export default {
    name: "MyPictures",
    components: {
        FooterFooter,
        NavbarNavbar
    },
    data() {
        return {
            selectedTab: 'allPictures',
        };
    },
}
</script>