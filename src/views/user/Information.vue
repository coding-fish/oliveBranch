
                              
<template>
    <div>
<!--        <div>-->
<!--            // <new-navigation></new-navigation>-->
<!--        </div>-->
        <div class="information">
            <el-card class="info" style="padding-top:20px; text-align:center">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-row>
                            <!-- <img v-show="hasAvatar" class="avatar-img" :src="formLabelAlign.avatar"> -->
                            <el-upload
                              action="/apis/personality/change_avatar"
                              class="avatar-uploader avatar-img"
                              :show-file-list="false"
                              :on-success="handleAvatarSuccess"
                              :before-upload="beforeAvatarUpload"
                              :http-request="uploadAvatar">
                              <el-image v-if="imageUrl" :src="imageUrl" class="avatar" alt="fail to load" fit="cover"></el-image>
                              <i v-if="!imageUrl" class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-row>
                        <el-row v-if="imageUrl" style="margin-top:15px;font-size:15px;color:#303133">
                            (点击头像进行更换)
                        </el-row>
                        <el-row>
                            <el-button type="primary" style="margin-top:30px" @click="toSpace()">进入主页 <i class="el-icon-right"></i></el-button>
                        </el-row>
                        <el-row>
                            <el-button type="primary" style="margin-top:30px" @click="toAuthor()">进入门户 <i class="el-icon-right"></i></el-button>
                        </el-row>
                    </el-col>
                    <el-col :span="18">
                        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" style="text-align:left;margin-bottom:24px">
                            <el-form-item label="用户名">{{formLabelAlign.name}}
                                <!-- <el-input v-model="formLabelAlign.name"></el-input> -->
                            </el-form-item>
                            <el-form-item label="邮箱">{{formLabelAlign.email}}
                                <!-- <el-input v-model="formLabelAlign.email"></el-input> -->
                            </el-form-item>
                            <el-form-item label="手机号">
                                <el-input v-model="formLabelAlign.phone"></el-input>
                            </el-form-item>
                            <el-form-item label="性别">
                                <el-radio-group v-model="formLabelAlign.gender">
                                    <el-radio label="男"></el-radio>
                                    <el-radio label="女"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="所属机构">
                                <el-input v-model="formLabelAlign.inst"></el-input>
                            </el-form-item>
                            <el-form-item label="头衔">
                                <el-input v-model="formLabelAlign.title"></el-input>
                            </el-form-item>
                            <el-form-item label="个人简介">
                                <el-input v-model="formLabelAlign.bio"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="updateInfo()">更新信息</el-button>
                            </el-form-item>
                        </el-form>
                        <el-divider></el-divider>
                        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" :label-position="labelPosition" label-width="80px" style="text-align:left;margin-top:24px">
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
                                <el-button type="primary" @click="submitPW('ruleForm')">更新密码</el-button>
                                <el-button @click="resetForm('ruleForm')">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </el-card>
        </div>
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
          <span>您并未认领门户，是否前往认领界面？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="toClaim">确 定</el-button>
          </span>
        </el-dialog>
    </div>

</template>

<script>
import NewNavigation from "../navigatorandsearch/NewNavigation";
import CollectedVue from './Collected.vue';

