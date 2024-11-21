<template>
  <div class="container" style="padding-top: 100px;">
  <div class="board-details" style="min-width: 1000px;">
    <!-- 게시글 정보 -->
    <h1>{{ board.title }}</h1>
    <p><strong>작성자:</strong> {{ board.nickname }}</p>
    <p><strong>작성일:</strong> {{ board.createDate }}</p>
    <p><strong>조회수:</strong> {{ board.views }}</p>
    <div class="content" v-html="board.content"></div>

    <!-- 게시글 수정 및 삭제 버튼 -->
    <div class="board-actions">
      <button @click="confirmEdit">수정</button>
      <button @click="confirmDelete">삭제</button>
    </div>

    <!-- 댓글 목록 표시 -->
    <div class="comment-list">
      <h3>댓글 ({{ board.comments.length }})</h3>
      <div v-if="board.comments.length === 0">
        <p>댓글이 없습니다.</p>
      </div>
      <div v-else>
        <div
          v-for="comment in board.comments"
          :key="comment.commentId"
          class="comment-item"
        >
          <div class="comment-header">
            <strong>{{ comment.nickname }}</strong>
            <span class="date">{{ comment.createDate }}</span>
          </div>
          <div class="comment-content">
            <!-- 수정 모드가 아닐 때 댓글 내용 표시 -->
            <p v-if="!isEditing[comment.commentId]">{{ comment.content }}</p>
            <!-- 수정 모드일 때 수정 폼 표시 -->
            <div v-else>
              <textarea
                v-model="editedContent[comment.commentId]"
                required
                minlength="3"
                maxlength="100"
              ></textarea>
              <!-- 비밀번호 입력 필드 추가 -->
              <div class="password-input">
                <label for="password">비밀번호:</label>
                <input
                  type="password"
                  v-model="editPasswords[comment.commentId]"
                  required
                  minlength="1"
                  maxlength="20"
                />
              </div>
            </div>
          </div>
          <div class="comment-actions">
            <button @click="handleRecommendComment(comment.commentId)">
              👍 {{ comment.hearts }}
            </button>
            <button
              v-if="!isEditing[comment.commentId]"
              @click="startEdit(comment.commentId)"
            >
              수정
            </button>
            <button
              v-else
              @click="submitEdit(comment.commentId)"
            >
              저장
            </button>
            <button @click="confirmDeleteComment(comment.commentId)">
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 댓글 작성 폼 -->
    <div class="comment-form">
      <h3>댓글 작성</h3>
      <form @submit.prevent="submitComment">
        <div>
          <label for="nickname">닉네임:</label>
          <input
            type="text"
            id="nickname"
            v-model="newComment.nickname"
            required
            minlength="1"
            maxlength="20"
          />
        </div>
        <div>
          <label for="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            v-model="newComment.password"
            required
            minlength="1"
            maxlength="20"
          />
        </div>
        <div>
          <label for="content">내용:</label>
          <textarea
            id="content"
            v-model="newComment.content"
            required
            minlength="3"
            maxlength="100"
          ></textarea>
        </div>
        <button type="submit">작성</button>
      </form>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getBoardById, deleteBoard } from '@/api/board.js';
import {
  writeComment,
  editComment,
  deleteComment, // 댓글 삭제 함수 추가
  recommendComment,
} from '@/api/comment.js';

// 라우터와 라우트 사용
const route = useRoute();
const router = useRouter();
let boardId = route.params.boardId; // URL의 boardId

// 게시글 데이터
const board = ref({
  boardId: null,
  title: '',
  nickname: '',
  createDate: '',
  views: 0,
  content: '',
  comments: [], // 댓글 목록 포함
  images: [],
});

// 새 댓글 데이터
const newComment = ref({
  nickname: '',
  password: '',
  content: '',
});

// 상태 관리: 수정 모드, 편집 내용, 수정 시 비밀번호
const isEditing = ref({});
const editedContent = ref({});
const editPasswords = ref({});

// 게시글 상세 조회
const fetchBoardDetails = async () => {
  try {
    const { data } = await getBoardById(boardId);
    board.value = data; // API에서 가져온 게시글 데이터 및 댓글 목록
    console.log('게시글 데이터:', board.value); // 게시글 전체 데이터 로그
    console.log('댓글 데이터:', board.value.comments); // 댓글 데이터 로그 추가
  } catch (error) {
    console.error('게시글 상세 조회 실패:', error);
    // 에러 처리 (예: 에러 페이지로 이동)
    router.push('/error');
  }
};

