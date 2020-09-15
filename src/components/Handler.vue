<template>
  <header class="Handler">
    <div class="header-fix">
      <div class="header-inner">
        <a href="javascript:void(0)" class="header-logo" id="logo">My Blog</a>
        <nav class="nav" id="nav">
          <ul>
            <li><a href="/">首页</a></li>
            <li><a href="#" @click.stop.self="blog()">博客</a></li>
            <li><a href="#" @click.stop.self="leaveWord()">留言</a></li>
            <li><a href="#" @click.stop.self="diary()">日记</a></li>
            <li><a href="#" @click.stop.self="links()">友情链接</a></li>
          </ul>
        </nav>
        <a href="#" class="blog-user">
          <i class="el-icon-user-solid" @click="login()"></i>
        </a>
        <a class="phone-menu">
          <i></i>
          <i></i>
          <i></i>
        </a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    blog () {
      this.$router.push({ name: 'Blog' })
    },
    login () {
      this.$router.push({ name: 'Login' })
    },
    leaveWord () {
      // this.$router.push({name:'留言'})
    },
    diary () {
      // this.$router.push({name:'日记'})
    },
    links () {
      // this.$router.push({name:'友链'})
    }
  }
}
</script>

<style scoped>
.Handler {
  width: 100%;
  min-height: 60px;
  position: fixed;
  background-color: rgba(255, 255, 255, 1);
  z-index: 999;
  top: 0;
  left: 0;
  border-bottom: 1px solid #e8e9e7;
  font-size: 14px;

  display: block;
  font: 14px/1.5 "Helvetica neue", Helvetica, Tahoma, "lantinghei sc", "Microsoft Yahei", sans-serif;
  color: #515250;
  -webkit-font-smoothing: antialiased;

  overflow: hidden;
}

.header-fixed {
  width: 90%;
}

.header-fixed {
  margin-left: auto;
  margin-right: auto;
  position: relative;
}

.header-inner {
  margin-left: 60px;
  margin-right: 60px;
  position: relative;
}

.header-logo {
  font-family: "agency fb";
  font-size: 40px;
  color: #444647;
  text-align: center;
  position: absolute;
  left: 0;
}

a, img {
  text-decoration: none;
  border: none;
}

#nav {
  display: block;
  position: absolute;
  right: 15%;
  margin: 0;
  padding: 0;
  border: 0;
}

ul {
  display: block;
  list-style-type: disc;
}

.nav li {
  display: block;
  float: left;
  margin: 10px 5px;
  position: relative;
}

.nav li:before {
  width: 0;
  height: 2px;
  position: absolute;
  bottom: -11px;
  left: 50%;
  background-color: #6bc30d;
  content: "";
  transition: all .6s;
  z-index: -1;
}

.nav li:hover:before {
  width: 100%;
  left: 0;
}

li {
  list-style: none;
}

.nav li a {
  display: block;
  line-height: 32px;
  padding: 4px 28px;
  color: #212220;
  font-weight: 400;
  font-size: 15px;
  text-shadow: 0 1px 0 rgba(255, 255, 255, .2);
  -webkit-transition: all .2s;
  transition: all .2s;
}

.blog-user {
  position: absolute;
  right: 0;
  line-height: 60px;
  font-size: 24px;
  color: #000000;
}
</style>
