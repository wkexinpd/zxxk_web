<template>
<div class="app-container">
<!--  <div v-if="user">-->
    <el-row :gutter="20">
      <el-col :span="12" :xs="24">
        <el-card style="margin-bottom:20px;">
          <div slot="header" class="clearfix">
            <span>{{user.username}}</span>
          </div>
          <div class="user-profile">
            <div class="box-center">
              <img src="@/assets/avatar.gif" class="user-avatar">
            </div>
            <div class="box-center">
              <div class="user-name" v-if="role==1">账号：{{ user.userId }}</div>
              <div class="user-role text-muted" v-show="role==1">姓名：{{ user.username }}</div>
              <div class="user-role text-muted" v-show="role==1">手机号：{{ user.phone }}</div>
              <div class="user-role text-muted" v-show="role==1">邮箱：{{ user.email }}</div>
              <div class="user-role text-muted">
                修改密码：
                <el-input v-model="password" placeholder="修改密码" style="width: 300px;" class="filter-item" type="password"/>
              </div>
              <div class="user-role text-muted">
                确认密码：
                <el-input v-model="password1" placeholder="确认密码" style="width: 300px;" class="filter-item" type="password"/>
              </div>
              <div class="user-role text-muted">
                <el-button class="filter-item" style="margin-left: 5px;" type="primary" size="small" icon="el-icon-edit" @click="handleEdit">
                  确认修改
                </el-button>
              </div>
            </div>
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
    name: "profile",
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
