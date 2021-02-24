<template>
  <div :class="$options.name">
    <el-upload
        ref="fileUpload"
        class="upload-el"
        accept="image/*"
        name="pic"
        :action="action"
        :data="uploadData"
        :on-change="selectChange"
        :show-file-list="false"
        :auto-upload="false"
    >
<!--        :http-request="httpRequest"-->
<!--        :with-credentials="true"-->
<!--        :headers="getHeader"-->
<!--    >-->
      <div
          class="upload-border"
          :style="{ height: imageHeight+'px', width: imageWidth+'px' }"
      >
        <img
            v-if="uploadFile"
            :style="{ height: imageHeight+'px', width: imageWidth+'px' }"
            :src="uploadFile"
            class="upload-border"
        >
        <i
            v-else
            class="el-icon-upload"
            :style="{ lineHeight: imageHeight+'px' }"
        />
      </div>
    </el-upload>
    <div>{{ "尺寸必须是"+autoCropWidth+"*"+autoCropHeight+"；jpeg/jpg/png格式；图片小于5M；" }}</div>
    <cropper
        v-show="showCropper"
        :dialog-visible="showCropper"
        :cropper-img="cropperImg"
        :fixed-box="fixedBox"
        :auto-crop-width="autoCropWidth"
        :auto-crop-height="autoCropHeight"
        @update-cropper="updateCropper"
        @close-dialog="closeDialog"
        @upload-img="uploadImg"
    />
  </div>
</template>

<script>
import Cropper from "./Crop.vue";
export default {
  name: "LzgUploadImg",
  components: {
    Cropper
  },
  model: {
    prop: "value", //这里使我们定义的v-model属性
    event: "input"
  },
  props: {
    value: String,
    autoCropWidth: {
      type: Number,
      // default: 320
      default: 500
    },
    autoCropHeight: {
      type: Number,
      // default: 180
      default: 300
    },
    fixedBox: {
      type: Boolean,
      default: false
    },
    showTip: {
      type: Boolean,
      default: true
    },
    imageWidth: {
      type: Number,
      // default: 320
      default: 500
    },
    imageHeight: {
      type: Number,
      // default: 180
      default: 300
    },
  },
  data() {
    return {
      uploadData: { // 上传需要的额外参数
        siteId: 1,
        source: 1,
        fileName: ""
      },
      action: this.$BASE_API + "/upload/imageUpload", // 上传地址，必填
      cropperImg: "", // 需要裁剪的图片
      showCropper: false, // 是否显示裁剪框
      uploadFile: "", // 裁剪后的文件
      resultImg: "" // 上传成功，后台返回的路径
    };
  },
  computed: {
    getHeader() {
      return { obtainTokenType: sessionStorage.getItem("identity") };
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(newVal, oldVal) {
        this.resultImg = newVal;
      },
      deep: true
    },
  },
  methods: {
    // submit 之后会触发此方法
    httpRequest(request) {
      //这里根据自己系统更改
      const { file, data } = request;
      let formData = new FormData();
      formData.append("file", this.uploadFile);
      // this.$http.post("upload/imageUpload", formData, {contentType: false, processData: false, headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
      //     .then(response => {
      //       const { data } = response || {};
      //       if (data.code === 200)  {
      //         this.$emit("input", data.url);
      //         this.closeDialog();
      //       } else {
      //         this.$message.error(data.message);
      //       }
      //     })
      //     ["catch"](ex => {});
    },
    // 选择文件
    selectChange(file) {
      const { raw, name } = file;
      this.openCropper(raw);
      this.uploadData.fileName = name;
    },
    /**
     * @param {file} 上传的文件
     */
    openCropper(file) {
      var files = file;
      let isLt5M = files.size > (5 << 20);
      if (isLt5M) {
        this.$message.error("上传图片大小不能超过5M!");
        return false;
      }
      var reader = new FileReader();
      reader.onload = e => {
        let data;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        this.cropperImg = data;
      };
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(files);
      this.showCropper = true;
    },
    // 上传图片
    uploadImg(file) {
      this.$message.success('图片上传成功')
      this.uploadFile = file;
      // this.$refs.fileUpload.submit();
      this.showCropper = false;
    },
    // 更新图片
    updateCropper() {
      this.$refs.fileUpload.$children[0].$el.click();
    },
    // 关闭窗口
    closeDialog() {
      this.showCropper = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.LzgUploadImg {
  .lzg-upload-border{
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    box-sizing: border-box;
  }
  .el-upload {
    display: block;
    width: 100px;
    margin: 30px auto 0;
  }

  .el-upload__tip {
    font-size: 14px;
    color: #606266;
    margin-top: 7px;
  }
  .el-icon-upload {
    font-size: 67px;
    color: #c0c4cc;
  }
  .video-image {
    display: flex;
    figure {
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
}
</style>

