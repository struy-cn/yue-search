<template>
  <div class="hello" :style="isMobile?'margin-top: 60px;':''">
    <h1>{{ msg }}</h1>
    <p>越哥说电影，专注好电影！</p>
    <p>
     (来源:微信公众号)
    </p>
    <p>
      <a title="试试手气" href="javascript:void(0)" @click="randomOpen"><i class="el-icon-present"></i></a>
      <el-divider direction="vertical"></el-divider>
      <a title="宋词" href="javascript:void(0)" @click="songCi"><i class="el-icon-reading"></i></a>
      <el-divider direction="vertical"></el-divider>
      <a title="音乐" href="javascript:void(0)" @click="music"><i class="el-icon-moon"></i></a>
    </p>
    <el-divider v-if="isMobile" ></el-divider>
    <div :class="isMobile?'search-input-mobile':'search-input'">
    <el-input ref="keywordInput" :autofocus="true" placeholder="输入电影名" v-model="searchKeyword" @change="searchDoms" class="input-with-select">
      <el-select v-if="!isMobile" disabled v-model="select" slot="prepend" placeholder="请选择" style="width:100px;">
        <el-option label="公众号" :value="1" ></el-option>
        <el-option disabled label="B站" :value="2"></el-option>
        <el-option disabled label="Youtube" :value="3"></el-option>
        <el-option disabled label="西瓜视频" :value="4"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="searchDoms"></el-button>
    </el-input>
  </div>
    <el-row v-if="datalen===htmls.length">
      <el-col v-for="(item,index) in htmls" :key="index" :xs="24" :sm="6" :md="6" :lg="6" :xl="6"><p>{{item.title}}年解说合集</p><div class="grid-content bg-purple-dark" v-html="item.html"></div></el-col>
    </el-row>
    <el-dialog
      :title="dialogTitle"
      :visible="dialogVisible"
      :destroy-on-close="true"
      :width="isMobile?'85%':'50%'"
      @close="handleClose"
      @closed="handleClosed">
      <span>{{dialogMsg}}</span>
      <div v-if="randomMovie === null && currentCi === null && dialogVisible && searchKeyword">
        <p><span>扫码去微信公众号查看</span></p>
        <p><img alt="Yue QR" src="qrcode.bmp"></p>
        <p ><a target="_blank" :href="bLink">前往B站查看</a></p>
        <p ><a target="_blank" :href="xLink">前往西瓜视频查看</a></p>
        <p ><a target="_blank" :href="yLink">前往Youtube查看</a></p>
      </div>
      <div v-else-if="randomMovie !== null && currentCi === null">
        <p>摇到一个超棒的解说，去看看吧</p>
        <p>🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉</p>
        <p><a :href="randomMovie.href">{{ randomMovie.title.replace(/\d{1,3}、/,'') }}</a></p>
        <el-divider ></el-divider>
        <p>{{ randomMovie.linkContent.title }}</p>
        <blockquote>{{ randomMovie.linkContent.desc }}</blockquote>
        <!-- 图片暂时不能引用 -->
        <!-- <el-image
          style="width: 100px; height: 100px"
          :src="randomMovie.linkContent.cdn_url"
          :fit="fit"></el-image> -->
        <el-divider ></el-divider>
        <div v-html="randomMovie.linkContent.content_noencode.replace(/<section.*?section>/g,'').replace(/<iframe.*?iframe>/g,'').replace(/<img.*?>/g,'').replace('高清播放地址','')"></div>
      </div>
      <div v-else-if="randomMovie === null && currentCi !== null">
        <p>
          <span>作者：{{ currentCi.author}}</span>
          <el-divider direction="vertical"></el-divider>
          <el-tag v-for=" tag in currentCi.tags" :key="tag" size="mini">{{tag}}</el-tag>
        </p>
        <el-divider ></el-divider>
        <p v-for="row in currentCi.paragraphs" :key="row">{{row}}</p>
      </div>
      <div v-else>
        <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=280 height=86 src="//music.163.com/outchain/player?type=2&id=16846093&auto=1&height=66"></iframe>
      </div>
    </el-dialog>
    <el-divider >about project</el-divider>
    <el-footer :style="isMobile?'margin-bottom: 40px;':''">© 2021 <a target="_blank" href="http://git66.com/soul">struy</a>｜<a target="_blank" href="https://github.com/StruggleYang/yue-search">源代码</a>｜本项目仅供学习使用，请勿用于商业用途！</el-footer>
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
      dialogVisible:false,
      dialogTitle:'提示',
      bLink: '',
      xLink:'',
      yLink:'',
      isMobile:false,
      randomMovie: null,
      songci:[],
      currentCi:null,
      allMovies:[]
    }
  },
  created(){
    axios.get('/db/data.json').then(res => {
      if(res.data.length > 0){
          this.htmls = []
          this.datalen = res.data.length
      }

      for (let index = 0; index < res.data.length; index++) {
        const element = res.data[index];
        axios.get('/wechat-page/'+element).then(resx => {
           this.htmls.push({title:element.replace(".html",""),html:resx.data.replace(/<p><br\s\s\/><\/p>/g,'').replace(/<p><span style="font-size: \d\dpx;"><br\s\s\/><\/span><\/p>/g,'').replace(/<p style=""><br\s\s\/><\/p>/g,'')})
           if(this.datalen === this.htmls.length){
             this.htmls = this.htmls.sort((a, b) => a.title - b.title)
             setTimeout(() => {
             this.removeDefTitle()
           },1)
           }
         })
         axios.get('/db/'+element.replace(".html",".json")).then(resy => {
           console.log(resy.data)
           this.allMovies = this.allMovies.concat(resy.data)
         })
      }
    })
    this.isMobile = this._isMobile()
    this.$nextTick(() => {
      this.$refs.keywordInput.focus()
    })
    axios.get('/db/songci300.json').then(res => {
      this.songci = res.data
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
      this.dialogVisible = false
    },
    handleClosed(){
      this.randomMovie = null
      this.currentCi = null
      this.dialogMsg = ""
      this.dialogTitle = '提示'
    },
     _isMobile() {
       console.log(navigator.userAgent)
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    },
    randomOpen(){
      //const movies = document.querySelectorAll('.grid-content  a')
      const num = Number(Math.floor(Math.random() * (this.allMovies.length)))
      this.randomMovie = this.allMovies[num]
      this.dialogTitle = '手气不错'
      this.dialogVisible = true
    },
    songCi(){
      const num = Math.floor(Math.random() * (this.songci.length))
      this.currentCi = this.songci[num]
      this.dialogTitle = '《'+this.currentCi.rhythmic+'》'
      this.dialogVisible = true
    },
    music(){
       this.dialogTitle = '音乐'
       this.dialogVisible = true
    },
    searchDoms(){
      let doms = document.querySelectorAll('a[textvalue*="'+this.searchKeyword+'"]')
      this.bLink = 'https://space.bilibili.com/149558293/search/video?keyword='+this.searchKeyword
      this.xLink = 'https://www.ixigua.com/search/越哥说电影'+this.searchKeyword
      this.yLink = 'https://www.youtube.com/channel/UChgCVolsF6L7DWmOpWKSkMA/search?query='+this.searchKeyword
      if(doms.length === 0){
        this.showMsg('没有找到《'+this.searchKeyword+'》的解说，赶紧让越哥解说😂,或者去下面找找')
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
    width: 150px;
  }
.search{
  color: red !important;
}
.input-with-select .el-input__inner{
  border-radius: 0;
}
.search-input {
    margin-top: 15px;
    padding: 15px;
}
.search-input-mobile{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
</style>
