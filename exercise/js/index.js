 
var app=new Vue({
	el:'#app',
	data:{
		title:'学生信息管理',
    dialogTitle:'',
		studentData:null,
    dialogTitle:'',
    dialogFormVisible:false,
		activeIndex: '1',
    formInline:{},
    form:{},
    activeName: 'second',
		formInline: {
          user: '',
          region: ''
    },
     pickerOptions0: {
        
        },
       
        value1: '',
    // value:'form.birth',/*日期value值*/
    // class_id:'form.class_id',
    options:null
	},
	created:function(){
    var vm=this;
		$.getJSON('http://localhost:3000/student/findAll',function(data){
			vm.studentData=data;
		})
    $.getJSON('http://localhost:3000/clazz/findAll',function(data){
      vm.options=data;
      // console.log(111);
      // console.log(vm.options);
    })
	},
	methods: {
    dateFormat:function(row, column) {  
        var date = row[column.property];  
          if (date == undefined) {  
            return "";  
          }  
        return moment(date).format("YYYY-MM-DD");  
    },
    add(){
      alert(1);
    },
        goback(){
          var vm=this;
          $.getJSON('http://localhost:3000/student/findAll',function(data){
            // console.log(data);
            vm.studentData=data;
          })
        },
        dateChange(val) {
          this.form.birth=val;
        },
      	handleSelect(key, keyPath) {
      		console.log(key);
          // console.log(keyPath);
          if(key=='2-1'){
              $("#content2").slideDown(400);
              $("#content1").slideUp(400);
              $("#content3").slideUp(400);
              $("#content4").slideUp(400);
              console.log($('#content2'));
          }
          if(key=='1-1'){
              $("#content1").slideDown(400);
              $("#content2").slideUp(400);
              $("#content3").slideUp(400);
              $("#content4").slideUp(400);
              console.log($('#content2'));
          }
          if(key=='3-1'){
              $("#content3").slideDown(400);
              $("#content2").slideUp(400);
              $("#content1").slideUp(400);
              $("#content4").slideUp(400);
              console.log($('#content2'));
          }
           if(key=='4-1'){
              $("#content4").slideDown(400);
              $("#content2").slideUp(400);
              $("#content1").slideUp(400);
              $("#content3").slideUp(400);
              console.log($('#content2'));
          }
      	},
      	onQuery() {
          var vm=this;
        	console.log(this.formInline);
          $.getJSON('http://localhost:3000/student/findById',{
            id:this.formInline.id
          },function(data){
            // console.log(data);
            vm.studentData=data;
          })
      	},
      	handleEdit(index, row) {
       	 	// console.log(index, row);
          this.dialogTitle='修改学生信息';
          this.dialogFormVisible = true;
          this.form = row;
          // this.form.birth = this.form.birth.slice(0,10);
          console.log('修改');
          console.log(this.form);
      	},
      	handleDelete(index, row) {
        	console.log(index, row);
        	var vm=this;
        	this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
	          	confirmButtonText: '确定',
	          	cancelButtonText: '取消',
	          	type: 'warning'
       		}).then(() => {
       			$.post('http://localhost:3000/student/batchDelete',{
       	 			ids:JSON.stringify([row.id])
       			},function(data){
       	 			$.getJSON('http://localhost:3000/student/findAll',function(data){
						    console.log(data);
						    vm.studentData=data;
						    vm.$message({
            				type: 'success',
            				message: '删除成功!'
          			});
					   })
       	 	})
        	}).catch(() => {
          		this.$message({
            		type: 'info',
            		message: '已取消删除'
          		});          
        	});
      	},
        toSave:function(){
          this.dialogTitle='录入学生信息';
          this.dialogFormVisible = true;
          this.form = { gender:'女',birth:'',class_id:''};
        },
        submit:function(){

          var url;
          if(this.dialogTitle=='录入学生信息'){
            url = 'http://127.0.0.1:3000/student/save';
          }else{
            url = 'http://127.0.0.1:3000/student/update';
            this.form.birth=this.form.birth.slice(0,10);
          }
          if(!this.form.class_id){
            this.form.class_id = 1
          }
          var vm = this;
          console.log('提交');
          console.log(this.form);
          console.log(url);
          $.post(url,this.form,function(data){
            vm.dialogFormVisible = false;
            if(data.code){
              vm.$message({
                  type: 'success',
                  message: '操作失败，失败代号!'+data.code
              })
            }else {
              //删除成功后更新数据
              vm.$message({
                  type: 'success',
                  message: '操作成功!'
              });
            }
            $.getJSON('http://127.0.0.1:3000/student/findAll',function(data){
                vm.studentData = data;
            })
          });
        },
   	}
});

