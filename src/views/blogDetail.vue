<template>
  <div class="blogDetail">
    <handler id="handler"></handler>
    <div>
      <h2 class="title">{{ blogMD.title }}</h2>
      <div class="content markdown-body" id="content" v-html="blogMD.content"></div>
    </div>
  </div>
</template>
<script>
import Handler from '@/components/Handler'
import blog from '@/api/blog.js'

export default {
  components: { Handler },
  data () {
    return {
      blogMD: {
        id: '', // 博客id
        userId: '', // 用户id
        title: '', // 标题
        description: 'test', // 简介
        content: 'rest', // 内容
        status: 0 // 发布状态
      }
    }
  },
  created () {
    this.blogById()
  },
  methods: {
    blogById () {
      blog.selectById(this.$route.params.BlogId).then(response => {
        if (response.data.code === 20000) {
          const data = response.data.data.blog
          this.blogMD.userId = data.userId
          this.blogMD.title = data.title
          this.blogMD.description = data.description
          // 初始化编辑器
          var MarkDownIt = require('markdown-it')
          var md = new MarkDownIt()
          this.blogMD.content = md.render(data.content) // 生成转换后内容
          this.blogMD.status = data.status
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(error => {
        this.$message.error(error.data.message)
      })
    }
  }
}
</script>

<style>
#handler {
  position: relative;
}

.blogDetail {
  /*background-image: url(http://www.lzqcode.com/templets/static/image/index_bg.jpg); /* 首页背景图片 */
  background-position: center; /* 背景图片位置始终居中显示 */
  background-attachment: fixed; /* 背景固定 */
  background-repeat: no-repeat; /* 不平铺 */
  position: relative; /* 相对定位 */
  height: 100vh; /* 100vh表示正好和浏览器窗口大小一致 */
  overflow-y: scroll;
}

.title {
  background-color: rgba(0, 0, 0, 0.8);
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
  color: rgba(255, 255, 100, 0.8);
  transition: 0.5s;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  margin: 25px 30% 20px;
  padding: 10px;
  min-width: 5vh;
  min-height: 2vh;
  text-align: center;
  font-family: "agency fb";
  text-shadow: 5px 5px 9px rgba(255, 255, 255, 0.5);
}

#content {
  background-color: rgba(0, 0, 0, 0.8);
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
  color: rgba(255, 255, 100, 0.8);
  border: 0;
  transition: 0.5s;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  text-align: center;
  margin: 0 10%;
  padding: 5% 0;
  min-width: 70vh;
  min-height: 70vh;
  font-family: "agency fb";
  text-shadow: 5px 5px 9px rgba(255, 255, 255, 0.5);
}
</style>
