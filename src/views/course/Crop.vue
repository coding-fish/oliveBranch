<template>
  <el-dialog
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :before-close="handleClose"
      custom-class="lzg-cropper"
      title="图片裁剪"
  >
    <div class="lzg-cropper-content">
      <div
          class="cropper"
          :style="{
          height: windowHeight+'px',
          width: windowWidth+'px'
        }"
      >
        <vueCropper
            v-if="isShowCropper"
            ref="cropper"
            :img="cropperImg"
            :output-size="option.size"
            :output-type="option.outputType"
            :info="true"
            :full="option.full"
            :can-move="option.canMove"
            :can-move-box="option.canMoveBox"
            :fixed-box="option.fixedBox"
            :original="option.original"
            :auto-crop="option.autoCrop"
            :auto-crop-width="option.autoCropWidth"
            :auto-crop-height="option.autoCropHeight"
            :center-box="option.centerBox"
            :high="option.high"
            :info-true="option.infoTrue"
            :enlarge="option.enlarge"
            :fixed="option.fixed"
            :fixed-number="option.fixedNumber"
            @realTime="realTime"
        />
      </div>
    </div>
    <span
        slot="footer"
        class="dialog-footer"
    >
      <el-button
          type="primary"
          @click="saveImg"
      >确认</el-button>
      <el-button
          type="info"
          @click="handleClose"
      >取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {VueCropper} from "vue-cropper";

export default {
  name: "Crop",
  components: {
    VueCropper
  },
  props: {
    fixedBox: {
      type: Boolean,
      default: false
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    imgType: {
      type: String,
      // default: "blob"
      default: "image"
    },
    cropperImg: {
      type: String,
      default: ""
    },
    autoCropWidth: {
      type: Number,
      // default: 320
      default: 500
    },
    autoCropHeight: {
      type: Number,
      // default: 180
      default: 300
    }
  },
  data() {
    return {
      previews: {},
      isShowCropper: true,
      option: {
        img: "", // 裁剪图片的地址
        size: 1, // 裁剪生成图片的质量
        full: true, // 是否输出原图比例的截图 默认false
        outputType: "png", // 裁剪生成图片的格式 默认jpg
        canMove: true, // 上传图片是否可以移动
        fixedBox: false, // 固定截图框大小 不允许改变
        original: true, // 上传图片按照原始比例渲染
        canMoveBox: true, // 截图框能否拖动
        autoCrop: true, // 是否默认生成截图框
        // 只有自动截图开启 宽度高度才生效
        // autoCropWidth: 320, // 默认生成截图框宽度
        // autoCropHeight: 180, // 默认生成截图框高度
        autoCropWidth: 500, // 默认生成截图框宽度
        autoCropHeight: 300, // 默认生成截图框高度
        centerBox: true, // 截图框是否被限制在图片里面
        high: false, // 是否按照设备的dpr 输出等比例图片
        enlarge: 1, // 图片根据截图框输出比例倍数
        mode: "contain", // 图片默认渲染方式
        maxImgSize: 2000, // 限制图片最大宽度和高度
        limitMinSize: [100, 120], // 更新裁剪框最小属性
        infoTrue: false, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        fixed: false, // 是否开启截图框宽高固定比例  (默认:true)
        fixedNumber: [16, 9] // 截图框的宽高比例
      },
      windowWidth: 900, //实时屏幕宽度
      windowHeight: 540 //实时屏幕高度
    };
  },
  watch: {
    autoCropWidth: {
      immediate: true,
      handler(newVal, oldVal) {
        this.option.autoCropWidth = newVal;
      },
      deep: true
    },
    autoCropHeight: {
      immediate: true,
      handler(newVal, oldVal) {
        this.option.autoCropHeight = newVal;
      },
      deep: true
    },
    fixedBox: {
      immediate: true,
      handler(newVal, oldVal) {
        this.option.fixedBox = newVal;
      },
      deep: true
    }

  },
  mounted() {
    // let that = this;
    this.getWindowSize();
    // <!--把window.onresize事件挂在到mounted函数上-->
    window.onresize = () => {
      return (() => {
        this.getWindowSize();
      })();
    };
  },
  methods: {
    getWindowSize() {
      this.isShowCropper = false;
      let divs = document.getElementsByClassName("el-dialog__body");
      if (divs && divs.length > 0) {
        this.windowHeight = divs[0].clientHeight - 20; // 高
        this.windowWidth = divs[0].clientWidth; // 宽
      } else {
        // this.windowHeight = 540; // 高
        this.windowHeight = 380; // 高
        this.windowWidth = 900; // 宽
      }
      this.$nextTick(() => {
        this.isShowCropper = true;
      })
    },
    // 裁剪时触发的方法，用于实时预览
    realTime(data) {
      this.previews = data;
    },
    // 重新上传
    uploadBth() {
      this.$emit("update-cropper");
    },
    // 取消关闭弹框
    handleClose() {
      this.$emit("close-dialog", false);
    },
    // 获取裁剪之后的图片，默认blob，也可以获取base64的图片
    saveImg() {
      if (this.imgType === "blob") {
        this.$refs.cropper.getCropBlob(data => {
          this.$emit("upload-img", data);
        });
      } else {
        this.$refs.cropper.getCropData(data => {
          this.uploadFile = data;
          this.$emit("upload-img", data);
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.lzg-cropper {
  width: 70%;
  top: 10%;
  right: 15%;
  bottom: 10%;
  left: 15%;
  transform: translate(0%, 0%);
}

.lzg-cropper .el-dialog__body {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: auto;
}

// 截图
.lzg-cropper-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