var app=new Vue({
  el:'#app2',
  data:{
    title:'学生信息管理',
    dialogTitle:'',
    courseData:null,
    dialogTitle:'',
    dialogFormVisible:false,
    activeIndex: '1',
    formInline:{},
    form:{},
    activeName: 'second',
    formInline: {
          user: '',
          region: ''
    }
  },
  created:function(){
     var vm=this;
    $.getJSON('http://localhost:3000/course/findAll',function(data){
      // console.log(data);
      vm.courseData=data;
    })
  },
  methods: {
  add(){
    alert(1);
  },
        goback(){
          var vm=this;
          $.getJSON('http://localhost:3000/course/findAll',function(data){
            console.log(data);
            vm.courseData=data;
          })
        },
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
          // $("#content2").hide(500);
        },
        onQuery() {
          var vm=this;
          console.log(this.formInline);
          $.getJSON('http://localhost:3000/course/findById',{
            id:this.formInline.id
          },function(data){
            // console.log(data);
            vm.courseData=data;
          })
        },
        handleEdit(index, row) {
          // console.log(index, row);
          this.dialogTitle='修改课程信息';
          this.dialogFormVisible = true;
          this.form = row;
        },
        handleDelete(index, row) {
          console.log(index, row);
          var vm=this;
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
            $.post('http://localhost:3000/course/batchDelete',{
              ids:JSON.stringify([row.id])
            },function(data){
              $.getJSON('http://localhost:3000/course/findAll',function(data){
                console.log(data);
                vm.courseData=data;
                vm.$message({
                    type: 'success',
                    message: '删除成功!'
                });
             })
          })
          }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
          });
        },
        toSave:function(){
          this.dialogTitle='录入课程信息';
          this.dialogFormVisible = true;
          this.form = {};
        },
        submit:function(){

          var url = 'http://127.0.0.1:3000/course/update'
          if(this.dialogTitle=='录入课程信息'){
            url = 'http://127.0.0.1:3000/course/save';
          }else{
          }
          var vm = this;
          $.post(url,this.form,function(data){
            vm.dialogFormVisible = false;
            if(data.code){
              vm.$message({
                  type: 'success',
                  message: '操作失败，失败代号!'+data.code
              })
            }else {
              //删除成功后更新数据
              vm.$message({
                  type: 'success',
                  message: '操作成功!'
              });
            }
            $.getJSON('http://127.0.0.1:3000/course/findAll',function(data){
                vm.courseData = data;
            })
          });
        },
    }
});


var app=new Vue({
  el:'#app3',
  data:{
    title:'学生信息管理',
    dialogTitle:'',
    classData:null,
    dialogTitle:'',
    dialogFormVisible:false,
    activeIndex: '1',
    formInline:{},
    form:{},
    activeName: 'second',
    formInline: {
          user: '',
          region: ''
    }
  },
  created:function(){
     var vm=this;
    $.getJSON('http://localhost:3000/clazz/findAll',function(data){
      // console.log(data);
      vm.classData=data;
    })
  },
  methods: {
  add(){
    alert(1);
  },
        goback(){
          var vm=this;
          $.getJSON('http://localhost:3000/clazz/findAll',function(data){
            console.log(data);
            vm.classData=data;
          })
        },
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
          // $("#content2").hide(500);
        },
        onQuery() {
          var vm=this;
          console.log(this.formInline);
          $.getJSON('http://localhost:3000/clazz/findById',{
            id:this.formInline.id
          },function(data){
            // console.log(data);
            vm.classData=data;
          })
        },
        handleEdit(index, row) {
          // console.log(index, row);
          this.dialogTitle='修改班级信息';
          this.dialogFormVisible = true;
          this.form = row;
        },
        handleDelete(index, row) {
          console.log(index, row);
          var vm=this;
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
            $.post('http://localhost:3000/clazz/batchDelete',{
              ids:JSON.stringify([row.id])
            },function(data){
              console.log('dddd');
              console.log(data);
              $.getJSON('http://localhost:3000/clazz/findAll',function(data){
                console.log('-----');
                console.log(data);
                vm.classData=data;
                vm.$message({
                    type: 'success',
                    message: '删除成功!'
                });
             })
          })
          }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
          });
        },
        toSave:function(){
          this.dialogTitle='录入班级信息';
          this.dialogFormVisible = true;
          this.form = {};
        },
        submit:function(){

          var url = 'http://127.0.0.1:3000/clazz/update'
          if(this.dialogTitle=='录入班级信息'){
            url = 'http://127.0.0.1:3000/clazz/save';
          }else{
          }
          var vm = this;
          $.post(url,this.form,function(data){
            vm.dialogFormVisible = false;
            if(data.code){
              vm.$message({
                  type: 'success',
                  message: '操作失败，失败代号!'+data.code
              })
            }else {
              //删除成功后更新数据
              vm.$message({
                  type: 'success',
                  message: '操作成功!'
              });
            }
            $.getJSON('http://127.0.0.1:3000/clazz/findAll',function(data){
                vm.classData = data;
            })
          });
        },
    }
});


