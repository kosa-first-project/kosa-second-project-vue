<template>
    <section class="top_place section_padding">
    <div class="container">
        <h2 class="text-center">여행일정을 함께 할 가이드들</h2>
        <p class="text-center">
        다양한 경력의 가이드들이 이곳에 모여있습니다.<br>
        여행 지역을 잘 알고있는 합리적인 가격의 가이드들을 만나보세요.
        </p>
        <div id="guide-mini" v-html="guideMiniContent"></div>
    </div>
    </section>
</template>

<script>
export default {
    data() {
    return {
        guideMiniContent: ''
    };
    },
    mounted() {
    fetch('/guide-mini')
        .then(response => response.text())
        .then(html => {
        this.guideMiniContent = html;
        })
        .catch(error => console.error('Error loading guide content:', error));
    }
};
</script>
