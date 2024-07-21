<template>
    <NavbarNavbar class="fixed-top" style="background-color: rgba(31, 34, 54, 1)"></NavbarNavbar>
    <div class="container ms-auto" style="min-height: 300px; margin-top: 120px; margin-bottom: 120px;">
    </div>
    <FooterFooter style="background-color: rgba(31, 34, 54, 1)"></FooterFooter>
</template>

<script>
import FooterFooter from "@/components/FooterFooter.vue";
import NavbarNavbar from "@/components/NavbarNavbar.vue";

export default {
    name: "PictureManagement",
    components: {NavbarNavbar, FooterFooter},
}
</script>