// 게시글 삭제 확인 및 삭제 처리
const confirmDelete = async () => {
  if (!confirm('게시글을 삭제하시겠습니까?')) return;

  try {
    await deleteBoard(boardId);
    alert('게시글이 삭제되었습니다.');
    // 게시글 목록 페이지로 이동
    router.push('/board');
  } catch (error) {
    console.error('게시글 삭제 실패:', error);
    alert('게시글 삭제에 실패했습니다.');
  }
};

// 댓글 삭제 확인 및 삭제 처리
const confirmDeleteComment = async (commentId) => {
  if (!confirm('댓글을 삭제하시겠습니까?')) return;

  // boardId가 유효한지 확인
  if (!boardId) {
    alert('유효한 게시글 ID가 없습니다.');
    return;
  }

  try {
    console.log('Deleting comment with boardId:', boardId, 'and commentId:', commentId);
    await deleteComment(boardId, commentId); // 파라미터 순서 수정
    alert('댓글이 삭제되었습니다.');
    fetchBoardDetails();
  } catch (error) {
    console.error('댓글 삭제 실패:', error);
    alert('댓글 삭제에 실패했습니다.');
  }
};

// 게시글 수정 페이지로 이동
const confirmEdit = () => {
  router.push({ name: 'BoardEdit', params: { boardId } });
};

// 댓글 추천 기능
const handleRecommendComment = async (commentId) => {
  try {
    await recommendComment(boardId, commentId);
    // 댓글 목록을 새로 고침
    fetchBoardDetails();
  } catch (error) {
    console.error('댓글 추천 실패:', error);
    alert('댓글 추천에 실패했습니다.');
  }
};

// 댓글 수정 시작
const startEdit = (commentId) => {
  isEditing.value = { ...isEditing.value, [commentId]: true };
  // 기존 댓글 내용을 편집 내용에 설정
  const comment = board.value.comments.find(c => c.commentId === commentId);
  if (comment) {
    editedContent.value = { ...editedContent.value, [commentId]: comment.content };
  }
};

// 댓글 수정 제출
const submitEdit = async (commentId) => {
  const password = editPasswords.value[commentId];
  const updatedContent = editedContent.value[commentId];

  if (!password || password.trim() === '') {
    alert('비밀번호를 입력해주세요.');
    return;
  }

  if (!updatedContent || updatedContent.trim().length < 3 || updatedContent.trim().length > 100) {
    alert('댓글 내용은 3자 이상, 100자 이하로 입력해주세요.');
    return;
  }

  try {
    await editComment(boardId, commentId, {
      content: updatedContent,
      password: password,
    });
    alert('댓글이 수정되었습니다.');
    // 수정 모드 종료 및 댓글 목록 갱신
    isEditing.value = { ...isEditing.value, [commentId]: false };
    delete editPasswords.value[commentId];
    fetchBoardDetails();
  } catch (error) {
    console.error('댓글 수정 실패:', error);
    alert('댓글 수정에 실패했습니다. 비밀번호를 확인해주세요.');
  }
};

// 댓글 수정 시 비밀번호 관리
// 이미 editPasswords가 선언되어 있습니다.

// 댓글 작성 함수 추가
const submitComment = async () => {
  // 유효성 검증
  if (
    newComment.value.nickname.trim().length < 1 ||
    newComment.value.nickname.trim().length > 20
  ) {
    alert('닉네임은 1자 이상, 20자 이하로 입력해주세요.');
    return;
  }
  if (
    newComment.value.password.trim().length < 1 ||
    newComment.value.password.trim().length > 20
  ) {
    alert('비밀번호는 1자 이상, 20자 이하로 입력해주세요.');
    return;
  }
  if (
    newComment.value.content.trim().length < 3 ||
    newComment.value.content.trim().length > 100
  ) {
    alert('댓글 내용은 3자 이상, 100자 이하로 입력해주세요.');
    return;
  }

  try {
    await writeComment(boardId, newComment.value);
    alert('댓글이 작성되었습니다.');
    // 폼 초기화
    newComment.value = {
      nickname: '',
      password: '',
      content: '',
    };
    // 게시글 상세 조회 다시 호출하여 댓글 목록 업데이트
    fetchBoardDetails();
  } catch (error) {
    console.error('댓글 작성 실패:', error);
    alert('댓글 작성에 실패했습니다.');
  }
};

