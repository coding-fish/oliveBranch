<template>
  <div>
    <div>
      <new-navigation></new-navigation>
    </div>
    <div class="personInfo">
      <div style="height: 20px"></div>
      <el-row class="main" :gutter="20" style="text-align:center">
        <el-col :span="3" style="margin-left: 20px">
          <el-menu
              router
              default-active=activeIndex
              class="el-menu-vertical-demo"
              @select="handleSelect"
              background-color="#0f72ca"
              text-color="#fff"
              active-text-color="rgb(255,221,0)">
            <el-menu-item index="/information">
              <!-- <img class="nav-icon" src="../icons/attribute.png"/> -->
              <i class="el-icon-user-solid nav-icon"></i>
              <span slot="title">个人信息</span>
            </el-menu-item>
            <el-menu-item index="/personinfo/following">
              <i class="el-icon-star-on nav-icon"></i>
              <span slot="title">我的关注</span>
            </el-menu-item>
            <el-menu-item index="/personinfo/collected">
              <i class="el-icon-s-management nav-icon"></i>
              <span slot="title">我的收藏</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="20" style="margin-right: 20px">
          <div>
            <div class="information">
              <el-card class="info" style="padding-top:20px; text-align:center">
                <el-row :gutter="20">
                  <el-col :span="6">
                    <el-row>
                      <!--    <img v-show="userInfo.avatar" class="avatar-img" :src="userInfo.avatar">-->
                      <!--    <el-upload-->
                      <!--        action="阿巴阿巴"-->
                      <!--        class="avatar-uploader avatar-img"-->
                      <!--        :show-file-list="false"-->
                      <!--        :on-success="handleAvatarSuccess"-->
                      <!--        :on-change="onChange"-->
                      <!--        :before-upload="beforeAvatarUpload"-->
                      <!--        :http-request="uploadAvatar"-->
                      <!--    >-->
                      <!--      <el-image v-if="avatar" :src="avatar" class="avatar" alt="fail to load"-->
                      <!--                fit="cover"></el-image>-->
                      <!--      <i v-if="!avatar" class="el-icon-plus avatar-uploader-icon"></i>-->
                      <!--    </el-upload>-->
                      <el-upload
                          class="avatar-uploader avatar-img"
                          :style="{height: '150px', textAlign: 'center', backgroundImage:'url(' + this.avatar + ')', backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: 'contain'}"
                          action
                          ::limit="1"
                          :show-file-list="false"
                          :on-change="handleChange"
                          :before-upload="beforeUpload"
                          accept="image/png, image/gif, image/jpg, image/jpeg"
                      >
                        <el-image v-if="this.avatar" :src="this.avatar" class="avatar" alt="fail to load"
                                  fit="cover"></el-image>
                        <i v-if="!this.avatar" class="el-icon-plus avatar-uploader-icon"/>
                        <div slot="tip" class="el-upload__text upload__tip">
                          <div v-if="!this.avatar" style="color: #4a5568">
                            上传照片(大小限制为2M)
                          </div>
                          <div v-if="this.avatar" style="color: #4a5568">
                            点击头像进行更换
                          </div>
                        </div>
                      </el-upload>
                    </el-row>
                    <!--   <el-row v-if="avatar" style="margin-top:15px;font-size:15px;color:#303133">-->
                    <!--     (点击头像进行更换)-->
                    <!--   </el-row>-->
                  </el-col>
                  <el-col :span="18">
                    <el-form :label-position="labelPosition" label-width="80px" :model="userInfo"
                             style="text-align:left;margin-bottom:24px">
                      <el-form-item label="用户名">{{ userInfo.name }}</el-form-item>
                      <el-form-item label="邮箱">
                        <el-input v-model="userInfo.email"/>
                      </el-form-item>
                      <el-form-item label="手机号">
                        <el-input v-model="userInfo.phone"/>
                      </el-form-item>
                      <el-form-item label="生日">
                        <el-input v-model="userInfo.birthday"/>
                      </el-form-item>
                      <el-form-item label="性别">
                        <el-radio-group v-model="userInfo.gender">
                          <el-radio label="男"></el-radio>
                          <el-radio label="女"></el-radio>
                          <el-radio label="秘密"></el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="个人简介">
                        <el-input v-model="userInfo.bio" placeholder="可拖拽右下角调节大小" type="textarea" rows="2"/>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="success" @click="updateInfo">更新信息</el-button>
                      </el-form-item>
                    </el-form>
                    <img :src="this.testUrl"/>
                    <el-divider></el-divider>
                    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" :label-position="labelPosition"
                             label-width="80px" style="text-align:left;margin-top:24px">
                      <el-form-item label="原密码" prop="oldPass">
                        <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="新密码" prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="success" @click="submitPW('ruleForm')">修改密码</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                      </el-form-item>
                    </el-form>
                  </el-col>
                </el-row>
              </el-card>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <new-bottom></new-bottom>
  </div>

