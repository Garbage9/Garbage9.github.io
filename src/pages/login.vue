<template>
    <div class="container">      
        <NavigationBar />
         <div class="content">
             <div class="header">
                <p><img src="../assets/noLogin.jpg"></p>
             </div>
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item prop="email" label="邮箱" :rules="[
                {required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}]">
                <el-input v-model="ruleForm2.email"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">登陆</el-button>
                    <el-button @click="resetForm('ruleForm2')">取消</el-button>
                </el-form-item>
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
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
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
        ruleForm2: {
            pass: '',
            checkPass: '',
            email: ''
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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            alert("请确认密码是否正确！")
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
    margin: 10px 0;
    padding: 10%;
}
.el-form-item {
    margin-left: -50px;
}
.el-button  {
    margin-right: 26px;
}
</style>