<template>
  <div>
    <div>
      <new-navigation></new-navigation>
    </div>
    <div class="teamInfo">
      <div style="height: 20px"></div>
      <el-row class="main" :gutter="20" style="text-align:center">
        <el-col :span="2" style="margin-left: 20px">
          <div style="width: 20px; height: 100px"></div>
        </el-col>
        <el-col :span="21" style="margin-right: 20px">
          <div>
            <div class="information">
              <el-card class="info" style="padding-top:20px; text-align:center">
                <el-row :gutter="20">

                    <!--logo & qrcode-->
                    <el-col :span="6">
                      <el-row style="height: 200px">
                        <el-upload
                            class="avatar-uploader avatar-img"
                            :style="{height: '150px', textAlign: 'center', backgroundImage:'url(' + this.team.logo + ')', backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: 'contain'}"
                            action
                            ::limit="1"
                            :show-file-list="false"
                            :auto-upload="false"
                            :on-change="handleLogoChange"
                            :before-upload="beforeUpload"
                            accept="image/png, image/gif, image/jpg, image/jpeg"
                        >
                          <el-image v-if="this.team.logo" :src="this.team.logo" class="avatar" alt="fail to load"
                                    fit="cover"></el-image>
                          <i v-if="!this.team.logo" class="el-icon-plus avatar-uploader-icon"/>
                          <div slot="tip" class="el-upload__text upload__tip">
                            <div v-if="!this.team.logo" style="color: #4a5568">
                              上传团队logo(大小限制为2M)
                            </div>
                            <div v-if="this.team.logo" style="color: #4a5568">
                              点击头像进行更换
                            </div>
                          </div>
                        </el-upload>
                      </el-row>
                      <el-divider></el-divider>
                      <el-row style="height: 200px">
                        <el-upload
                            class="qrcode-uploader"
                            :style="{height: '150px', textAlign: 'center', backgroundImage:'url(' + this.team.qrcode + ')', backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: 'contain'}"
                            action
                            ::limit="1"
                            :show-file-list="false"
                            :auto-upload="false"
                            :on-change="handleQrcodeChange"
                            :before-upload="beforeUpload"
                            accept="image/png, image/gif, image/jpg, image/jpeg"
                        >
                          <el-image v-if="this.team.qrcode" :src="this.team.qrcode" alt="fail to load"
                                    fit="cover"></el-image>
                          <i v-if="!this.team.qrcode" class="el-icon-plus avatar-uploader-icon"/>
                          <div v-else>

                          </div>

                        </el-upload>
                        <div>
                          <div v-if="!this.team.qrcode" style="color: #4a5568">
                            上传团队二维码(大小限制为2M)
                          </div>
                          <div v-if="this.team.qrcode" style="color: #4a5568">
                            点击图片进行更换
                          </div>
                        </div>
                      </el-row>
                    </el-col>
                    <!--other info-->
                    <el-col :span="18">
                      <el-form :label-position="labelPosition" label-width="80px" :model="team"
                               style="text-align:left;margin-bottom:24px">
                      <el-form-item label="团队名称">
                        <el-input v-model="team.name" @input="change"/>
                      </el-form-item>
                      <el-form-item label="团队老师">
                        <el-input v-model="team.teacher"/>
                      </el-form-item>
                      <el-form-item label="团队电话">
                        <el-input v-model="team.tel"/>
                      </el-form-item>
                      <el-form-item label="团队邮箱">
                        <el-input v-model="team.mail"/>
                      </el-form-item>
                      <el-form-item label="团队网站">
                        <el-input v-model="team.website"/>
                      </el-form-item>
                      <el-form-item label="团队简介">
                        <el-input v-model="team.description" placeholder="可拖拽右下角调节大小" type="textarea" rows="5"/>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="success" @click="updateInfo">更新信息</el-button>
                      </el-form-item>
                      </el-form>
                    </el-col>

                </el-row>
                <el-divider></el-divider>
                <el-row gutter="280">
                  <el-col :span="5">
                    <div style="width: 10px; height: 10px"></div>
                  </el-col>
                  <el-col :span="19">
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
import NewBottom from "@/views/navigatorandsearch/NewBottom";
import NewNavigation from "@/views/navigatorandsearch/NewNavigation";

export default {
  name: "TeamInfo",
  components: {NewNavigation, NewBottom},
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
      labelPosition: 'left',// 控制表单位置
      team_id: 0,
      team: {
        name: '',
        teacher: "",
        tel: "",
        mail: "",
        website: "",
        description: "",
        logo: undefined,
        qrcode: undefined,
      },
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
    };
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (this.$store.state.keepLogIn === true) {
        this.team_id = this.$route.query.teamid
        this.$axios.post('/apis/team/getteamdetail', {
          id: this.team_id
        }).then(res => {
          console.log(res)
          let result = res.data.error_code
          if (result === 0) {
            this.team.name = res.data.data.name
            this.team.teacher = res.data.data.teacher
            this.team.tel = res.data.data.tel
            this.team.mail = res.data.data.mail
            this.team.website = res.data.data.website
            this.team.description = res.data.data.description
            this.team.logo = res.data.data.logo
            this.team.qrcode = res.data.data.qrcode
          } else {
            this.$message.error(res.data.message)
          }
        })
      } else {
        this.$message.error('请先登录')
      }
    },
    change() {
      this.$forceUpdate()
    },
    updateInfo() {
      this.$axios.post('/apis/team/changeteamdetail', {
        id: this.team_id,
        logo: this.team.logo,
        qrcode: this.team.qrcode,
        name: this.team.name,
        teacher: this.team.teacher,
        tel: this.team.tel,
        mail: this.team.mail,
        website: this.team.website,
        description: this.team.description
      }).then(res => {
        let result = res.data.error_code
        // console.log(res)
        if (result === 0) {
          this.$message.success('更新成功')
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    handleLogoChange(file, fileList) {
      // 上传之前对图片格式大小进行检查
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (isLt2M) {
        // uploadImgToBase64()返回一个Promise对象，通过.then()获取其数据。其中data.result是图片转成的base64值
        this.uploadImgToBase64(file.raw).then((res) => {
          this.team.logo = res.result
        })
      } else {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
    },
    handleQrcodeChange(file, fileList) {
      // 上传之前对图片格式大小进行检查
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (isLt2M) {
        // uploadImgToBase64()返回一个Promise对象，通过.then()获取其数据。其中data.result是图片转成的base64值
        this.uploadImgToBase64(file.raw).then((res) => {
          this.team.qrcode = res.result
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
    // 修改密码
    submitPW(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let result
          this.$axios.post('/apis/user/changepassword', {
            id: this.team_id,
            type: 1,// 团队
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

.qrcode-uploader {
  margin: 0 auto;
  border: 1px dashed #d9d9d9;
  border-radius: 0%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 150px;
  height: 150px;
  display: block;
}

.el-divider-wide {
  margin: 24px;
}

.teamInfo {
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