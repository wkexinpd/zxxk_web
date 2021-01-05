<template>
  <div class="app-container">
    <!--  <div v-if="user">-->
    <el-row :gutter="20">
      <el-col :span="12" :xs="24">
        <el-card style="margin-bottom:20px;">
          <div slot="header" class="clearfix">
            <span>团队介绍</span>
          </div>
          <div class="user-profile">
            <h5>Hi！校友们~欢迎使用在现选课web端！</h5>
            <p>该项目是由我和我的两个同伴共同完成的在现选课小程序。这个项目主要为学生提供一个方便的选课平台，通过小程序便可完成选课任务。不用通过Url在电脑端进行选课。</p>
            <p>为了完成这个项目，我和我的小队友们可是费劲心思呀！</p>
            <p>张瑶：队长，该小程序的主要完成者,学生端后端完成</p>
            <p>王柯心：web老师端完成者,老师端后端完成</p>
            <p>齐思涵：web管理员端完成者,管理员后端完成</p>
            <p>欢迎使用在线选课web端٩(๑❛ᴗ❛๑)۶，更多功能敬请期待！</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!--  </div>-->
  </div>
</template>

<script>
  import {updatePassword} from '@/api/user'
  export default {
    name: "team",
    data() {
      return {
        role:JSON.parse(sessionStorage.getItem("role")),
        user: {},
        password: '',
        password1: ''
      }
    },
    computed: {
    },
    created() {
      this.getUser()
    },
    methods: {
      getUser() {
        this.user = {
          userId: JSON.parse(sessionStorage.getItem("userId")),
          username: JSON.parse(sessionStorage.getItem("username")),
          phone: JSON.parse(sessionStorage.getItem("phone")),
          email: JSON.parse(sessionStorage.getItem("email"))
        }
      },
      handleEdit(){
        if(this.password!==this.password1){
          this.$message({
            message: '请确保两次输入的密码一直',
            type: 'error'
          })
        }else{
          if(this.role===1){
            updatePassword({userId:JSON.parse(sessionStorage.getItem("userId")),password:this.password}).then(()=>{
              this.$message({
                message: '修改密码成功',
                type: 'success'
              })
            })
          }else{
            console.log(JSON.parse(sessionStorage.getItem("id")));
            updatePassword({userId:JSON.parse(sessionStorage.getItem("id")),password:this.password}).then(()=>{
              this.$message({
                message: '修改密码成功',
                type: 'success'
              })
            })
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .user-avatar{
    border-radius: 50%;
  }
  .box-center {
    /*margin: 0 auto;*/
    display: table;
  }

  .text-muted {
    color: #777;
  }

  .user-profile {
    .user-name {
      /*font-weight: bold;*/
      color: #777;
    }

    .box-center {
      padding-top: 10px;
    }

    .user-role {
      padding-top: 10px;
      font-weight: 400;
      font-size: 14px;
    }

    .box-social {
      padding-top: 30px;

      .el-table {
        border-top: 1px solid #dfe6ec;
      }
    }

    .user-follow {
      padding-top: 20px;
    }
  }

  .user-bio {
    margin-top: 20px;
    color: #606266;

    span {
      padding-left: 4px;
    }

    .user-bio-section {
      font-size: 14px;
      padding: 15px 0;

      .user-bio-section-header {
        border-bottom: 1px solid #dfe6ec;
        padding-bottom: 10px;
        margin-bottom: 10px;
        font-weight: bold;
      }
    }
  }
</style>
