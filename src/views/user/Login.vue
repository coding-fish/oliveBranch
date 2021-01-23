<template>
  <div class="login">
    <el-card class="login-card" style="text-align:center">
      <img class="login-logo" src="../../assets/image/user/image/logoT.png">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="登录" name="login">
          <el-form :model="loginRuleForm" status-icon :rules="loginRules" ref="loginRuleForm" label-width="110px" class="demo-ruleForm login-form">
            <el-form-item label="邮箱 / 用户名" prop="email">
              <el-input type="email" v-model="loginRuleForm.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="loginRuleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <!-- <el-form-item label="验证码" prop="verify">
              <el-input type="text" v-model="loginRuleForm.verify" autocomplete="off"></el-input>
              <i class="el-icon-school"></i>
            </el-form-item> -->
            <el-form-item class="right-button">
              <el-button type="primary" @click="loginSubmitForm('loginRuleForm')">登录</el-button>
              <el-button @click="resetForm('loginRuleForm')">重置</el-button>
            </el-form-item>
<!--            <div style="text-align:right">-->
<!--              <el-link :underline="false" @click="findPW()">忘记密码？</el-link>-->
<!--            </div>-->
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="signup">
          <el-form :model="signRuleForm" status-icon :rules="signRules" ref="signRuleForm" label-width="110px" class="demo-ruleForm login-form">
            <el-form-item label="用户名" prop="username">
              <el-input type="text" v-model="signRuleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input type="email" v-model="signRuleForm.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="signRuleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item class="right-button">
              <el-button type="primary" @click="signSubmitForm('signRuleForm')">注册</el-button>
              <el-button @click="resetForm('signRuleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    var validateSignUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        if (this.signRuleForm.email !== '') {
          this.$refs.signRuleForm.validateField('email');
        }
        callback();
      }
    };
    var validateSignEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else {
        if (this.signRuleForm.pass !== '') {
          this.$refs.signRuleForm.validateField('pass');
        }
        callback();
      }
    };
    var validateSignPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    var validateLoginEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else {
        if (this.loginRuleForm.pass !== '') {
          this.$refs.loginRuleForm.validateField('pass');
        }
        callback();
      }
    };
    var validateLoginPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        // if (this.loginRuleForm.verify !== '') {
        //   this.$refs.loginRuleForm.validateField('verify');
        // }
        callback();
      }
    };
    // var validateLoginVerify = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入验证码'));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      activeName: 'login',
      ans:'',
      signRuleForm: {
        email:'',
        pass: '',
        username: '',
      },
      signRules: {
        email: [
          { validator: validateSignEmail, trigger: 'blur' }
        ],
        pass: [
          { validator: validateSignPass, trigger: 'blur' }
        ],
        username: [
          { validator: validateSignUsername, trigger: 'blur' }
        ],
      },
      loginRuleForm: {
        email:'',
        pass: '',
        // varify: '',
      },
      loginRules: {
        email: [
          { validator: validateLoginEmail, trigger: 'blur' }
        ],
        pass: [
          { validator: validateLoginPass, trigger: 'blur' }
        ],
        // verify: [
        //   { validator: validateLoginVerify, trigger: 'blur' }
        // ],
      }
    };
  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    loginSubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let result;
          this.$axios.post('/apis/user/login', {
            username: this.loginRuleForm.email,
            password: this.loginRuleForm.pass,
          }).then(res => {
            result = res.data.status
            if(result === 0){
              this.$router.push("/search");
            }
            else{
              this.$alert('用户名或密码错误', '登录失败', {
                confirmButtonText: '确定',
              });
            }
          })
        } else {
          //console.log('error submit!!');
          return false;
        }
      });
    },
    signSubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let result;
          this.$axios.post('/apis/user/register', {
            username: this.signRuleForm.username,
            password: this.signRuleForm.pass,
            email:this.signRuleForm.email
          }).then(res => {
            console.log(res)
            result = res.data.status
            if(result === 0){
              this.$alert('注册成功，请登录', '注册成功', {
                confirmButtonText: '确定',
              });
            }
            else if(result === 2){
              if(res.data.message === "注册失败, 该用户名已经存在."){
                this.$alert('用户名已被注册，请继续发挥想象力', '注册失败', {
                  confirmButtonText: '确定',
                });
              }
              else{
                this.$alert('邮箱已被注册，请登录', '注册失败', {
                  confirmButtonText: '确定',
                });
              }
            }
            else{
              this.$alert('网络请求错误', '注册失败', {
                confirmButtonText: '确定',
              });
            }
          })
        } else {
          //console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    findPW() {
      this.$alert('点击忘记密码', '密码找回', {
        confirmButtonText: '确定',
      });
    }
  }
}
</script>

<style>
body{
  background-image: url('../../assets/image/user/image/login-back.png');
  background-repeat:no-repeat;
  background-attachment:fixed
}
.login{
  height:100%
}
.login-card{
  display: block;
  width:700px;
  margin: 0 auto;
  margin-top: 8%;
  padding-left:1%;
  padding-right:1%;
  padding-top:1%
}
.el-tabs__item{
  width: 70px;
  font-size: 17px;
}
element.style {
    width: 53px;
    transform: translateX(0px);
    margin-left: 20px;
}
.el-form-item__label{
  text-align:center;
  width:50px;
  font-size: 16px;
}
.login-form{
  margin-top:15px;
}
.right-button{
  text-align:right;
}
.login-logo{
  height:250px;
}
</style>