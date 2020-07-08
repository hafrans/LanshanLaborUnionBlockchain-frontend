<template>
  <div class="FormD">
    <!-- <formHeader /> -->
    <div class="content">
      <div class="prompt">
        <p>提示:</p>
        <div v-for="(item, index) in textCon" :key="index" class="text">
          {{ item }}
        </div>
      </div>
      <Form />
    </div>
  </div>
</template>

<script>
import Form from '@/components/Componentform/index.vue'
// import formHeader from '@/components/formHeader/index.vue'
export default {
  components: {
    Form
  },
  data() {
    return {
      textCon: [
        '1.为了帮助您更好地参加调解，保护您的合法权利，请填写本表。',
        '2.本表所列各项内容都是查明案件事实所需，务必如实填写。',
        '3.您在本表中所填内容属于依法陈述的重要事实，不如实填写应承担由此产生的法律后果。',
        '4.本表的设计系针对一般劳动争议案件，有些内容可能与您的案件无关，您认为与案件无关的项目可以填“无”或不填；对于本表中勾选项可以在对应项打“√”；您认为另有重要内容未予列明的，可以在本表尾部填写。'
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.FormD {
  width: 100%;
  min-width: 1700px;
  height: 100%;
  // background-color: rgb(248, 248, 248);
  .content {
    width: 90%;
    margin: 0 auto;
    height: 80%;
    .prompt {
      background-color: white;
      width: 100%;
      height: 180px;
      margin: 30px 0;
      padding: 10px 20px;
      p {
        color: rgb(0, 157, 218);
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
}
</style>