</template>

<script>
import NewNavigation from "../navigatorandsearch/NewNavigation";
import CollectedVue from './Collected.vue';
import NewBottom from "@/views/navigatorandsearch/NewBottom";

export default {
  name: 'Information',
  components: {
    NewBottom,
    NewNavigation,
  },
  data() {
    const validateOldPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入旧密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      testUrl: '',
      // routerAlive: true,
      user_id: 0,
      labelPosition: 'left',// 控制表单位置
      avatar: undefined,// 头像单独处理
      userInfo: {
        name: '',
        email: '',
        phone: '',
        // avatar: undefined,// 头像
        birthday: '',// 生日暂时用字符串
        gender: '',
        bio: '',// 个人简介
      },
      activeIndex: 1,
      dialogVisible: false,

      author_id: '',
      ruleForm: {
        pass: '',
        checkPass: '',
        oldPass: '',
      },
      rules: {
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ],
        oldPass: [
          {validator: validateOldPass, trigger: 'blur'}
        ],
      },
      is_author: 0,
      is_admin: 0,
    };
  },
  created() {
    this.init()
  },
  mounted() {
    //   this.routerAlive = false;
    //   this.$nextTick(() =>{
    //     this.routerAlive = true;
    //   })
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    // 修改密码
    submitPW(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let result
          this.$axios.post('/apis/user/changepassword', {
            id: this.user_id,
            type: 0,// 普通用户
            oldpass: this.ruleForm.oldPass,
            newpass: this.ruleForm.pass,
          }).then(res => {
            result = res.data.error_code
            if (result === 0) {
              this.$message.success('更新密码成功')
            } else {
              this.$message.error(res.data.data.msg)
            }
          })
        } else {
          this.$message.error('输入无效')
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    init() {
      if (this.$store.state.keepLogIn === true) {
        this.user_id = this.$store.state.userId
        this.$axios.post('/apis/user/getuserinfo', {
          id: this.user_id
        }).then(res => {
          if (res.data.error_code === 0) {
            console.log(res.data)
            this.userInfo.name = res.data.data.username;
            this.userInfo.email = res.data.data.email;
            this.userInfo.phone = res.data.data.phone;
            // this.userInfo.avatar = res.data.data.avatar;
            this.avatar = res.data.data.avatar;
            this.userInfo.birthday = res.data.data.birthday;
            this.userInfo.gender = res.data.data.gender;
            this.userInfo.bio = res.data.data.addr;// FIXME:先随便找个字段
          } else {
            this.$message.error('网络错误')
          }
        })
      } else {
        this.$message.error('请先登录')
      }
      console.log('initing')
      console.log(this.avatar)
    },
    updateInfo() {
      this.$axios.post('/apis/user/changeuserinfo', {
        id: this.user_id,
        email: this.userInfo.email,
        phone: this.userInfo.phone,
        birthday: this.userInfo.birthday,
        gender: this.userInfo.gender,
        addr: this.userInfo.bio,// fixme
      }).then(res => {
        let result = res.data.error_code
        // console.log(res)
        if (result === 0) {
          this.$message.success('更新成功')
        } else {
          this.$message.error('更新失败')
        }
      })
    },
    changeFile(file, fileList) {
      var This = this;
      //this.avatar = URL.createObjectURL(file.raw);
      var reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = function (e) {
        this.result // 这个就是base64编码了
        This.avatar = this.result;
      }
      console.log(This.avatar)
    },
    //当上传图片后，调用onchange方法，获取图片本地路径
    onChange(file, fileList) {
      console.log('onChange')
      this.avatar = URL.createObjectURL(file.raw);
      console.log(this.avatar)
      this.testUrl = this.avatar// 此时的路径就是头像的路径，且可以正确读取!!!


      // var reader = new window.FileReader();
      // var blob = new Blob([this.testUrl], {
      //   type: 'text/plain'
      // });
      // reader.readAsDataURL(blob);
      // reader.onloadend = function () {
      //   let base64data = reader.result;
      //   alert(base64data);
      // }
      // console.log(typeof this.avatar)//string

      const image = new Image() // 新建一个img标签（还没嵌入DOM节点)
      //blob:http://localhost:8080/b878edea-e649-4f8d-b723-c3f25454141b
      image.src = file.url;
      image.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        const context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, image.width, image.height);
        let imgUrl = canvas.toDataURL() //图片的base64地址
        alert(imgUrl);
      }


      // var _this = this;
      // var event = event || window.event;
      // var file = event.target.files[0];
      // var reader = new FileReader();
      // //转base64
      // reader.onload = function(e) {
      //   _this.avatar = e.target.result //将图片路径赋值给src
      // }
      // reader.readAsDataURL(file.raw);
    },
    // 上传之前对图片格式大小进行检查
    beforeAvatarUpload(file) {
      console.log('beforeAvatarUpload')
      console.log(this.avatar)
      const isIMAGE = (file.type === 'image/jpeg' || file.type === 'image/jpg'
          || file.type === 'image/png' || file.type === 'image/gif');
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isIMAGE) {
        this.$message.error('上传头像图片只能是 jpg/jpeg/png/gif 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      //  have a try
      // let reader = new FileReader();
      // reader.readAsDataURL(file.raw);
      // reader.onload = function(e){
      //   console.log('图片的base64数据')
      //   console.log(this.result)//图片的base64数据
      // }
      // console.log(typeof this.avatar)// string
      // if (isLt2M) {
      //   this.uploadImgToBase64(file.raw).then((data) => {
      //     this.avatar = data.result;
      //   });
      // }

      // var readIcon = new FileReader();
      // readIcon.onload = function(e) {
      //   // 读成功，可预览
      //   console.log(e.target.result);
      // };
      // readIcon.onerror = function(e){
      //   alert('图片上传失败，请检查。');
      // }
      // readIcon.readAsDataURL(file.getNative());

      return isIMAGE && isLt2M;
    },
    // 上传头像
    uploadAvatar(params) {
      // var fileObj = params.file
      // var formData = new FormData()
      // formData.append('avatar', fileObj)
      console.log('uploadAvatar')
      console.log(this.avatar)
      let reader = new FileReader()
      this.avatar = reader.readAsDataURL(params.file)
      console.log(typeof this.avatar)
      this.$axios.post('/apis/user/changeavatar', {
        id: this.user_id,
        avatar: this.avatar
      }).then(res => {
        // console.log(res)
        if (res.data.error_code === 0) {
          this.$message.success('上传成功')
          // console.log('刚才上传的图片是:')
          // console.log(this.avatar)// 最好传图片本身?
          // this.$notify.error({
          //   title: '提示',
          //   message: '上传头像失败',
          // });
        } else {
          this.$message.error('上传失败')
        }
      })
      this.avatar = window.URL.createObjectURL(params.file)
    },
    handleAvatarSuccess(res, file) {
      console.log('handleAvatarSuccess')
      console.log(this.avatar)
      this.avatar = URL.createObjectURL(file.raw);
      console.log('Change to')
      console.log(this.avatar)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {

          });
    },
    handleChange(file, fileList) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (isLt2M) {
        // uploadImgToBase64()返回一个Promise对象，通过.then()获取其数据。其中data.result是图片转成的base64值
        this.uploadImgToBase64(file.raw).then((res) => {
          this.avatar = res.result
          // 然后自动上传
          this.$axios.post('/apis/user/changeavatar', {
            id: this.user_id,
            avatar: this.avatar
          }).then(res => {
            // console.log(res)
            if (res.data.error_code === 0) {
              this.$message.success('上传成功')
            } else {
              this.$message.error('上传失败')
            }
          });
        })
      } else {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
    },
    uploadImgToBase64(file) {
      // 核心方法，将图片转成base64字符串形式
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          // 图片转base64完成后返回reader对象
          resolve(reader);
        };
        reader.onerror = reject;
      });
    },
    beforeUpload(file) {
      return false;
    },
  }
}
</script>

<style>
.avatar-uploader {
  margin: 0 auto;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}

.avatar {
  width: 150px;
  height: 150px;
  display: block;
}

.el-divider-wide {
  margin: 24px;
}

.personInfo {
  margin-right: 3%;
  margin-bottom: 1%;
}

.el-form {
  margin-right: 100px;
}

.personPage {
  margin-top: 30px;
}

.avatar-img {
  height: 150px;
  width: 150px;
  border-radius: 75px;
}
</style>