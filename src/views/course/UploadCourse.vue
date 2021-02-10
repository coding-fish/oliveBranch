<template>
  <div>
    <new-navigation></new-navigation>
    <div style="margin-left: 100px; margin-right: 100px; margin-top: 20px; margin-bottom: 20px">
      <div slot="content">
        <el-button type="text" icon="el-icon-back" @click="gotoBack">返回</el-button>
      </div>
      <el-card>
        <el-form ref="appForm" :model="appForm" :rules="appRules" >
          <el-form-item label="课程图片" prop="image">
            <el-upload
                class="upload-img"
                :style="{height: '200px', width: '300px', textAlign: 'center', backgroundImage:'url(' + appForm.image + ')', backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: 'contain'}"
                action
                ::limit="1"
                :show-file-list="false"
                :on-change="handleChange"
                :before-upload="beforeUpload"
                accept="image/png, image/gif, image/jpg, image/jpeg"
            >
              <i v-show="!appForm.image" class="el-icon-upload avatar-uploader-icon"/>
              <div v-show="!appForm.image" slot="tip" class="el-upload__text upload__tip">
                <div style="color: #4a5568">
                  上传照片(仅支持png、gif、jpg、jpeg格式),大小限制为5M
                </div>
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="课程名称" prop="name">
            <el-input v-model="appForm.name" placeholder="请输入课程名称"/>
          </el-form-item>
          <el-form-item label="授课教师" prop="teacher">
            <el-input v-model="appForm.teacher" placeholder="请输入授课教师"/>
          </el-form-item>
          <!--          <el-form-item label="分组" prop="group">-->
          <!--            <el-select v-model="appForm.group" placeholder="请选择分组" style="width:100%">-->
          <!--              <el-option-->
          <!--                  v-for="item in groupList"-->
          <!--                  :key="item.id"-->
          <!--                  :label="item.name"-->
          <!--                  :value="item.id"-->
          <!--              />-->
          <!--            </el-select>-->
          <!--          </el-form-item>-->
          <!--          <el-date-picker-->
          <!--              v-model="value6"-->
          <!--              @change="dateChangeBirthday1"-->
          <!--              type="datetimerange"-->
          <!--              format="yyyy-MM-dd-HH-mm-ss"-->
          <!--              value-format="yyyy-MM-dd-HH-mm-ss"-->
          <!--              start-placeholder="开始日期"-->
          <!--              end-placeholder="结束日期"-->
          <!--              :default-time="['12:00:00']"-->
          <!--          ></el-date-picker>-->
          <el-form-item label="开始时间" prop="startTime">
            <el-date-picker v-model="appForm.startTime" type="datetime" @change="testFun"
                            placeholder="选择时间"/>
          </el-form-item>
          <el-form-item label="截止时间" prop="endTime">
            <el-date-picker v-model="appForm.endTime" type="datetime" placeholder="选择时间"/>
          </el-form-item>
          <el-form-item label="课程链接" prop="link">
            <el-input v-model="appForm.link" placeholder="请输入课程链接(可以为空)"/>
          </el-form-item>
          <el-form-item label="课程描述" prop="description">
            <el-input v-model="appForm.description" placeholder="请输入详细描述(可拖拽右下角调节大小)" type="textarea" rows="5"/>
          </el-form-item>
          <el-button :loading="btnLoading" type="success" @click="uploadCourse">发布</el-button>
          <el-button :loading="btnLoading" type="danger" @click="resetForm">重置</el-button>
        </el-form>
      </el-card>
    </div>
    <new-bottom></new-bottom>
  </div>

</template>

<script>
import NewNavigation from "@/views/navigatorandsearch/NewNavigation";
import NewBottom from "@/views/navigatorandsearch/NewBottom";

