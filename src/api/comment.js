// src/api/comment.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8888/board';

/**
 * 특정 게시글의 댓글 목록을 가져옵니다.
 * @param {Long} boardId - 게시글 ID
 * @param {Number} page - 페이지 번호 (기본값: 0)
 * @param {Number} size - 페이지 당 댓글 수 (기본값: 10)
 */
export const getComments = (boardId, page = 0, size = 10) => {
  return axios.get(`${API_BASE_URL}/${boardId}/comment`, {
    params: {
      page,
      size,
    },
  });
};

/**
 * 새로운 댓글을 작성합니다.
 * @param {Long} boardId - 게시글 ID
 * @param {Object} commentData - 댓글 데이터 (nickname, password, content)
 */
export const writeComment = (boardId, commentData) => {
  return axios.post(`${API_BASE_URL}/${boardId}/comment/write`, commentData);
};

/**
 * 기존 댓글을 수정합니다.
 * @param {Long} boardId - 게시글 ID
 * @param {Long} commentId - 댓글 ID
 * @param {Object} commentEditData - 수정된 댓글 데이터 (content)
 */
export const editComment = (boardId, commentId, commentEditData) => {
  return axios.put(`${API_BASE_URL}/${boardId}/comment/${commentId}/edit`, commentEditData);
};

// 댓글 삭제
export const deleteComment = (boardId, commentId) => {
  console.log(`API 호출 - boardId: ${boardId}, commentId: ${commentId}`);
  return axios.delete(`${API_BASE_URL}/${boardId}/comment/${commentId}`);
};

/**
 * 댓글을 추천(하트)합니다.
 * @param {Long} boardId - 게시글 ID
 * @param {Long} commentId - 댓글 ID
 */
export const recommendComment = (boardId, commentId) => {
  return axios.post(`${API_BASE_URL}/${boardId}/comment/${commentId}/heart`);
};