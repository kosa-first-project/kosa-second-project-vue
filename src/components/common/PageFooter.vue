<template>
  <footer class="footer-area">
    <div class="container">
      <div class="row justify-content-between">
        <!-- 만든 사람들 -->
        <div class="col-sm-6 col-md-5">
          <div class="single-footer-widget">
            <h4>만든 사람들</h4>
            <ul>
              <li><a href="#">조장 : 안성준</a></li>
              <li><a href="#">조원 : 김도훈</a></li>
              <li><a href="#">조원 : 임은선</a></li>
              <li><a href="#">조원 : 배영재</a></li>
            </ul>
          </div>
        </div>
        <!-- 뉴스레터 -->
        <div class="col-sm-6 col-md-4">
          <div class="single-footer-widget">
            <h4>뉴스레터 구독하기</h4>
            <div class="form-wrap">
              <form target="_blank"
                    action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&amp;id=92a4423d01"
                    method="get" class="form-inline">
                <input class="form-control" name="EMAIL" placeholder="abcd@gmail.com" required="" type="email">
                <button class="click-btn btn btn-default text-uppercase">
                  <i class="far fa-paper-plane"></i>
                </button>
              </form>
            </div>
            <p>뉴스레터를 구독하여 여행 정보를 주기적으로 받으세요!</p>
          </div>
        </div>
        <!-- 문의 사항 -->
        <div class="col-sm-6 col-md-3">
          <div class="single-footer-widget footer_icon">
            <h4>문의 사항</h4>
            <p>서울시 송파구 중대로 135 IT벤쳐타워</p>
            <span>nadri@gamil.com</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 연도 -->
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-lg-12">
          <div class="copyright_part_text text-center">
            <p class="footer-text m-0">
              Copyright &copy;<span>{{ year }}</span> All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "PageFooter",
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped>
.footer-area {
  padding: 20px;
  background-color: #f8f9fa;
}
.footer-text {
  color: #6c757d;
}
</style>
