<template>
    <div class="container">      
        <NavigationBar :goback="true"/>
         <div class="content">
             <div class="header">
                <p><img src="../assets/noLogin.jpg"></p>
             </div>
            <el-form :model="ruleForm2" status-icon :rules="rules2" :label-position="labelPosition" size="mini" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item prop="email" label="邮箱" :rules="[
                {required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}]">
                <el-input v-model="ruleForm2.email" autofocus="true"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">登陆</el-button>
                    <el-button @click="resetForm('ruleForm2')">取消</el-button>
                </el-form-item>
                <el-button class="goClick" type="text" @click="goClick">没有账号？注册</el-button>
            </el-form>
         </div>
        <TabBar/>   
    </div>
</template>
<script>
    import TabBar from '../components/tabbar'
    import NavigationBar from '../components/navigationbar'
    export default{
        name:'login',
        components:{TabBar,NavigationBar},
         data() {
            var validatePass = (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入密码'));
              } else {
                if (this.ruleForm2.checkPass !== '') {
                  this.$refs.ruleForm2.validateField('checkPass');
                }
                callback();
              }
            };
            var validatePass2 = (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'));
              } else if (value !== this.ruleForm2.pass) {
                callback(new Error('两次输入密码不一致!'));
              } else {
                callback();
              }
            };
            return {
              labelPosition:'left',
              ruleForm2: {
                  pass: '',
                  checkPass: '',
                  email: '1234@qq.com'
              },
            rules2: {
              pass: [
                { validator: validatePass, trigger: 'blur' }
              ],
              checkPass: [
                { validator: validatePass2, trigger: 'blur' }
              ],
          }
        };
      },
      methods: {
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let that = this.ruleForm2;
              let user = new Bmob.User();    
              // console.log(that)
              let _this = this;
              // console.log( this)
              Bmob.User.logIn(that.email,that.pass,{
                success:function(user){
                let users = user.attributes;
                console.log(users)
                let username = user.attributes.username;
                let userArr = [];
                userArr.push(users)
                localStorage.setItem("users",JSON.stringify(userArr));
                console.log(userArr)
                alert(`亲爱的${users.username}登陆成功`)
                _this.$router.push({
                  name:'mine',
                  params:{
                    users:users,
                    username:username,
                    isLogin:true
                  }
                });                  
                },error:function(user,error){
                  alert("用户密码错误")
                }
              })
            } else {
              alert("请确认密码是否正确！")
              return false;
            }
          })
        },
        removeDomain(item) {
          var index = this.ruleForm2.domains.indexOf(item)
          if (index !== -1) {
            this.ruleForm2.domains.splice(index, 1)
          }
        },
        addDomain() {
          this.ruleForm2.domains.push({
            value: '',
            key: Date.now()
          });
        },
        goClick(){
          this.$router.push({
            name:'register',
            params:{

            }
          })
      }
    }
    }
</script>
<style scoped>
.content {
    width: 100%;
}
.header {
    border-bottom: 1px solid #eeeeee;
}
.header p {
    width: 100px;
    height: 100px;
    border: 1px solid #b0b0b0;
    border-radius: 50%;
    margin: 26px auto;
    overflow: hidden;
}
.header p img {
    height: 100%;
}
.demo-ruleForm {
    margin: 45px 0;
    padding: 10%;
}
.el-button  {
    margin-right: 26px;
}
</style>