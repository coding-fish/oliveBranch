<template>
    <el-container>
          <el-dialog
              title="私信"
              :visible.sync="dialogVisible3"
              width="30%"
              center>
        <el-input
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 4}"
                placeholder="请输入内容"
                v-model="sixin">
        </el-input>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible3= false;sixin=''">取 消</el-button>
    <el-button type="primary" @click="sendsixin(sixin)">确 定</el-button>
  </span>
      </el-dialog>
        <el-main>
            <div v-for="(item,index) in msgCollection" :key="index">
                <el-card class="box-card" style="margin-bottom: 20px">
                    <div class="text item" style="margin-left: 20px">
                        <p>{{ item.user }} 给你发了一条私信: </p>
                        {{item.message}}
                    </div>
                  <el-button type="primary" style="margin:10px; float: right" @click="dele(item.message_id)">
                        已阅
                    </el-button>    
                    <el-button type="primary" style="float: right;margin:10px;" @click="dialogVisible3=true;id=item.userid">回复</el-button>
                   
                </el-card>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    import NewNavigation from "../navigatorandsearch/NewNavigation";
    export default {
        name: 'reportedMsg',
        components: {
            NewNavigation,
        },
        data(){
            return{
                dialogVisible3:false,
                sixin:"",
                id:0,
                msgCollection:[
                ]
            }
        },
        mounted() {
            this.getPrivacyMsg()
        },
        methods: {
            getPrivacyMsg() {
                var that=this
                this.$axios({
                    url:'/apis/message/getimessage',
                    method:"post",
                }).then(res=>{
                    console.log(res);
                    that.msgCollection = res.data.data.msgCollection
                    that.privacyMsgNum = res.data.data.msgCollection.length
                })
            },
            dele(id){
                var that = this
                this.$axios.post('/apis/message/readimessage',
                    {
                        message_id: id
                    },).then(res=>{
                    console.log(res);
                    that.$router.go(0)
                })
            },
              sendsixin(text){
 this.$axios.post('/apis/message/sendimessage',
              {
                id:this.id,
                message:text
              },
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
        //        console.log(res);
                if(res.data.data.status==0){
                     this.$message({
          message: '发送私信成功',
          type: 'success'
        });
    
                }
                else{
                    this.$message({
          message: '发送私信失败',
          type: 'warning'
        });
                }
            })  
          this.sixin="";
          this.dialogVisible3 = false;
      },
        }
    }
</script>

<style scoped>
    body{
        background-image: url('../../assets/image/user/image/login-back.png');
    }
    .text {
        font-size: 14px;
    }

    .item {
        padding: 18px 0;
    }

    .box-card {
        width: 1200px;
    }
</style>