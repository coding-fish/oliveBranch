<template>
  <div class="pad">
    <el-row style="height: 20px"></el-row>
    <el-row gutter="20" style="margin: 0px">
      <el-col span="3" style="padding: 0px">
        <img class="navigationlogo" src="@/assets/logo2.jpg"/>
      </el-col>
      <el-col span="18">
        <div style="text-align: center; color: white; margin-top: 10px">
          <span>可以扫描右侧二维码关注我们<br>如果网站内容侵犯了您的权益，也可以联系我们<br></span>
          <span>©2021 橄榄支实践队</span>
        </div>
      </el-col>
      <el-col style="float: right" span="2">
        <el-popover
            placement="bottom"
            width="180"
            height="180"
            trigger="hover">
          <div style="height: 50px;margin-bottom: 100px">
            <img src="../../assets/image/user/image/qcode.jpg" height="150px" width="150px"/>
          </div>
          <img src="../../assets/image/user/image/vx.png" slot="reference"
               height="50px" width="50px"/>
        </el-popover>
      </el-col>
    </el-row>
    <el-row style="height: 20px"></el-row>
  </div>
</template>

<script>
export default {
  name: "NewBottom",
  props: {
    ac: {
      type: String,
      default: "1"
    }
  },
}
</script>

<style scoped>
.navigationlogo {
  height: 60px;
}

.pad {
  min-height: 100px;
  background-color: #0f72ca;
  text-color: #FFFFFF;
  padding: 0;
}
</style>