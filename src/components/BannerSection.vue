<template>
    <section class="banner_part">
        <div class="container">
        <div class="banner_text text-center">
            <h1>Saintmartine</h1>
            <p>Let’s start your journey with us, your dream will come true</p>
            <button class="btn_1" @click="discoverNow">Discover Now</button>
        </div>
        </div>
    </section>
</template>

<script>
    export default {
    methods: {
        discoverNow() {
        this.$router.push("/discover");
        },
    },
    };
</script>

<style scoped>
/* Scoped styles specific to the banner */
</style>
