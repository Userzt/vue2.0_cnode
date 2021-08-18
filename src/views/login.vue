<template>
  <div class="container">
    <div class="content">
      <div class="header">
        <ul>
          <li><router-link to="/index">主页</router-link></li>
          <li>/ 登录</li>
        </ul>
      </div>
      <form>
        <div class="input">
          <label for="username">用户名</label>
          <input type="text" id="username" />
        </div>
        <div class="input">
          <label for="password">密码</label>
          <input type="text" id="password" />
        </div>
        <div class="login_in">
          <input type="submit" class="sub_btn" />
          <button>通过 GitHub 登录</button>
          <a href="#">忘记密码了？</a>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.btn {
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
}
.container {
  width: 1400px;
  margin: 20px auto;

  .content {
    background-color: #fff;

    .header {
      padding: 10px;
      background-color: #f6f6f6;
      border-radius: 3px 3px 0 0;

      ul {
        height: 26px;

        li {
          float: left;
          width: auto;
          height: 20px;
          line-height: 20px;
          padding: 3px 4px;
          border-radius: 3px;
          cursor: pointer;
          font-size: 14px;
          &:first-child {
            a {
              color: #80bd01;
            }
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    form {
      margin-top: 40px;
      .input {
        margin-bottom: 20px;
        label {
          display: block;
          float: left;
          width: 160px;
          padding-top: 5px;
          text-align: right;
        }
        input {
          width: 270px;
          height: 20px;
          margin-left: 20px;
          padding: 4px 6px;
          border: 1px solid #ccc;
          border-radius: 5px;
          outline: none;
          line-height: 20px;
        }
      }
      .login_in {
        padding: 20px 0 60px 180px;
        input {
          width: 50px;
          height: 32px;
          padding: 3px 10px;
          .btn;
          background-color: #08c;
        }
        button {
          width: 180px;
          height: 32px;
          margin-left: 10px;
          background-color: #5bc0de;
          .btn;
        }
        a {
          margin-left: 20px;
          font-size: 14px;
          color: #778087;
        }
      }
    }
  }
}
</style>