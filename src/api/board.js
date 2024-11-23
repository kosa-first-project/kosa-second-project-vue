import axios from 'axios';
const API_BASE_URL = 'http://localhost:8888/board';

// 게시글 리스트 가져오기 (키워드 없이)
export const getBoards = (page, size, sort = 'boardId,desc') => {
  return axios.get(API_BASE_URL, {
    params: {
      page,
      size,
      sort,
    },
  });
};

// 게시글 검색
export const getBoardsByKeyword = (page, size, keyword, sort = 'boardId,desc') => {
  return axios.get(API_BASE_URL, {
    params: {
      page,
      size,
      sort,
      keyword,
    },
  });
};

// 게시글 상세 조회 API
export const getBoardDetails = (boardId, page, size) => {
  return axios.get(`${API_BASE_URL}/${boardId}`, {
    params: {
      page,
      size,
      sort: 'commentId,asc', // 기본 정렬
    },
  });
};

// 게시글 만들기
export const createBoard = (formData) => {
  return axios.post(`${API_BASE_URL}/write`, formData);
};

// 게시글 수정하기 
export const updateBoard = (boardId, formData) => {
  return axios.put(`${API_BASE_URL}/${boardId}/edit`, formData);
};

export const getBoardById = (boardId) => {
  return axios.get(`${API_BASE_URL}/${boardId}`);
};

// 게시글 삭제하기
export const deleteBoard = (boardId) => {
  return axios.delete(`${API_BASE_URL}/${boardId}/delete`);
};


export const getComments = (boardId, page = 0, size = 10) => {
  return axios.get(`${API_BASE_URL}/${boardId}/comment`, {
    params: {
      page,
      size,
    },
  });
};
