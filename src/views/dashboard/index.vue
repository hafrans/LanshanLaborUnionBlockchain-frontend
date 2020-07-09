<template>
  <!-- <el-container>
    <el-header><Header></Header></el-header>
    <el-main><Tab></Tab> <Option></Option></el-main>
  </el-container> -->
  <div class="home">
    <!-- <Header /> -->
    <div class="main">
      <!-- <Tab /> -->
      <div class="item active">
        <p>调解事项</p>
      </div>
      <Option />
    </div>
    <Message v-if="false" />
  </div>
</template>

<script>
// import Header from "@/components/Header/index.vue";
// import Tab from "@/components/Tab/index.vue";
import Option from "@/components/Option/index.vue";
export default {
  components: {
    // Header,
    // Tab,
    Option
  }
};
</script>

<style lang="less" scoped>
.home {
  width: 100vw;
  min-width: 1400px;
  height: 100vh;
  .main {
    width: 100vw;
    height: 100%;
    .item {
      width: 250px;
      margin: 0 100px;
      padding: 0 20px;
      font-size: 26px;
      color: #000;
      font-weight: 500;
      text-align: center;
      // border-bottom: 3px solid #104aaa;
      p {
        height: 50px;
        line-height: 50px;
      }
    }
    .active {
      p {
        background: linear-gradient(
          to bottom,
          rgb(97, 190, 246),
          rgb(69, 164, 221)
        );
        border-radius: 25px ;
      }
      color: #fff;
    }
    // margin: 30px auto;
    // background-color: #999;
  }
}
</style>
