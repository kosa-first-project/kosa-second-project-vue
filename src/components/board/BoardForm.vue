<template>
    <form @submit.prevent="onSaveboard" style="padding-top: 100px;padding-bottom: 50px; min-width: 800px;">
      <div class="container mt-5" style="width: 40%;" >
        <h2 class="mt-5 mb-4 text-center"><b>게시글 {{ editing ? '수정' : '작성' }}</b></h2>
        
        <!-- 닉네임 필드 추가 -->
        <div class="mb-4">
          <label for="nickname" class="form-label">닉네임</label>
          <input
            type="text"
            v-model="form.nickname"
            class="form-control"
            placeholder="닉네임을 입력하세요"
            required
          />
        </div>
        
        <!-- 비밀번호 필드 추가 -->
        <div class="mb-4">
          <label for="password" class="form-label">비밀번호</label>
          <input
            type="password"
            v-model="form.password"
            class="form-control"
            placeholder="비밀번호를 입력하세요"
            required
          />
        </div>
        
        <div class="mb-4">
          <label for="title" class="form-label">제목</label>
          <input
            type="text"
            v-model="form.title"
            class="form-control"
            placeholder="제목을 입력하세요"
            required
          />
        </div>
        <div class="mb-4">
          <label for="content" class="form-label">내용</label>
          <textarea
            v-model="form.content"
            class="form-control"
            rows="10"
            placeholder="내용을 입력하세요"
            required
          ></textarea>
        </div>
        <div class="mb-4">
          <label for="images" class="form-label">이미지 업로드</label>
          <input
            type="file"
            id="images"
            multiple
            @change="onFileChange"
            class="form-control"
          />
        </div>
        <div class="d-flex justify-content-end">
          <button type="submit" class="btn btn-primary me-3" style="width: 80px; height:40px">
            {{ editing ? '수정' : '저장' }}
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            style="width: 80px; height:40px"
            @click="$router.push('/post')"
          >
            취소
          </button>
        </div>
      </div>
    </form>
  </template>
  
  <script setup>
  import { createBoard, updateBoard, getBoardById } from '@/api/board';
  import { useRoute, useRouter } from 'vue-router';
  import { ref } from 'vue';
  // import { useToastStore } from '@/store/index'; // 제거
  
  const props = defineProps({
    editing: {
      type: Boolean,
      default: false,
    },
  });
  
  const route = useRoute();
  const router = useRouter();
  // const toast = useToastStore(); // 제거
  const form = ref({
    nickname: '',
    password: '',
    title: '',
    content: '',
  });
  const images = ref([]);
  const boardId = route.params.boardId;
  
  const onFileChange = (event) => {
    images.value = Array.from(event.target.files);
  };
  
  const onSaveboard = async () => {
    try {
      const formData = new FormData();
      const boardData = {
        nickname: form.value.nickname,
        password: form.value.password,
        title: form.value.title,
        content: form.value.content,
      };
      formData.append('board', new Blob([JSON.stringify(boardData)], { type: 'application/json' }));
  
      // 이미지가 있으면 FormData에 추가
      images.value.forEach((image) => {
        formData.append('image', image);
      });
  
      if (props.editing) {
        await updateBoard(boardId, formData);
        alert('게시글 수정 완료!');
      } else {
        await createBoard(formData);
        alert('게시글 저장 완료!');
      }
      router.push('/board');
    } catch (error) {
      console.error(error);
      alert('게시글 저장 실패!');
    }
  };
  
  const getBoard = async () => {
    try {
      const { data } = await getBoardById(boardId);
      form.value.nickname = data.nickname;
      form.value.title = data.title;
      form.value.content = data.content;
      // 비밀번호는 가져올 수 없으므로 사용자가 다시 입력하도록 안내해야 합니다.
    } catch (error) {
      alert('게시글 데이터를 가져오지 못했습니다.');
    }
  };
  
  if (props.editing) {
    getBoard();
  }
  </script>
  
  <style scoped>
  /* 필요한 스타일 추가 */
  </style>