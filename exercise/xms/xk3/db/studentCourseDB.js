let pool = require('./pool');
module.exports = {
  /*查询所有*/
  findAll(){
      var sql = "select * from xk_studentcourse";
      return pool.execute(sql);
    },
  //通过id查询
  findById(id){
    var sql = "select * from xk_studentcourse where id = "+id;
    return pool.execute(sql);
  },
  /*删除*/
  batchDelete(ids){
    var sql = "delete from xk_studentcourse where id in ("+ids.join()+")";
    return pool.execute(sql);
    },  
  //选课
  selectCourse:function(studentId,courseId){
    var sql = "insert into xk_studentcourse values(null,0,"+studentId+","+courseId+")";
    return pool.execute(sql);
  },
  //取消选课
  cancelCourse:function(studentId,courseId){
    var sql = 'delete from xk_studentcourse where student_id='+studentId+' and course_id='+courseId;
    return pool.execute(sql);
  },
   //查询所有选课关系
  findSelectedCourse:function(){
    var sql = 'select s.*,c.*,sc.*'
      +' from xk_student as s,xk_studentcourse as sc,xk_course as c'
      +' where s.id = sc.student_id'
      +' and c.id = sc.course_id';
    return pool.execute({sql:sql,nestTables:true});
  },
  //通过学生ID查询已经选课信息
  findSelectedCourseByStudentId:function(studentId){
    var sql = 'select s.*,c.*,sc.*'
      +' from xk_student as s,xk_studentcourse as sc,xk_course as c'
      +' where s.id = sc.student_id'
      +' and c.id = sc.course_id'
      +' and s.id = '+studentId;
    return pool.execute({sql:sql,nestTables:true});
  },
  //打分
  score:function(id,score){
    var sql = 'update xk_studentcourse set grade ='+score+' where id = '+id;
    return pool.execute(sql);
  },
  update(student){
      var sql = "update xk_studentcourse set grade = '"
      +student.grade+"',student_id="
      +student.student_id+",course_id='"
      +student.course_id+"' where id ="
      +student.id;
      console.log(sql);
      return pool.execute(sql);
    }
}


