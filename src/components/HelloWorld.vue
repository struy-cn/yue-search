<template>
  <div class="hello" v-loading="loading" element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading" :style="isMobile?'margin-top: 60px;':''">
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
      <el-col v-for="(item,index) in htmls" :key="index" :xs="24" :sm="6" :md="6" :lg="6" :xl="6"><p>{{item.title}}年解说合集</p>
        <div class="grid-content bg-purple-dark" >
          <p v-for="(movie,index) in allMovies.filter(x => x.year === item.title)" :key="movie.title"><a target="_blank" style="cursor: pointer;" @click="openMovieDetail(-1,movie)" :textvalue="movie.title.replace(/\d{1,3}、/,'')">{{(index+1)+'、'+movie.title.replace(/\d{1,3}、/,'')}}</a></p>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      :visible="dialogVisible"
      :destroy-on-close="true"
      :width="isMobile?'90%':'50%'"
      @close="handleClose"
      @closed="handleClosed">
      <span slot="title">{{dialogTitle}}
        <el-divider direction="vertical"></el-divider>
        <a v-if="randomMovie !== null && currentCi === null"
         title="img" href="javascript:void(0)" @click="shareImg('#movie-body',randomMovie.href)"><i class="el-icon-share"></i></a>
         <a v-if="randomMovie === null && currentCi !== null"
         title="img" href="javascript:void(0)" @click="shareImg('#songci-body')"><i class="el-icon-share"></i></a>
      </span>
      <span>{{dialogMsg}}</span>
      <div v-if="randomMovie === null && currentCi === null && dialogVisible && searchKeyword && !isMuics">
        <p><span>扫码去微信公众号查看</span></p>
        <p><img alt="Yue QR" src="qrcode.bmp"></p>
        <p ><a target="_blank" :href="bLink">前往B站查看</a></p>
        <p ><a target="_blank" :href="xLink">前往西瓜视频查看</a></p>
        <p ><a target="_blank" :href="yLink">前往Youtube查看</a></p>
      </div>
      <div v-else-if="randomMovie !== null && currentCi === null">
        <p>找到一个超棒的解说，去看看吧</p>
        <p>🎉🎉🎉🎉🎉🎉(点此去观看)🎉🎉🎉🎉🎉🎉</p>
        <div id="movie-body" >
          <br>
          <p><a :href="randomMovie.href">{{ randomMovie.title.replace(/\d{1,3}、/,'') }}</a></p>
          <el-divider ></el-divider>
          <p>{{ randomMovie.linkContent.title }}</p>
          <blockquote>{{ randomMovie.linkContent.desc }}</blockquote>
          <el-image
            :src="genImgUrl(randomMovie.title)"
            fit="cover"> 
          </el-image>
          <el-divider ></el-divider>
          <div v-html="handerContentNoencode(randomMovie.linkContent.content_noencode)"></div>
          <br>
          <div v-if="innerVisible">
            <el-divider ></el-divider>
            <p>扫码观看当前解说(直达)</p>
            <p id="qrcode"></p>
            <el-footer style="background-color:#fafafa;line-height: 60px;">
              <span>
                <span>via 越哥说电影合集</span>
                <el-divider direction="vertical"></el-divider>
                <span>yue.git66.com</span>
              </span>
            </el-footer>
          </div>
        </div>
      </div>
      <div id="songci-body" v-else-if="randomMovie === null && currentCi !== null">
        <p v-if="innerVisible" style="text-align: center;">
          <br>
          {{'《'+currentCi.rhythmic+'》'}}
        </p>
        <p>
          <span>作者：{{ currentCi.author}}</span>
          <el-divider direction="vertical"></el-divider>
          <el-tag v-for=" tag in currentCi.tags" :key="tag" size="mini">{{tag}}</el-tag>
        </p>
        <el-divider ></el-divider>
        <p v-for="row in currentCi.paragraphs" :key="row">{{row}}</p>
        <div v-if="innerVisible">
            <el-footer style="background-color:#fafafa;line-height: 60px;">
              <span>
                <span>via 越哥说电影合集</span>
                <el-divider direction="vertical"></el-divider>
                <span>yue.git66.com</span>
              </span>
            </el-footer>
          </div>
      </div>
      <div v-if="isMuics">
        <p>
          <span>世界没那糟，每天开心，睡个好觉😊</span>
          <el-divider></el-divider>
        </p>
        <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=280 height=320 src="//music.163.com/outchain/player?type=0&id=6985955562&auto=1&height=430"></iframe>
      </div>
      <el-dialog
          top="10px"
          :destroy-on-close="true"
          :width="isMobile?'90%':'50%'"
          @close="handleCloseInner"
          :visible="innerVisible"
          append-to-body>
          <p style="text-align: center;">{{innerVisibleMsg}}</p>
          <div id="inner-body-img-box" style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
          </div>
        </el-dialog>
    </el-dialog>
    <el-divider >about project</el-divider>
    <el-footer :style="isMobile?'margin-bottom: 40px;':''">© 2021 <a target="_blank" href="http://git66.com/soul">struy</a>｜<a target="_blank" href="https://github.com/StruggleYang/yue-search">源代码</a>｜本项目仅供学习使用，请勿用于商业用途！</el-footer>
  </div>
