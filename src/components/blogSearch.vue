<template>
     <div style="height:100px"> 
        <div class="search d1">
	<div class="c" id="dd">
       
		  <el-input type="text"  v-model="search"  placeholder="搜索从这里开始..." style="border-radius:0 42px 42px 0" id="searchInput1">
      
     <el-select v-model="value" slot="prepend" placeholder="请选择" style="width: 140px" @change="ch">
                            <el-option
                                    v-for="item in chose"
                                    :key="item"
                                    :label="item.name"
                                    :value="item.type">
                                {{item.name}}
                            </el-option>
     </el-select>
		
      </el-input> 
       <button   @click="searchItem()" style="border-radius:0 50% 50% 0">
             <svg class="icon" aria-hidden="true" style="color:white;font-size:25px;margin-left:8px">
  <use xlink:href="#icon-sousuo"></use>
</svg>

      </button>
	</div>
		</div>
    </div>
</template>
<script>
export default {
  name: "BlogSearch",
  data(){
      return{
      search:"",
        chose:[{name:"全部",type:0},{name:"Python",type:1},{name:"Java",type:2},
          {name:"前端",type:3},{name:"架构",type:4},{name:"区块链",type:5},
          {name:"数据库",type:6},{name:"5G",type:7},{name:"游戏开发",type:8},
          {name:"移动开发",type:9},{name:"运维",type:10},{name:"安全",type:11},
          {name:"研发管理",type:12},{name:"物联网",type:13},
          {name:"生物",type:14},{name:"物理",type:15},{name:"党政",type:16},
          {name:"农林",type:17},{name:"建筑",type:18},{name:"制造",type:19},
          {name:"教育",type:20},{name:"党政",type:21},{name:"能源",type:22},
          {name:"卫生",type:23},{name:"航空",type:24},{name:"金融",type:25},
          {name:"商贸",type:26},{name:"会计",type:27},{name:"国防",type:28},
          {name:"体育",type:29},{name:"电子",type:30},{name:"创业",type:31},
          {name:"其他",type:32},],
       type:0,
       value:"全部"
      }
  },

  mounted(){

  },
  methods:{
      searchItem(){
        if(this.search=="")
        alert("搜索关键词不可为空")
        else{
           this.$router.push({path:"/BlogSearchItems/"+this.type+"/"+this.search})
        this.$parent.search(this.type);
        }
      
      },
      ch(i){
        this.type=i
      }
  }
}
</script>
<style lang="scss" scoped>
#dd{
    /deep/ .el-input-group__prepend{
        background-color:#FFF;
        border:2px solid #df5747;
        box-shadow: 0 1px 4px 0 rgba(0,0,0,.2);
        border-right-width: 0;
    }
    /deep/ .el-input-group>.el-input__inner{
        border:2px solid #df5747;
        box-shadow: 0 1px 4px 0 rgba(0,0,0,.2);
        border-right-width: 0;
        border-left-width: 0;
    }
    /deep/ .el-input-group__append{
        background-color:#FFF;
        border:2px solid #df5747;
        box-shadow: 0 1px 4px 0 rgba(0,0,0,.2);
        border-left-width: 0;
    }
}
  body{
          background-image: url('../assets/image/user/image/login-back.png');
    }
</style>