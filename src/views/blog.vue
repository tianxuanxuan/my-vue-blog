<template>
  <div class="blog">
    <handler id="handler"></handler>
    <el-row type="flex" justify="center">
      <el-col :span="18">
        <div class="block">
          <el-timeline-item timestamp="" placement="top">
            <el-card id="item" @click="blogDetailSave()">
              <h4 style="text-align: center;" @click="blogDetailSave()">开始创作一篇新博客</h4>
              <div class="buttonC"></div>
            </el-card>
          </el-timeline-item>
          <el-timeline>
            <el-timeline-item v-for="blog in blogs" :key="blog.id" :timestamp="blog.gmtModified" placement="top">
              <el-card id="item">
                <h4>Title: {{ blog.title }}</h4>
                <p>博文提交于： {{ blog.gmtModified }}</p>
                <div class="buttonC">
                  <el-button id="a" type="primary" icon="el-icon-edit" circle
                             @click="updateBlogById(blog.id,blog.userId)"></el-button>
                  <el-button id="a" type="success" icon="el-icon-check" circle
                             @click="blogDetail(blog.id)"></el-button>
                  <el-button id="a" type="danger" icon="el-icon-delete" circle
                             @click="deleteBlogById(blog.id,blog.userId)"></el-button>
                </div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
          <el-pagination
            :page-size="size"
            :current-page="current"
            background
            @current-change="currentChange"
            style="opacity: 1;box-shadow: 5px 5px 5x #000000; "
            layout="prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Handler from '@/components/Handler.vue'
import blog from '@/api/blog.js'

export default {
  components: { Handler },
  data () {
    return {
      current: 1, // 当前页
      size: 5, // 每页数量
      total: 1, // 总记录数
      blogs: {}, // 博客数据
      userId: ''
    }
  },
  created () {
    if (this.$store.state.userInfo != null || this.$store.state.userInfo !== undefined) {
      this.userId = this.$store.state.userInfo.id
    }
    this.init()
  },
  methods: {
    init () {
      this.limitSelect()
    },
    limitSelect () {
      blog.limitSelect(this.current, this.size).then(response => {
        console.log(response)
        this.blogs = response.data.data.limitBlog.records
        this.total = response.data.data.limitBlog.total
        this.size = response.data.data.limitBlog.size
        this.current = response.data.data.limitBlog.current
      })
    },
    updateBlogById (id, userId) {
      if (this.userId === userId) {
        this.$router.push({
          name: 'BlogEdit',
          params: { BlogId: id }
        })
      } else {
        this.$message.error('这不是你的文章哦')
      }
    },
    blogDetail (id) {
      this.$router.push({
        name: 'BlogDetail',
        params: { BlogId: id }
      })
    },
    deleteBlogById (id, userId) {
      if (this.userId === userId) {
        this.$confirm('你将永久删除该文件，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          blog.deleteBlogById(id).then(response => {
            if (response.data.code === 20000) {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.init()
            } else {
              this.$message.error(response.data.message)
            }
          }).catch(error => {
            this.$message.error(error.data.message)
          })
        })
      } else {
        this.$message.error('你没有权限删除该博客')
      }
    },
    blogDetailSave () {
      if (this.$store.state.loginFlag) { // 已登录
        this.$router.push({ name: 'BlogAdd' })
      } else {
        this.$message({
          type: 'info',
          message: '请登录'
        })
        this.$router.push({ name: 'Login' })
      }
    },
    currentChange (val) {
      this.current = val
      this.limitSelect()
    }
  }
}
</script>

<style>
#handler {
  position: relative;
}

.blog {
  /*background-image: url(http://www.lzqcode.com/templets/static/image/index_bg.jpg); /* 首页背景图片 */
  /* background-image: url('../assets/bg.jpg'); */
  background-position: center; /* 背景图片位置始终居中显示 */
  background-attachment: fixed; /* 背景固定 */
  background-repeat: no-repeat; /* 不平铺 */
  position: relative; /* 相对定位 */
  height: 100vh; /* 100vh表示正好和浏览器窗口大小一致 */
}

.block {
  height: 80vh;
}

#item {
  min-width: 500px;
  border: 0;
  background-color: rgba(0, 0, 0, 0.8);
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
  color: rgba(255, 255, 100, 0.8);
  transition: 0.5s;
  overflow: hidden;
  position: relative;
}

#item:hover {
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
  transform: translateY(-10%);
  transform: scale(1.02, 1.02);
}

#item h4, #item p {
  text-align: left;
  text-shadow: 5px 5px 9px rgba(255, 255, 255, 0.5);
  font-family: "agency fb";
  transition: 0.5s;
}

#item:hover h4, #item:hover p {
  text-shadow: 5px 5px 9px rgba(255, 255, 255, 1);
}

.buttonC {
  display: inline-block;
  position: absolute;
  right: 2.5%;
  bottom: 30%;
}

#a {
  transition: 0.5s;
  box-shadow: 1px 2px 15px rgba(255, 255, 255, 0.7);
  opacity: 1;
}

#a:hover {
  box-shadow: 1px 2px 15px rgba(255, 255, 255, 1);
  opacity: 1;
}
</style>
