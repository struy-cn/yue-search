<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <YueSearch title="越哥说电影解说合集"/>
    <a class="go-top" href="javascript:void(0)" @click="goTop">
      <i class="el-icon-top" aria-hidden="true"></i>
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
  methods:{
    goTop(){
      let ds = document.getElementsByTagName('body','html')
      ds.forEach(x => {
        x.scrollIntoView({'behavior':'smooth'})
      })
    }
  }
}
</script>

<style>
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
