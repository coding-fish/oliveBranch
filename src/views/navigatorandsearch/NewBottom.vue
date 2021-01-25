<template>
  <div>
    <el-menu
        :default-active="ac"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#005bac"
        text-color="#FFFFFF"
        active-text-color="#f9ae8f"
    >
      <div style="float: left">
        <img  class="navigationlogo" src="../../assets/logoT02-white.png" height="60" width="160"/>
      </div>
      <el-menu-item style="display: block;float: bottom">
        <el-popover
            placement="top-start"
            width="180"
            height="180"
            trigger="hover"
            style="margin-left: 0px; ">
          <div style="height: 50px;margin-bottom: 100px">
            <img src="../../assets/image/user/image/qcode.jpg" height="150px" width="150px"/>
          </div>
          <img src="../../assets/image/user/image/vx.png" slot="reference"
               height="50px" width="50px"/>
<!--          <el-button  type="warning" class="el-icon-user"-->
<!--                     style="border-color: #00feae;-->
<!--                     background-color: #00feae;-->
<!--                     border-radius: 50px"></el-button>-->
        </el-popover>
      </el-menu-item>
    </el-menu>
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
</style>