// 컴포넌트 로드 시 데이터 가져오기
onMounted(() => {
  fetchBoardDetails();
});

// boardId가 변경될 때마다 데이터 다시 가져오기
watch(
  () => route.params.boardId,
  (newId) => {
    boardId = newId;
    fetchBoardDetails();
  }
);
</script>

<style scoped>
.board-details {
  margin: 20px auto;
  max-width: 800px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.board-details h1 {
  margin-bottom: 10px;
  font-size: 2em;
}

.board-details p {
  margin: 5px 0;
  font-size: 1em;
}

/* 게시글 수정 및 삭제 버튼 스타일 */
.board-actions {
  margin-top: 10px;
}

.board-actions button {
  margin-right: 10px;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
}

.board-actions button:first-child {
  background-color: #ffc107; /* 수정 버튼 색상 */
  color: #fff;
}

.board-actions button:last-child {
  background-color: #dc3545; /* 삭제 버튼 색상 */
  color: #fff;
}

.board-actions button:hover {
  opacity: 0.8;
}

.content {
  margin: 20px 0;
  font-size: 1.1em;
}

/* 댓글 목록 스타일 */
.comment-list {
  margin-top: 30px;
}

.comment-item {
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 1em;
}

.comment-content p {
  margin: 0;
  font-size: 0.95em;
}

.comment-content textarea {
  width: 50%;
  height: 60px;
  resize: vertical;
  padding: 5px;
  font-size: 0.95em;
}

.comment-content input[type="password"] {
  width: 50%;
  padding: 5px;
  margin-top: 5px;
  font-size: 0.95em;
}

.comment-actions button {
  margin-right: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
}

.comment-actions button:hover {
  opacity: 0.8;
}

.comment-actions button:nth-child(1) {
  background-color: #28a745; /* 추천 버튼 색상 */
  color: #fff;
}

.comment-actions button:nth-child(2) {
  background-color: #ffc107; /* 수정 버튼 색상 */
  color: #fff;
}

.comment-actions button:nth-child(3),
.comment-actions button:nth-child(4) {
  background-color: #dc3545; /* 삭제 버튼 색상 */
  color: #fff;
}

/* 댓글 작성 폼 스타일 축소 및 하단 배치 */
.comment-form {
  margin-top: 20px; /* 위치를 댓글 목록 하단으로 조정 */
  padding: 10px; /* 패딩 축소 */
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9; /* 배경색 추가로 구분 */
}

.comment-form h3 {
  margin-bottom: 10px;
  font-size: 1em; /* 제목 크기 조정 */
}

.comment-form form div {
  margin-bottom: 8px; /* 여백 축소 */
}

.comment-form label {
  display: block;
  margin-bottom: 4px; /* 여백 축소 */
  font-size: 0.95em;
}

.comment-form input,
.comment-form textarea {
  width: 100%;
  padding: 6px; /* 패딩 축소 */
  box-sizing: border-box;
  font-size: 0.9em; /* 폰트 크기 축소 */
}

.comment-form button {
  padding: 6px 12px; /* 패딩 축소 */
  background-color: #007bff;
  border: none;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em; /* 폰트 크기 축소 */
}

.comment-form button:hover {
  background-color: #0056b3;
}

/* 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 반투명 검은 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 다른 요소보다 위에 표시되도록 설정 */
}

.modal {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}

.modal h4 {
  margin-top: 0;
  font-size: 1.2em;
}

.modal p {
  margin: 10px 0;
  font-size: 1em;
}

.modal input {
  width: 100%;
  padding: 6px;
  box-sizing: border-box;
  font-size: 0.9em;
}

.modal-actions button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
}

.modal-actions button:first-child {
  background-color: #dc3545; /* 삭제 버튼 색상 */
  color: #fff;
}

.modal-actions button:last-child {
  background-color: #6c757d; /* 취소 버튼 색상 */
  color: #fff;
}

.modal-actions button:first-child:hover {
  background-color: #c82333;
}

.modal-actions button:last-child:hover {
  background-color: #5a6268;
}
.board-details {
  /* 스타일 추가 */
}

.comment-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.comment-actions button {
  margin-right: 5px;
}

.password-input {
  margin-top: 5px;
}
</style>
