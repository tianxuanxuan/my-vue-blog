<template>
  <div class="home">
    <div class="height1">
      <div class="height1_Div">
        <h1>我的博客</h1>
        <p>你现在要做的是：多读书，按时睡，然后变得温柔，大度，继续善良，保持可爱。</p>
        <el-button type="primary" id="height1_button" @click="enterBlog()">进入 Blog</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data () {
    return {}
  },
  created () {
    window.onload = function () {
      const heightDiv = document.querySelector('.height1_Div')
      heightDiv.style.transform = 'scale(1,1)'
    }
  },
  methods: {
    enterBlog () {
      this.$router.push({ name: 'Blog' })
    }
  }
}
</script>

<style>
/*首页面*/
.height1 {
  background-image: url(http://www.lzqcode.com/templets/static/image/index_bg.jpg); /* 首页背景图片 */
  background-position: center; /* 背景图片位置始终居中显示 */
  background-attachment: fixed; /* 背景固定 */
  background-repeat: no-repeat; /* 不平铺 */
  position: relative; /* 相对定位 */
  height: 100vh; /* 100vh表示正好和浏览器窗口大小一致 */
}

.height1_Div {
  transition: 1.5s; /* 动画效果 */
  transform: scale(.3); /* 缩放 */
  color: rgb(255, 255, 255); /* 文字颜色 */
  height: 20vh; /* 高度为浏览器20比 */
  width: 100%; /* 宽度正好撑满 */
  /* 以下是块级元素居中方案 */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.height1_Div h1 {
  font: 30px Helvetica Neue, Helvetica, PingFang SC, \5FAE\8F6F\96C5\9ED1, Tahoma, Arial, sans-serif; /* 设值文字 */
  display: block; /* 转换为块级元素，让其独占一行 */
  font-size: 2em; /* 字体大小 */
  /* 外边距*/
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

.height1_Div p {
  font: 20px Helvetica Neue, Helvetica, PingFang SC, \5FAE\8F6F\96C5\9ED1, Tahoma, Arial, sans-serif;
  margin: 20px 0;
  letter-spacing: 10px; /* 文字间距 */
  display: block;
  /* 外边距*/
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

#height1_button {
  margin-top: 20px;
  display: inline-block;
  height: 38px;
  line-height: 38px;
  padding: 0 18px;
  text-align: center;
  font-size: 14px;
  border: none;
  border-radius: 2px;
  cursor: pointer; /* 鼠标指针指入变为手的形状 */
}
</style>
