<template>
<div class="app-container">
  <div v-if="user">
    <el-row :gutter="20">
      <el-col :span="12" :xs="24">
        <el-card style="margin-bottom:20px;">
          <div slot="header" class="clearfix">
            <span>{{user.userName}}</span>
          </div>
          <div class="user-profile">
            <div class="box-center">
              <img src="@/assets/avatar.gif" class="user-avatar">
<!--              <div>Hello</div>-->
<!--              {{ user.type }}-->
            </div>
            <div class="box-center">
              <div class="user-name">工号：{{ user.userId }}</div>
              <div class="user-role text-muted">姓名：{{ user.userName }}</div>
              <div class="user-role text-muted">手机号：{{ user.phone }}</div>
              <div class="user-role text-muted">邮箱：{{ user.email }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: "profile",
    data() {
      return {
        user: {}
      }
    },
    computed: {
      ...mapGetters([
        'username',
        'phone',
        'type',
        'sex'
      ])
    },
    created() {
      this.getUser()
    },
    methods: {
      getUser() {
        console.log(this.username);
        this.user = {
          username: this.username,
          phone: this.phone,
          type: this.type,
          sex: this.sex
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
