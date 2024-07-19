<template>
    <div>
        <NavbarNavbar class="fixed-top" style="background-color: rgba(31, 34, 54, 1)"></NavbarNavbar>
        <div class="container ms-auto" style="min-height: 300px; margin-top: 120px; margin-bottom: 120px;">

        </div>
        <FooterFooter style="background-color: rgba(31, 34, 54, 1)"></FooterFooter>
    </div>
</template>

<script>
import NavbarNavbar from "@/components/NavbarNavbar.vue";
import FooterFooter from "@/components/FooterFooter.vue";

export default {
    name: "HelpDocument",
    components: {
        NavbarNavbar,
        FooterFooter,
    }
}
</script>