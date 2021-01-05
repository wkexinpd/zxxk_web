<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" size="small" icon="el-icon-edit" @click="dialogFormVisible=true">
        添加学生
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
      <el-table-column type="index"></el-table-column>
      <el-table-column label="学生学号" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学生姓名" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="系别" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.dept }}</span>
        </template>
      </el-table-column>
      <el-table-column label="年级" width="130px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.grade }}</span>
        </template>
      </el-table-column>
      <el-table-column label="班级" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sclass }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入学日期" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.startyear }}</span>
        </template>
      </el-table-column>
      <el-table-column label="毕业日期" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.endyear }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-popconfirm
            title="这是该选课学生确定删除吗？"
            @onConfirm="handleDelete(row)"
            style="padding-left: 5px;"
          >
            <el-button slot="reference" size="mini" type="danger">
              删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="page" :limit.sync="limit" @pagination="getPersonList" />
      <el-dialog title="添加学生" :visible.sync="dialogFormVisible">
        <el-form ref="dialogForm" :rule="dialogRules" :model="dialogForm" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
          <el-form-item label="学生学号" prop="userId">
            <el-input v-model="dialogForm.userId" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="addData()">
            确定
          </el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
  import waves from '@/directive/waves'
  import {getPersonList, selectOne, deleteSelect} from '@/api/person'
  import Pagination from '@/components/Pagination'
  export default {
    name: "addPerson",
    components: { Pagination },
    directives: { waves },
    data(){
      return {
        classid: this.$route.query.classid,
        page: 1,
        limit: 10,
        listLoading: true,
        list:null,
        total: 0,
        dialogFormVisible: false,
        dialogRules: {
          userId: [{ required: true, message: '请输入学生学号', trigger: 'blur' }]
        },
        dialogForm: {
          userId:''
        }
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
        getPersonList(this.classid).then(response => {
          if(response.status!==10){
            this.list = response.data.list
            this.total = response.data.total
          }
          setTimeout(() => {
            this.listLoading = false
          }, 0.5 * 1000)
        })
      },
      handleDelete(row){
        deleteSelect({classId:this.classid,userId:row.userId}).then(response => {
          this.getPersonList(this.classid)
          this.$notify({
            title: 'Success',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })

      },
      addData(){
        this.$refs['dialogForm'].validate((valid) => {
          if (valid) {
            selectOne({classId:this.classid,userId:this.dialogForm.userId}).then(()=>{
              this.dialogFormVisible = false
              this.getPersonList()
              this.$message({
                message: '添加成功',
                type: 'success'
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
