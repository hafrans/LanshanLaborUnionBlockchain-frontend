<template>
  <div class="app-container">
    <!-- <Header /> -->
    <div class="main">
      <!-- <Tab /> -->
      <div class="item active">
        <p>调解事项</p>
      </div>
      <Option style="margin:0 auto;" />
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
.app-container {
  // width: 100%;
  // min-width: 1366px;
  // max-width: 1366px;
  // height: 90vh;
  // margin: 0 auto;
  position: relative;
  .main {
    position: relative;
    height: 90%;
    width:100%;
    .item {
      width: 10rem;
      margin: 0 50px;
      font-size: 1.2rem;
      color: #000;
      font-weight: bold;
      text-align: center;
      p {
        height: 40px;
        line-height: 40px;
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
