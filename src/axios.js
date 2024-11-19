import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8888', // Spring Boot 연결을 위한 포트
});
