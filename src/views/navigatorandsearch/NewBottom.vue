<template>
  <div class="pad">
    <el-row style="height: 20px"></el-row>
    <el-row gutter="20" style="margin: 0px">
      <el-col span="3">
        <img class="bottomlogo" src="@/assets/logo2.jpg"/>
      </el-col>
      <el-col span="18">
        <div style="text-align: center; color: white; margin-top: 10px">
          <span>
            可以扫描右侧二维码关注我们<br/>
            若本站收录内容无意侵犯了您的版权，请向下面的邮箱来信，我们会及时处理和回复，谢谢合作<br/>
            Email: 601343748@qq.com<br/>
            Email:  hgtttttt@qq.com<br/>
          </span>
          <span><br></span>
          <span>©2021 橄榄支实践队</span>
        </div>
      </el-col>
      <el-col span="1"></el-col>
      <el-col style="float: right" span="2">
        <span><br></span>
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
.bottomlogo {
  height: 130px;
}

.pad {
  min-height: 100px;
  background-color: #0f72ca;
  text-color: #FFFFFF;
  padding: 0;
}
</style>