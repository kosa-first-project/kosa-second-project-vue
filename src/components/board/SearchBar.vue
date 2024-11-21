<template>
    <div>
        <input type="text" v-model="searchKeyword" placeholder="검색어를 입력하세요" />
        <button @click="emitSearch">검색</button>
    </div>  
</template>

<script setup>
    import { ref } from 'vue';

    // defineEmits를 사용하여 emit 함수 정의
    const emit = defineEmits(['handle-search']);

    const searchKeyword = ref('');

    // 검색 이벤트를 부모 컴포넌트로 전달하는 함수
    const emitSearch = () => {
        emit('handle-search', searchKeyword.value);
    };
</script>
