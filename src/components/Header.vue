<template>
  <header>
    <div class="header_inner">
      <a href="https://cnodejs.org/" class="logo">
        <img src="/images/logo1.png" alt="" />
      </a>
      <form>
        <input type="text" />
      </form>

      <ul>
        <li><router-link to="/index">首页</router-link></li>
        <li><a href="#">新手入门</a></li>
        <li><a href="#">API</a></li>
        <li><a href="#">关于</a></li>
        <li><a href="#">注册</a></li>
        <li><router-link to="/login">登录</router-link></li>
      </ul>
    </div>
  </header>
</template>

<script>
</script>

<style lang="less" scoped>
header {
  width: 100%;
  height: 50px;
  background-color: #444;

  .header_inner {
    width: 1400px;
    margin: 0 auto;

    .logo {
      float: left;
      display: block;
      width: 120px;
      height: 50px;
    }

    input {
      float: left;
      width: 235px;
      height: 22px;
      margin: 12px 0 0 35px;
      background: url("/images/search.png") 4px 4px no-repeat #888;
      padding: 3px 5px 3px 22px;
      color: #666;
      border: 0;
      border-radius: 20px;
      outline: none;
      transition: all 0.5s;

      &:hover {
        background-color: #fff;
      }
    }

    ul {
      float: right;
      line-height: 50px;

      li {
        float: left;
        margin-left: 30px;

        a {
          color: #ccc;
          font-size: 14px;
        }
      }
    }
  }
}
</style>