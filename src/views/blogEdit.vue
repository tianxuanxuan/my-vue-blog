<template>
  <div class="blogEdit">
    <handler id="handler"></handler>
    <el-container>
      <el-header class="el-header">
        <el-form id="BlogForm" :inline="true" :model="blogMD" class="demo-form-inline" style="min-width: 950px">
          <el-form-item id="el-item" label="">
            <el-input v-model="blogMD.title" placeholder="博客标题" style="min-width: 90vh"></el-input>
          </el-form-item>
          <el-form-item id="el-item" label="">
            <el-button type="primary" @click="save()">{{ saveTitle }}</el-button>
          </el-form-item>
          <el-form-item id="el-item" label="">
            <el-button type="success" @click="publish()">{{ publishTitle }}</el-button>
          </el-form-item>
          <el-form-item id="el-item" label="">
            <el-input v-model="blogMD.description" placeholder="博客简介" style="min-width: 117vh;"></el-input>
          </el-form-item>
        </el-form>
      </el-header>
      <div>
        <mavon-editor v-model="blogMD.content" id="editor" @fullScreen="fullScreen"></mavon-editor>
      </div>
    </el-container>
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
        description: '', // 简介
        content: '', // 内容
        status: 0 // 发布状态
      },
      saveFlag: true, // true表示新建博客，false表示编辑已有博客
      saveTitle: '保存', // 如果是新建就保存，不是新建就显示完成修改
      publishTitle: '未发布', // 如果发布状态为0显示未发布，1显示已发布
      screenFlag: false // 当前是否是全屏模式
    }
  },
  created () {
    if (this.$route.params.BlogId === undefined || this.$route.params.BlogId === null ||
      this.$route.params.BlogId === '') {
      // 没有id，说明是新建博客
      this.blogMD.userId = this.$store.state.userInfo.id // 获取当前用户id
      console.log('用户id' + this.$store.state.userInfo.id)
    } else {
      // 有id就是修改博客
      this.saveFlag = false
      this.saveTitle = '修改完成'
      this.blogMD.id = this.$route.params.BlogId
      this.blogById() // 回显数据
    }
  },
  methods: {
    publish () {
      if (this.blogMD.status === 0) {
        this.blogMD.status = 1
      }
      this.save()
    },
    save () {
      if (this.saveFlag) { // true则调用保存博客api
        blog.insertBlog(this.blogMD).then(response => {
          if (response.data.code === 20000) {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.$router.push({ name: 'Blog' })
          } else {
            this.$message.error(response.data.message)
          }
        }).catch(error => {
          this.$message.error(error.data.message)
        })
      } else { // 否则就是修改
        blog.updateBlogById(this.blogMD).then(response => {
          if (response.data.code === 20000) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.$router.push({ name: 'Blog' })
          } else {
            this.$message.error(response.data.message)
          }
        }).catch(error => {
          this.$message.error(error.data.message)
        })
      }
    },
    blogById () {
      blog.selectById(this.$route.params.BlogId).then(response => {
        if (response.data.code === 20000) {
          const data = response.data.data.blog
          this.blogMD.userId = data.userId
          this.blogMD.content = data.content
          this.blogMD.title = data.title
          this.blogMD.description = data.description
          this.blogMD.status = data.status
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(error => {
        this.$message.error(error.data.message)
      })
    },
    fullScreen () {
      const myEditor = document.querySelector('#editor')
      if (this.screenFlag) {
        this.screenFlag = false
        myEditor.style.maxWidth = 130 + 'vh'
      } else {
        this.screenFlag = true
        myEditor.style.maxWidth = 300 + 'vh'
      }
    }
  }
}
</script>

<style>
#handler {
  position: relative;
}

.blogEdit {
  /* background-image:url(http://www.lzqcode.com/templets/static/image/index_bg.jpg);/* 首页背景图片 */
  background-position: center; /* 背景图片位置始终居中显示 */
  background-attachment: fixed; /* 背景固定 */
  background-repeat: no-repeat; /* 不平铺 */
  position: relative; /* 相对定位 */
  height: 100vh; /* 100vh表示正好和浏览器窗口大小一致 */
  overflow-y: scroll;
}

#editor {
  /* 居中方案 */
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5vh;

  min-height: 70vh;
  max-width: 130vh;

  overflow: hidden;
}

.el-header, .el-footer {
  color: #333;
  text-align: center;
  line-height: 60px;
  min-height: 15vh;
}

.el-header {
  margin-top: 2%;
}

.el-main {
  color: #333;
  text-align: center;
  line-height: 160px;
}

#BlogForm {
  position: relative;
  /* top: 10%; */
}

#el-item {
  margin: 0 1vh;
}
</style>