export default {
  name: 'Information',
  components: {
    NewNavigation,
  },
  data() {
    var validateOldPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入旧密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      labelPosition: 'right',
      dialogVisible: false,
      imageUrl:'',
      user_id:0,
      author_id:'',
      formLabelAlign: {
        name: '',
        email: '',
        gender: '',
        inst:'',
        title:'',
        phone: '',
        bio: '',
        birthday: '',
        addr: '',
        // avatar:require('../../assets/image/user/image/avatar.jpg'),
      },
      ruleForm: {
        pass: '',
        checkPass: '',
        oldPass: '',
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        oldPass: [
          { validator: validateOldPass, trigger: 'blur' }
        ],
      },
      is_author:0,
      author_id:0,
      is_admin:0,
    };
  },
  created(){
    this.init()
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    submitPW(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let result
          this.$axios.post('/apis/user/modifypassword', {
            oldpassword: this.ruleForm.oldPass,
            newpassword: this.ruleForm.pass,
            newpassword2: this.ruleForm.pass,
          }).then(res => {
            result = res.data.status
            if(result !== 0){
              this.$alert(res.data.message, '更改密码失败', {
                confirmButtonText: '确定',
              });
            }
            else{
              this.$alert("修改成功", '更改密码成功', {
                confirmButtonText: '确定',
              });
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    init() {
      let result
      this.$axios.post('/apis/personality/get', {
      }).then(res => {
        result = res.data.status
        console.log(res);
        if(result !== 0){
          this.$alert('网络请求错误', '加载失败', {
            confirmButtonText: '确定',
          });
        }
        else{
          this.imageUrl=res.data.avatar
          this.formLabelAlign.name=res.data.username
          this.formLabelAlign.email=res.data.email
          this.formLabelAlign.inst=res.data.org
          this.formLabelAlign.gender=res.data.gender
          this.formLabelAlign.title=res.data.postion
          this.formLabelAlign.phone=res.data.phone
          this.formLabelAlign.bio=res.data.bio
          this.is_author=res.data.is_associated
          this.author_id=res.data.author_id
          this.user_id=res.data.userid
          this.formLabelAlign.birthday=res.data.birthday
          this.formLabelAlign.addr=res.data.addr
          this.is_admin=res.data.is_admin
        }
      })
    },
    updateInfo() {
      let result
      // console.log(this.formLabelAlign)
      this.$axios.post('/apis/user/getstatus',{
      }).then(res => {
        // console.log(res)
      });
      this.$axios.post('/apis/personality/change', {
        phone: this.formLabelAlign.phone,
        bio: this.formLabelAlign.bio,
        userid: this.user_id,
        birthday: this.formLabelAlign.birthday,
        address: this.formLabelAlign.addr,
        org: this.formLabelAlign.inst,
        position: this.formLabelAlign.title,
        gender: this.formLabelAlign.gender,
        is_administrator: this.is_admin,
        is_associated: this.is_associated,
        author_id: this.author_id
      }).then(res => {
        // console.log(this.formLabelAlign)
        result = res.data.status
        // console.log(res)
        if(result !== 0){
          this.$alert('网络请求错误', '更新失败', {
            confirmButtonText: '确定',
          });
        }
        else{
          this.$notify({
            title: '更新个人信息',
            message: '更新个人信息成功',
            type: 'success'
          });
        }
      })
    },
    uploadAvatar(params) {
      var fileObj = params.file
      var formData = new FormData()
      formData.append('avatar', fileObj)
      this.$axios.post('/apis/personality/change_avatar',
        formData
      ).then(res => {
        // console.log(res)
        if(res.data.status != 0){
          this.$notify.error({
            title: '提示',
            message: '上传头像失败',
          });
        }else{
          this.$notify({
            title: '提示',
            message: '上传头像成功',
            type: 'success'
          });
        }
        
      })
      this.imageUrl = window.URL.createObjectURL(params.file)
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    toAuthor() {
      this.$axios.post('/apis/user/get_authorid_by_userid',{
        userid:this.user_id
      }).then(res => {
        console.log(res)
        this.author_id = res.data.authorid
        if(this.author_id == ''){
          this.dialogVisible=true
        }else{
          this.$router.push({
            path:'/author',
            query:{
              author_id:this.author_id,
            }
          })
        }
      })
    },
    toSpace() {
      this.$router.push('/userinfo/'+this.user_id)
    },
    toClaim() {
      this.$router.push('/authoritem');
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
      .then(_ => {
        done();
      })
      .catch(_ => {

      });
    },
    
  }
}
</script>

<style>
.avatar-uploader {
  margin:0 auto;
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
.el-divider-wide{
  margin:24px,0px;
}
.personInfo{
    margin-right: 3%;
    margin-bottom: 1%;
}
.el-form{
    margin-right: 100px;
}
.personPage{
    margin-top: 30px;
}
.avatar-img{
  height:150px;
  width:150px;
  border-radius:75px;
}
</style>