<template>
  <div class="app-wrapper">
    <div class="app">
      <Navigation v-if="!navigationDisable" />
      <router-view v-if="isRouterAlive" />
      <Footer v-if="!navigationDisable && seeFooter" />
    </div>
  </div>
</template>

<script>
import Navigation from './components/Navigation';
import Footer from './components/Footer';

export default {
  name: 'App',

  components: {
    Navigation,
    Footer,
  },

  data() {
    return {
      navigationDisable: null,
      isRouterAlive: true,
      seeFooter: false,
    };
  },
  provide() {
    return {
      reload: this.reload,
    }
  },  
  //app.vue
  created() {
    
    //在页面加载时读取sessionStorage里的状态信息
    if (localStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(LocalStorage.getItem('store'))));
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state));
    });
    this.checkRoute();
    if(this.$route.name == "Home") {
      this.seeFooter = true;
    }
  },

  // created() { // 初始化
    
  // },
  mounted() {},
  methods: {
    checkRoute() {
      if(this.$route.name === "Login" || this.$route.name === "Register" ||
          this.$route.name === "ResetPassword" || this.$route.name === "ForgetPassword") {
        this.navigationDisable = true;
        // console.log(this.navigationDisable);
      }
      else {
        this.navigationDisable = false;
      }
      if(this.$route.name == "Home") {
        this.seeFooter = true;
      } else {
        this.seeFooter = false;
      }
    },
    reload() {
      // console.log('reloadreload');
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      })
    }
  },
  watch: { // 任意时刻改变都会触发。
    $route() {
      this.checkRoute(); 
    }
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

.link-light {
  color: #fff;
}

.arrow {
  margin-left: 8px;
  width: 12px;
  path {
    fill: #000;
  }
}

.arrow-light {
  path { 
    fill: rgba(56, 34, 34, 0.137);
  }
}

.error {
    text-align: center;
    font-size: 12px;
    color: red;
}
  .el-cascader-panel {
    height: 190px;
    .el-scrollbar__wrap {
      height: 100%;
    }
    .el-cascader-node {
      height: 45px;
      font-size: 15px;
    }
  }
</style>

