<script setup>
import {onMounted} from "vue";
import {drawClock} from "@/components/DrawCanvasClock.js";

onMounted(() => {
    const canvas = document.querySelector("canvas");
    drawClock(canvas);
})
</script>

<template>
    <canvas></canvas>
</template>

<style scoped>
canvas {
    background: radial-gradient(#fff, #00aeec);
    display: block;
    width: 100vw;
    height: 100vh;
}
</style>