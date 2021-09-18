<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
     (来源:微信公众号)
    </p>
    <div style="margin-top: 15px;padding: 15px;">
    <el-input placeholder="请输入内容" v-model="searchKeyword" @change="searchDoms" class="input-with-select">
      <el-select v-model="select" slot="prepend" placeholder="请选择" style="width:100px;">
        <el-option label="公众号" :value="1" ></el-option>
        <el-option label="B站" :value="2"></el-option>
        <el-option label="Youtube" :value="3"></el-option>
        <el-option label="西瓜视频" :value="4"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="searchDoms"></el-button>
    </el-input>
  </div>
    <el-row v-if="datalen===htmls.length">
      <el-col v-for="(item,index) in htmls" :key="index" :xs="24" :sm="6" :md="6" :lg="6" :xl="6"><p>{{item.title}}年解说合集</p><div class="grid-content bg-purple-dark" v-html="item.html"></div></el-col>
    </el-row>
    <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <span>{{dialogMsg}}</span>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogVisible = false">好的</el-button>
    </span>
  </el-dialog>
    <el-divider >about</el-divider>
    <el-footer>本项目仅供学习使用，请勿用于其他商业用途！！！</el-footer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'HelloWorld',
  components: {
  },
  props: {
    msg: String
  },
  data(){
    return {
      htmls:[{title:'未知',html:'<p>数据未知</p>'}],
      datalen:1,
      select:1,
      searchKeyword:'',
      dialogMsg:"",
      dialogVisible:false
    }
  },
  created(){
    axios.get('/wechat-page/').then(res => {
      if(res.data.length > 0){
          this.htmls = []
          this.datalen = res.data.length
      }
       res.data.sort().forEach(element => {
         axios.get('/wechat-page/'+element).then(resx => {
           this.htmls.push({title:element.replace(".html",""),html:resx.data.replace(/<p><br\s\s\/><\/p>/g,'').replace(/<p><span style="font-size: \d\dpx;"><br\s\s\/><\/span><\/p>/g,'').replace(/<p style=""><br\s\s\/><\/p>/g,'')})
           if(this.datalen === this.htmls.length){
             this.htmls = this.htmls.sort((a, b) => a.title - b.title)
             setTimeout(() => {
             this.removeDefTitle()
           },0)
           }
         })
       });
    })
  },
  methods:{
    removeDefTitle(){
      let contents = document.getElementsByClassName('grid-content')
      contents.forEach(el => {
        el.removeChild(el.firstChild)
      })
    },
    showMsg(msg){
      this.dialogVisible = true
      this.dialogMsg = msg
    },
    handleClose(){

    },
    searchDoms(){
      let doms = document.querySelectorAll('a[textvalue*="'+this.searchKeyword+'"]')
      if(doms.length === 0){
        this.showMsg('没有找到《'+this.searchKeyword+'》的解说，赶紧让越哥解说😂')
      }
      doms.forEach(x => {
        x.classList.add('search')
        x.scrollIntoView({block: "center"})
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
a {
  text-decoration:none !important;
  color: #037b45;
}
.el-select{
    width: 200px;
  }
.search{
  color: red !important;
}
</style>