var app=new Vue({
  el:'#app4',
  data:{
    title:'学生信息管理',
    dialogTitle:'',
    studentCourseData:null,
    dialogTitle:'',
    dialogFormVisible:false,
    dialogFormVisible1:false,
    activeIndex: '1',
    formInline:{},
    form:{},
    activeName: 'second',
    formInline: {
          user: '',
          region: ''
    },
    pickerOptions0: {},
    value1: '',
    students:null,
    courses:null,
    scList:[],
    student:{},
    course:{},
    sc:{},
    keywords:''
  },
  created:function(){
    var vm=this;
    $.getJSON('http://localhost:3000/sc/findAll',function(data){
      vm.studentCourseData=data;
    })
    $.getJSON('http://localhost:3000/student/findAll',function(data){
      vm.students=data;
    })
    $.getJSON('http://localhost:3000/course/findAll',function(data){
      vm.courses=data;
    })
    $.getJSON('http://127.0.0.1:3000/sc/findSelectedCourse',function(data){
      vm.scList = data;
    });
   
  },
  methods: {
    add(){
      alert(1);
    },
        goback(){
          var vm=this;
          $.getJSON('http://127.0.0.1:3000/sc/findSelectedCourse',function(data){
            vm.scList = data;
          });
        },
        dateChange(val) {
          this.form.birth=val;
        },
        handleSelect(key, keyPath) {
          console.log(key);
        },
        onQuery() {
          var vm=this;
          console.log(vm.formInline.id);
          $.getJSON('http://127.0.0.1:3000/sc/findSelectedCourseByStudentId',{
              studentId:vm.formInline.id
          },function(data){
              vm.scList=data;
          });
        },
        handleEdit(index, row) {
           console.log(row)
         this.dialogFormVisible = true;
          this.dialogTitle = '设置成绩';
          this.student = row.s;
          this.course= row.c;
          this.sc = row.sc;
        },
        handleScore(index,row){
          this.dialogTitle='添加打分信息';
          this.dialogFormVisible = true;
          this.form = row;
        },
        handleSubmit:function(){
          this.dialogFormVisible = false;
          var vm = this;
          var url= 'http://127.0.0.1:3000/sc/mark';
          $.getJSON(url,{id:this.sc.id,grade:this.sc.grade},function(data){
            if(data.affectedRows>0){
              vm.$message({
                  type: 'success',
                  message: '操作成功!'
              });
              $.getJSON('http://127.0.0.1:3000/sc/findSelectedCourse',function(data){
                vm.scList = data;
              });
            }
          });
        },
        handleDelete(index, row) {
           this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var vm = this;
            var url = 'http://127.0.0.1:3000/sc/cancelCourse'
            $.get(url,{
              studentId:row.s.id,
              courseId:row.c.id
            },function(data){
              if(data.affectedRows>0){
                vm.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }
            });
            //刷新studentInfo
            var url ='http://127.0.0.1:3000/sc/findSelectedCourse';
            $.getJSON(url,function(data){
              vm.scList = data;
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
        },
        toSave:function(){
          this.dialogTitle='录入选课信息';
          this.dialogFormVisible1 = true;
          this.form = {grade:'',student_id:'',course_id:''};
        },
        submit:function(){
          var url = 'http://127.0.0.1:3000/sc/update'
          if(this.dialogTitle=='录入选课信息'){
            url = 'http://127.0.0.1:3000/sc/selectCourse';
          }
          // if(!this.form.class_id){
          //   this.form.class_id = 1
          // }
          var vm = this;
          $.get(url,this.form,function(data){
            vm.dialogFormVisible1 = false;
            if(data.code){
              vm.$message({
                  type: 'success',
                  message: '操作失败，失败代号!'+data.code
              })
            }else {
              //删除成功后更新数据
              vm.$message({
                  type: 'success',
                  message: '操作成功!'
              });
            }
            $.getJSON('http://127.0.0.1:3000/sc/findSelectedCourse',function(data){
                vm.scList = data;
            });
          });
        },
    }
});

		