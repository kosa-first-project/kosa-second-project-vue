import axios from 'axios';
const API_BASE_URL = 'http://localhost:8888/api/board';

// 게시글 리스트 가져오기 (키워드 없이)
export const getBoards = (page, limit, sort = 'boardId', order = 'desc') => {
  return axios.get(API_BASE_URL, {
    params: {
      _page: page,
      _limit: limit,
      _sort: sort,
      _order: order,
    },
  });
};

// 게시글 검색
export const getBoardsByKeyword = (
  page,
  limit,
  keyword,
  sort = 'boardId',
  order = 'desc'
) => {
  return axios.get(API_BASE_URL, {
    params: {
      _page: page,
      _limit: limit,
      _sort: sort,
      _order: order,
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