<template>
  <div class="tab">
    <div class="tabD">
      <div class="item active">
        <p>调解事项</p>
      </div>
      <!-- <div class="item">
        <p>调解部门</p>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.tab {
  width: 100%;
  display: flex;
  margin-top: 30px;
  // align-items: center;
  justify-content: center;
  .tabD {
    width: 85%;
    border-bottom: 1px solid #104aaa;
    display: flex;
    // align-items: center;
    justify-content: center;
    .item {
      width: 220px;
      padding: 0 30px;
      font-size: 26px;
      color: #000;
      font-weight: 500;
      text-align: center;
      border-bottom: 3px solid #104aaa;
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
        border-radius: 25px 25px 0 0;
      }
      color: #fff;
    }
  }
}
</style>