</template>

<script>
import axios from "axios";
import md5 from "js-md5";
import html2canvas from 'html2canvas';
import QRCode  from "qrcodejs2"

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
      isMuics:false,
      currentCi:null,
      allMovies:[],
      loading:true,
      innerVisible:false,
      innerVisibleMsg:''
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
           }
         })
         axios.get('/db/'+element.replace(".html",".json")).then(resy => {
           const data = resy.data.map(x => {
             x.year = element.replace(".html","")
             return x
             })
             setTimeout(() => {
              this.loading = false
            },100)
           this.allMovies = this.allMovies.concat(data)
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
    handleCloseInner(){
      this.innerVisible = false
    },
    handleClosed(){
      this.randomMovie = null
      this.currentCi = null
      this.dialogMsg = ""
      this.dialogTitle = '提示'
      this.isMuics = false
    },
    genImgUrl(title){
      return '/cover/'+md5(title)+'.png'
    },
    handerContentNoencode(html){
      console.log(html)
      return html.replace(/<section.*?section>/g,'')
      .replace(/<iframe.*?iframe>/g,'')
      .replace(/<img.*?>/g,'')
      .replace('高清播放地址','')
    },
     _isMobile() {
       console.log(navigator.userAgent)
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    },
    openMovieDetail(num=-1,movie){
      if (num>=0){
        this.randomMovie = this.allMovies[num]
      }else{
         this.randomMovie = movie
      }
      this.dialogVisible = true
    },
    randomOpen(){
      //const movies = document.querySelectorAll('.grid-content  a')
      const num = Number(Math.floor(Math.random() * (this.allMovies.length)))
      this.dialogTitle = '手气不错'
      this.openMovieDetail(num)
    },
    songCi(){
      const num = Math.floor(Math.random() * (this.songci.length))
      this.currentCi = this.songci[num]
      this.dialogTitle = '《'+this.currentCi.rhythmic+'》'
      this.dialogVisible = true
    },
    music(){
       this.isMuics = true
       this.dialogTitle = '音乐'
       this.dialogVisible = true
    },
    qrcode (domId,link) {
        new QRCode(domId, {
            width: 124,
            height: 124,        // 高度
            text: link,   // 二维码内容
            // render: 'canvas' ,   // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
            // background: '#f0f',   // 背景色
            // foreground: '#ff0'    // 前景色
        })
    },
    shareImg(selector,link){
      this.innerVisibleMsg = '图片生成中...'
      this.innerVisible = true
      const that = this
      that.$nextTick(() => {
        if(link!==undefined && link!==""){
          that.qrcode('qrcode',link)
        }
        that.$nextTick(() => {
          html2canvas(document.querySelector(selector),{cale: 6}).then(function(canvas) {
              that.innerVisibleMsg = '图片生成成功！可长按或右键保存图片'
              const dom_img = document.createElement("img");
              dom_img.src = canvas.toDataURL("image/jpeg")
              dom_img.classList.add('el-image__inner')
              dom_img.style = 'object-fit: cover;'
              document.querySelector("#inner-body-img-box").appendChild(dom_img);
          });
        })
      })
    },
    searchDoms(){
      let doms = document.querySelectorAll('a[textvalue*="'+this.searchKeyword+'"]')
      const movie = this.allMovies.filter((x) => x.title.includes(this.searchKeyword))
      this.bLink = 'https://space.bilibili.com/149558293/search/video?keyword='+this.searchKeyword
      this.xLink = 'https://www.ixigua.com/search/越哥说电影'+this.searchKeyword
      this.yLink = 'https://www.youtube.com/channel/UChgCVolsF6L7DWmOpWKSkMA/search?query='+this.searchKeyword
      if(movie.length === 0){
        this.showMsg('没有找到《'+this.searchKeyword+'》的解说，赶紧让越哥解说😂,或者去下面找找')
      } else if(movie.length === 1) {
        this.dialogTitle = '找到了一个解说'
        this.openMovieDetail(-1,movie[0])
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
#movie-body-img-box{

}
</style>
