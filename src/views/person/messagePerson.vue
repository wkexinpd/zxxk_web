<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="className" placeholder="课程名" style="width: 160px;" class="filter-item" @keyup.enter.native="handleFilter" size="small"/>
      <el-select v-model="dept" placeholder="院系" clearable style=" margin-left: 3px;width: 110px" class="filter-item" size="small">
        <el-option v-for="item in typeOptionsDept" :key="item.id" :label="item.type" :value="item.id" />
      </el-select>
      <el-select v-model="grade" placeholder="年级" clearable style=" margin-left: 3px;width: 110px" class="filter-item" size="small">
        <el-option v-for="item in typeOptionsGrade" :key="item.id" :label="item.type" :value="item.id" />
      </el-select>
      <el-select v-model="class" placeholder="班级" clearable style=" margin-left: 3px;width: 110px" class="filter-item" size="small">
        <el-option v-for="item in typeOptionsClass" :key="item.id" :label="item.type" :value="item.id" />
      </el-select>
      <el-button v-waves class="filter-item" style="margin-left: 5px;" type="primary" size="small" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    </div>
      <el-table
        key="1"
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="学生学号" width="100px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.userId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="学生姓名" width="80px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所在院" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.dept }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所在年级" min-width="180px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.grade }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所在班级" width="130px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.class }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <el-button type="primary" size="mini" @click="handleUpdate(row)">
              编辑
            </el-button>
            <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="page" :limit.sync="limit" @pagination="getPersonList" />
      <el-dialog :title="dialogTitle[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form ref="dialogForm" :rule="dialogRules" :model="dialogForm" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
          <el-form-item label="学生学号" prop="userId">
            <el-input v-model="dialogForm.userId" />
          </el-form-item>
          <el-form-item label="学生姓名" prop="username">
            <el-input v-model="dialogForm.userName" />
          </el-form-item>
          <el-form-item label="学院" prop="dept">
            <el-input v-model="dialogForm.dept" />
          </el-form-item>
          <el-form-item label="年级" prop="grade">
            <el-input v-model="dialogForm.grade" />
          </el-form-item>
          <el-form-item label="班级" prop="grade">
            <el-input v-model="dialogForm.class" />
          </el-form-item>
          <el-form-item label="用户类型" prop="type">
            <el-select v-model="dialogForm.type" class="filter-item" placeholder="请选择">
              <el-option v-for="item in dialogTypeOptions" :key="item.id" :label="item.type" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="updateData()">
            确定
          </el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
  import waves from '@/directive/waves'
  import {getPersonList, updatePerson, deletePerson} from '@/api/person'
  import Pagination from '@/components/Pagination'
  export default {
    name: "addPerson",
    components: { Pagination },
    directives: { waves },
    data(){
      return {
        listQuery: {
          phone: undefined,
          typeId: undefined,
          startTime: undefined,
          endTime: undefined
        },
        page: 1,
        limit: 10,
        listLoading: true,
        list:null,
        typeOptionsDept: [{id:1,type:'软件学院'}, {id:2,type:'理学院'}, {id:3,type:'化学学院'}],
        typeOptionsGrade: [{id:1,type:'18级'}, {id:2,type:'19级'}, {id:3,type:'20级'}],
        typeOptionsClass: [{id:1,type:'A03班'}, {id:2,type:'A04班'}, {id:3,type:'A01班'}],
        total: 0,
        dialogFormVisible: false,
        dialogStatus:'',
        dialogTitle:{
          update: '编辑',
          add:'添加'
        },
        dialogRules: {
          username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
          type: [{ required: true, message: '请选择用户类型', trigger: 'change' }],
          phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
        },
        dialogForm: {
          userId:'',
          userName:'',
          grade:'',
          dept:'',
          class:''
        },
        dialogTypeOptions: [{id:1,type:'普通用户'}, {id:2,type:'会员'}, {id:3,type:'客服'},{id:4,type: '卖家'}]
      }
    },
    created() {
      this.getPersonList()
    },
    methods: {
      getPersonList(){
        this.listLoading = true
        let page = this.page
        let limit = this.limit
        getPersonList(this.listQuery,page,limit).then(response => {
          this.list = response.data.user
          this.total = response.data.total
          // console.log(this.total);
          setTimeout(() => {
            this.listLoading = false
          }, 0.5 * 1000)
        })
      },
      handleFilter(){
        this.page = 1
        this.getPersonList()
      },
      handleUpdate(row){
        // console.log(row);
        this.dialogForm = Object.assign({},row)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dialogForm'].clearValidate()
        })
      },
      handleDelete(row){
        deletePerson(row.id).then(response => {
          this.getPersonList()
          this.$notify({
            title: 'Success',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })

      },
      updateData(){
        this.$refs['dialogForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.dialogForm)
            console.log(tempData,this.dialogForm);
            updatePerson(tempData).then(() => {
              this.getPersonList()
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      }
    }
  }
</script>

<style>
  .el-dialog{
    display: flex;
    flex-direction: column;
    margin:0 !important;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    /*height:600px;*/
    max-height:calc(100% - 30px);
    max-width:calc(100% - 30px);
  }
  .el-dialog .el-dialog__body{
    flex:1;
    overflow: auto;
  }
</style>