export default {
  name: "UploadCourse",
  components: {NewBottom, NewNavigation},
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
    ip: {
      type: String,
      default: null,
    },
    dicTitle: {
      default: undefined,
      type: String,
    },
    data: {
      type: Object,
      default: () => undefined,
    },
  },
  data() {
    return {
      value6: '',
      btnLoading: false,
      appForm: {
        tid: 0,
        image: undefined,
        startTime: undefined,
        endTime: undefined,
        name: '',
        teacher: '',
        description: '',
        link: '',
        // type: "0",
        // state: "0",
        // status: "0",
      },
      appRules: {
        name: [{required: true, message: "请输入课程名称", trigger: "blur"}],
        image: [{required: true, message: "请选择图片", trigger: "blur"}],
        startTime: [{required: true, message: "请选择开始时间", trigger: "blur"}],
        endTime: [{required: true, message: "请选择截止时间", trigger: "blur"}],
      },
      groupList: [],
    };
  },
  mounted() {
    // this.getDic();
    this.init();
  },
  methods: {
    init() {
      if (this.$store.state.teamId !== 0) {
        this.appForm.tid = this.$store.state.teamId
      } else {
        this.$message.error('请先登录')
      }
    },
    // 后退主页
    gotoBack() {
      // this.$router.push('/Search')
      this.$router.back();
      // this.$router.go(-1);
    },
    onClose() {
      this.$emit("update:visible", false);
      // console.log(this.$refs.appForm);
      // if (!this.data) {
      this.$refs.appForm.resetFields();
      // }

      // if (this.data) this.appForm = this.data;
      // this.appForm.imageUrl = "";
    },
    // async getDic() {
    //   // to be implemented
    //   const {data, success, message} = await apiBaseGetDic();
    //   if (!success) {
    //     this.$message.warning(message);
    //     return;
    //   }
    //   this.groupList = data;
    // },
    // 修改日期格式
    formatDate(date) {
      Date.prototype.format = function (fmt) {
        let o = {
          "M+": this.getMonth() + 1,                 //月份
          "d+": this.getDate(),                    //日
          "h+": this.getHours(),                   //小时
          "m+": this.getMinutes(),                 //分
          "s+": this.getSeconds(),                 //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          "S": this.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (let k in o) {
          if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          }
        }
        return fmt;
      }
      //假设输入的时间格式为YYYY-MM-DDTHH-mm-SS.sss
      const s = String(date)
      s.replace(/(\+d{2})(\d{2})$/, "$1:$2")
      return new Date(s).format('yyyy-MM-dd hh:mm:ss')
    },
    // dateChangeBirthday1(val) {
    //   this.startTime = val;
    //   console.log(this.startTime);
    // },

    // 测试日期转换后的格式
    testFun() {
      console.log(this.formatDate(this.appForm.startTime));
    },
    // 上传课程
    async uploadCourse() {
      let result;
      // 转换为YYYY-MM-DD hh:mm:ss格式
      this.appForm.startTime = this.formatDate(this.appForm.startTime);
      this.appForm.endTime = this.formatDate(this.appForm.endTime);
      try {
        await this.$refs.appForm.validate();
      } catch (error) {
        return;
      }
      // 图标显示转圈效果
      this.btnLoading = true;
      // console.log(this.appForm)
      this.$axios.post('apis/course/uploadcourse', {
        tid: this.appForm.tid,
        name: this.appForm.name,
        teacher: this.appForm.teacher,
        description: this.appForm.description,
        link: this.appForm.link,
        startTime: this.appForm.startTime,
        endTime: this.appForm.endTime,
        image: this.appForm.image
      }).then(res => {
        // console.log(res.data)
        result = res.status
        if (result === 500) {
          this.$message({
            message: '服务器连接超时',
            type: 'error'
          })
        } else if (res.data.error_code !== 0) {
          // this.$alert('团队不存在', '上传失败', {
          //   confirmButtonText: '确定',
          // });
          this.$message.error(res.data.msg)
        } else {
          this.btnLoading = true;
          // this.$message.success("上传成功");
          // alert('上传成功')
          // 延时1s后返回上一个页面
          for (let t = Date.now(); Date.now() - t <= 1000;) ;
          this.$notify({
            title: '上传课程',
            message: '上传成功',
            type: 'success'
          });
          this.$router.back()
        }
      })
      this.btnLoading = false;
    },
    resetForm() {
      this.$refs.appForm.resetFields();
    },
    handleChange(file, fileList) {
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (isLt5M) {
        // uploadImgToBase64()返回一个Promise对象，通过.then()获取其数据。其中data.result是图片转成的base64值
        this.uploadImgToBase64(file.raw).then((data) => {
          this.appForm.image = data.result;
        });
      } else {
        this.$message.error("上传图片大小不能超过 5MB!");
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
  },
}

</script>

<style lang="scss" scoped>
input[type="file"] {
  display: none;
}

.avatar-uploader /deep/ .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader /deep/ .el-upload:hover {
  border-color: #0f72ca;
}

.avatar-uploader-icon {
  font-size: 36px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}

.avatar {
  width: 120px;
  height: 120px;
  display: block;
}

.add-keyperson-dialog .upload-img:hover {
  border-color: #0f72ca;
  color: #0f72ca;
}

.el-dialog__body {
  height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
}

/deep/ .el-form {
  width: 50%;
  margin: auto;
}

/deep/ .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}

/deep/ .el-form-item__label {
  font-size: 1rem;
  width: 100px;
}
</style>