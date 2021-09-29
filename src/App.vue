<template>
  <div id="app" :class="getDarkMode()?'darkmode':''">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <YueSearch title="越哥说电影解说合集" :isDarkMode="getDarkMode()"/>
    <a class="go-top" href="javascript:void(0)" @click="goTop">
      <i class="el-icon-top" aria-hidden="true"></i>
    </a>
    <a class="toggleDarkMode" href="javascript:void(0)" @click="toggleDarkMode()">
      <i v-if="darkModeSetting === 'moon'" class="el-icon-sunny" aria-hidden="true"></i>
      <i v-else-if="darkModeSetting === 'sunny'" class="el-icon-moon" aria-hidden="true"></i>
      <i v-else-if="darkModeSetting === 'auto'" class="el-icon-moon-night" aria-hidden="true"></i>
    </a>
  </div>
</template>

<script>
import YueSearch from './components/YueSearch.vue'

export default {
  name: 'App',
  components: {
    YueSearch
  },
  data(){
    return {
      systemDarkMode:false,
      darkModeSetting:'auto'
    }
  },
  created(){
    this.getSystemDarkMode()
    this.getDarkModeSetting()
    this.checkDarkMode()
  },
  methods:{
    goTop(){
      let ds = document.getElementsByTagName('body','html')
      ds.forEach(x => {
        x.scrollIntoView({'behavior':'smooth'})
      })
    },
    getSystemDarkMode(){
      let media = window.matchMedia('(prefers-color-scheme: dark)');
      this.systemDarkMode = media.matches
      let callback = (e) => {
          let prefersDarkMode = e.matches;
          this.systemDarkMode = prefersDarkMode
          this.checkDarkMode()
      };
      if (typeof media.addEventListener === 'function') {
          media.addEventListener('change', callback);
      } else if (typeof media.addEventListener === 'function') {
          media.addEventListener(callback);
      }
    },
    getDarkMode(){
      let isDarkMode = false
      switch(this.getDarkModeSetting()){
        case 'auto':
          isDarkMode = this.systemDarkMode
        break
        case 'moon':
          isDarkMode = true
        break
        case 'sunny':
          isDarkMode = false
        break
        default:
          isDarkMode = this.systemDarkMode
      }
      return isDarkMode
    },
    toggleDarkMode(){
      switch(this.getDarkModeSetting()){
        case 'auto':
          this.darkModeSetting = 'moon'
        break
        case 'moon':
          this.darkModeSetting = 'sunny'
        break
        case 'sunny':
          this.darkModeSetting = 'auto'
        break
      }
      localStorage.setItem("darkModeSetting",this.darkModeSetting)
      this.checkDarkMode()
    },
    getDarkModeSetting(){
      let darkModeSetting = localStorage.getItem("darkModeSetting")
      if (darkModeSetting === null){
        darkModeSetting = this.darkModeSetting
      }
      this.darkModeSetting = darkModeSetting
      return darkModeSetting
    },
    checkDarkMode(){
      if (this.getDarkMode()) {
        document.body.classList.add('darkmode')
      }else{
          document.body.classList.remove('darkmode')
      }
    }
  }
}
</script>

<style>
:root {
    --dark-bg-color: rgb(15, 15, 15);
    --dark-text-color: rgb(183, 183, 183);
    --dark-a-color: rgb(27, 109, 168);
    --dark-a-visited-color: rgb(165, 99, 13);
    --dark-a-hover-color: #acc;
    --dark-border-color: #3a3a3a;
    --dark-input-border-color: rgba(211, 211, 211, 0.2);
    --dark-input-placeholder-color: rgb(103, 103, 103);
    --dark-dialog-bg-color: rgb(115 115 115 / 19%);
    --dark-bg-image: linear-gradient(rgb(15, 15, 15), rgb(15, 15, 15));
    --dark-header-color: #00b786;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
.darkmode,
.darkmode .toggleDarkMode,
.darkmode .go-top,
.darkmode .el-loading-parent--relative,
.darkmode .el-dialog,
.darkmode .el-dialog__header,
.darkmode .el-dialog__body,
.darkmode .el-collapse-item__header,
.darkmode .el-collapse-item__wrap,
.darkmode .el-autocomplete,
.darkmode input,
.darkmode .el-input-group__append,
.darkmode .el-autocomplete-suggestion{
  color: var(--dark-text-color) !important;
  background-color: var(--dark-bg-color) !important;
}
.darkmode .el-dialog__wrapper{
  background-color: var(--dark-dialog-bg-color);
}
.darkmode .el-divider{
  background-color: var(--dark-border-color);
}
.darkmode .el-autocomplete-suggestion,
.darkmode .el-collapse-item__header,
.darkmode .el-autocomplete-suggestion li:hover{
  border-color: var(--dark-border-color);
}
.darkmode .el-autocomplete-suggestion li:hover{
  background-color: var(--dark-border-color);
}
.darkmode .go-top,
.darkmode input,
.darkmode .el-input-group__append,
.darkmode .el-collapse,
.darkmode .el-collapse-item__wrap,
.darkmode .toggleDarkMode{
  border-color: var(--dark-input-border-color) !important;
  border-color: var(--dark-border-color);
}
.darkmode .el-collapse-item__content{
  color: var(--dark-text-color) !important;
}
.toggleDarkMode{
    text-align: center;
    padding: 5px 5px;
    position: fixed;
    z-index: 999;
    right: 30px;
    bottom:120px;
    border-radius: 50%;
    border: 1px solid #DDD;
    display: block;
    background: #fff;
    line-height: 100%;
    color: #DDD;
}
.go-top {
    text-align: center;
    padding: 15px 5px;
    position: fixed;
    z-index: 999;
    right: 30px;
    bottom: 60px;
    border: 1px solid #DDD;
    display: block;
    width: 16px;
    background: #fff;
    line-height: 100%;
    color: #DDD;
    /* display: none; */
}

.go-top:hover,
.go-top:focus {
    color: #918e8e;
    text-decoration: none;
}
</style>
