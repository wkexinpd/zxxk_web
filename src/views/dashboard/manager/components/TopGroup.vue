<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('person')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            老师人数
          </div>
          <div class="card-panel-num">{{countTeacher}}</div>
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('goods')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <i class="card-panel-icon el-icon-s-management"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            课程数量
          </div>
          <div class="card-panel-num">{{countClass}}</div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import {countIndex} from '@/api/user'
  export default {
    name: "TopGroup",
    data(){
      return {
        countTeacher:0,
        countClass:0
      }
    },
    created() {
      this.countIndex()
    },
    methods: {
      handleSetLineChartData(type){
        this.$emit('handleSetLineChartData', type)
      },
      countIndex(){
        countIndex().then((res)=>{
          // console.log(res);
          this.countTeacher = res.data.countTeacher
          this.countClass = res.data.countClass
        })
      }

    }
  }
</script>

<style lang="scss" scoped>
  .panel-group {
    margin-top: 18px;

    .card-panel-col {
      margin-bottom: 32px;
    }

    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);

      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }

        .icon-people {
          background: #40c9c6;
        }

        .icon-money {
          background: #f4516c;
        }

        .icon-shopping {
          background: #36a3f7
        }
      }

      .icon-people {
        color: #40c9c6;
      }

      .icon-money {
        color: #f4516c;
      }

      .icon-shopping {
        color: #36a3f7
      }

      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }

      .card-panel-icon {
        float: left;
        font-size: 48px;
      }

      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;

        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }

        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }

  @media (max-width:550px) {
    .card-panel-description {
      display: none;
    }

    .card-panel-icon-wrapper {
      float: none !important;
      width: 100%;
      height: 100%;
      margin: 0 !important;

      .svg-icon {
        display: block;
        margin: 14px auto !important;
        float: none !important;
      }
    }
  }
</style>
