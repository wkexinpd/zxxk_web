<template>
  <div id="student-lecture">
    <div class="filter-container">
      <el-input v-model="listQuery.className" placeholder="课程名" style="width: 160px;" class="filter-item" @keyup.enter.native="handleQuery" size="small"/>
      <el-input v-model="listQuery.classTeacher" placeholder="老师姓名" style="width: 160px;" class="filter-item" @keyup.enter.native="handleQuery" size="small" v-show="role===0"/>
      <el-button class="filter-item" style="margin-left: 5px;" type="primary" size="small" icon="el-icon-search" @click="handleQuery">
        查找
      </el-button>
      <el-button class="filter-item" type="primary" size="small" icon="el-icon-edit" @click="addLecture">
        发布课程
      </el-button>
    </div>
    <div>
      <el-row :gutter="20">
        <el-col
          :xs="24"
          :sm="8"
          :md="6"
          v-for="lecture in lectureData.records"
          :key="lecture.classid"
        >
          <el-card
            shadow="hover"
            :body-style="{ padding: '10px', marginTop: '10px' }"
            style="margin-bottom:20px;"
          >
            <img
              :src="lecture.image"
              style="width:100%;height:160px;background:#efefef;"
              v-if="role===0"
            />
            <img
              v-else
              :src="lecture.image"
              style="width:100%;height:160px;background:#efefef;"
              @click="goPerson(lecture.classid)"
            />
            <div style="font-size: 12px;">
              <p style="font-size: 14px;" class="overflow-text">
                <i class="el-icon-tickets"></i>
                {{ lecture.classname }}
              </p>
              <p class="overflow-text">
                <i class="el-icon-user"></i>
                {{ lecture.classteacher }}
              </p>
              <p class="overflow-text">
                <i class="el-icon-date"></i>
                {{ lecture.classweek}}-
                {{ lecture.classhours}}
              </p>
              <p class="overflow-text">
                学分：
                {{ lecture.classcredit }}
              </p>
              <p class="overflow-text">
                地点：
                {{ lecture.classaddress }}
              </p>
              <p class="overflow-text">
                最大人数：
                {{ lecture.classpeople }}
              </p>
              <p class="overflow-text">
                已报人数：
                {{ lecture.peopleNum }}
              </p>
              <div class="choose-lecture-btn">
                <el-button
                  type="primary"
                  size="mini"
                  @click="editLecture(lecture.classid)"
                >
                  编辑
                </el-button>
                <el-button
                  type="danger"
                  size="mini"
                  @click="deleteLecture(lecture.classid)"
                >
                  删除
                </el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <pagination v-show="total>0" :total="total" :page.sync="page" :limit.sync="limit" @pagination="getLectures" />
    </div>
    <el-dialog title="添加课程" :visible.sync="dialogFormVisible">
      <el-form ref="dialogForm" :rule="dialogRules" :model="dialogForm" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="课程名" prop="className">
          <el-input v-model="dialogForm.classname" />
        </el-form-item>
        <el-form-item label="老师姓名" prop="classTeacher">
          <el-input v-model="dialogForm.classteacher" />
        </el-form-item>
        <el-form-item label="可选人数" prop="classPeople">
          <el-input v-model="dialogForm.classpeople" />
        </el-form-item>
        <el-form-item label="起始时间" prop="classWeek">
          <el-input v-model="dialogForm.classweek" />
        </el-form-item>
        <el-form-item label="开始周" prop="startTime">
          <el-input v-model="dialogForm.starttime" />
        </el-form-item>
        <el-form-item label="开始时间" prop="classHours">
          <el-input v-model="dialogForm.classhours" />
        </el-form-item>
        <el-form-item label="上课地点" prop="classAddress">
          <el-input v-model="dialogForm.classaddress" />
        </el-form-item>
        <el-form-item label="学分" prop="classCredit">
          <el-input v-model="dialogForm.classcredit" />
        </el-form-item>
        <el-form-item label="商品展示" prop="image">
          <el-upload
            class="avatar-uploader"
            :before-upload="beforeUpload"
            action="/upload"
            multiple
            :show-file-list="false"
            :on-success="handlePictureCardPreview">
            <img v-if="dialogForm.image" :src="dialogForm.image" class="avatar"/>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="createData()">
          添加课程
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑课程" :visible.sync="dialogFormVisible1">
      <el-form ref="dialogForm1" :model="dialogForm1" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="课程名" prop="className">
          <el-input v-model="dialogForm1.classname"  :disabled="true"/>
        </el-form-item>
        <el-form-item label="老师姓名" prop="classTeacher" >
          <el-input v-model="dialogForm1.classteacher" :disabled="true"/>
        </el-form-item>
        <el-form-item label="可选人数" prop="classPeople">
          <el-input v-model="dialogForm1.classpeople" />
        </el-form-item>
        <el-form-item label="起始时间" prop="classWeek">
          <el-input v-model="dialogForm1.classweek" />
        </el-form-item>
        <el-form-item label="开始周" prop="startTime">
          <el-input v-model="dialogForm1.starttime" />
        </el-form-item>
        <el-form-item label="开始时间" prop="classHours">
          <el-input v-model="dialogForm1.classhours" />
        </el-form-item>
        <el-form-item label="上课地点" prop="classAddress">
          <el-input v-model="dialogForm1.classaddress" />
        </el-form-item>
        <el-form-item label="学分" prop="classCredit">
          <el-input v-model="dialogForm1.classcredit" />
        </el-form-item>
        <el-form-item label="商品展示" prop="image">
          <el-upload
            class="avatar-uploader"
            :before-upload="beforeUpload"
            action="/upload"
            multiple
            :show-file-list="false"
            :on-success="handlePictureCardPreview1">
            <img v-if="dialogForm1.image" :src="dialogForm1.image" class="avatar"/>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateData()">
          编辑课程
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {curriculaList,deleteCurricula,addCurricula,showClass,updateClass,findClassByContent} from '@/api/curricula'
  import Pagination from '@/components/Pagination'
  export default {
    name: 'StudentLectureList',
    components: { Pagination },
    data() {
      return {
        total:0,
        page: 1,
        limit: 10,
        role:JSON.parse(sessionStorage.getItem('role')),
        listQuery: {
          className: undefined,
          classTeacher: undefined
        },
        lectureRequestParam: {
          from: 1,
          limit: 8
        },
        lectureData: {
          records: []
        },
        className: undefined,
        classTeacher: undefined,
        dialogFormVisible:false,
        dialogFormVisible1:false,
        dialogRules: {
          className: [{ required: true, message: '请输入课程名', trigger: 'blur' }],
          classTeacher: [{ required: true, message: '请输入老师姓名', trigger: 'blur' }]
        },
        dialogForm: {
          classname:'',
          classteacher: '',
          classpeople: 0,
          classweek: '',
          starttime:'',
          classhours:'',
          classcredit:0,
          classaddress:'',
          image:''
        },
        dialogForm1: {
          classId: '',
          classname:'',
          classteacher: '',
          classpeople: 0,
          classweek: '',
          starttime:'',
          classhours:'',
          classcredit:0,
          classaddress:'',
          image:''
        },
      }
    },
    created() {
      this.getLectures(null,null,null,null);
    },
    computed: {},
    methods: {
      handleCurrentChange(toPage) {
        this.lectureRequestParam.from = toPage
        this.getLectures()
      },
      getLectures(className,classTeacher,page,limit) {
        findClassByContent(className,classTeacher,page,limit).then(response=>{
          // console.log(response);
          let data = response.data
          this.total = data.total
          // console.log(this.total);
          this.lectureData.records = data.list
        })
      },
      handleQuery(){
        this.page = 1
        this.getLectures(this.listQuery.className,this.listQuery.classTeacher,this.page,this.limit)
      },
      addLecture(){
        this.dialogForm = {
          classname:'',
          classteacher: '',
          classpeople: 0,
          classweek: '',
          starttime:'',
          classhours:'',
          classcredit:0,
          classaddress:'',
          image:''
        }
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dialogForm'].clearValidate()
        })
      },
      editLecture(id){
        showClass(id).then((res)=>{
          // console.log(res);
          this.dialogForm1 = res.data
        })
        this.dialogFormVisible1 = true
        this.$nextTick(() => {
          this.$refs['dialogForm1'].clearValidate()
        })
      },
      deleteLecture(classId){
        deleteCurricula(classId=classId).then(()=>{
          this.$message({
            message: '删除商品成功',
            type: 'success'
          })
          this.getLectures()
        })
      },
      handlePictureCardPreview(res){
        this.dialogForm.image = res;
      },
      handlePictureCardPreview1(res){
        this.dialogForm1.image = res
      },
      beforeUpload(file){
        this.$instance({
          method: "post",
          url: "/upload",
          data: file,
        }).then((res) => {
          console.log(res);
        });
      },
      createData(){
        this.$refs['dialogForm'].validate((valid) => {
          if (valid) {
            // console.log(this.dialogForm);
            addCurricula(this.dialogForm).then(response => {
              this.$message({
                message: '添加商品成功',
                type: 'success'
              })
              this.dialogFormVisible = false
              this.getLectures()
            })
          }
        })
      },
      updateData(){
        let obj = this.dialogForm1
        delete obj.classname
        delete obj.classteacher
        delete obj.peopleNum
        updateClass(obj).then(()=>{
          this.$message({
            message: '编辑课程成功',
            type: 'success'
          })
          this.dialogFormVisible1 = false
          this.getLectures()
        })
      },
      goPerson(classid){
        this.$router.push({path: `/person/messagePerson`,query: {classid:classid}})
      }
    },
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<style scoped>
  .overflow-text {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
