<template>
  <el-row>
    <el-col :span="24">
      <div class="option">
        <div class="content">
          <img src="../../../public/img/bkg.png" alt="" class="bkg_img">
          <img src="../../../public/img/home_rotate.png" alt="" class="ro_img">
          <div
            v-for="(item, index) in ball"
            :key="'jump-'+ index"
            class="jump"
            :style="{ top: item.top, left: item.left }"
          >
            <div :class="item.class" />
          </div>
          <div
            v-for="(item, index) in sort"
            :key="index"
            class="entry"
            :style="{ top: item.top, left: item.left }"
          >
            <div :id="idName[index]" :class="item.class" @click="changCon(index)">
              <el-image :src="item.pic" />
            </div>
            <div class="text">{{ item.text }}</div>
          </div>
        </div>
        <el-dialog title="温馨提示" :visible.sync="dialogVisible" width="30%" center>
          <p class="context">{{ text }}</p>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="goFormPage">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-col>
  </el-row>
  <!-- <div class="option">
    <div class="content">
      <div
        class="entry"
        v-for="(item, index) in sort"
        :key="index"
        :style="{ top: item.top, left: item.left }"
      >
        <div class="round" :id="idName[index]" @click="changCon(index)">
          <el-image :src="item.pic"></el-image>
        </div>
        <div class="text">{{ item.text }}</div>
      </div>
    </div>
    <el-dialog
      title="温馨提示"
      :visible.sync="dialogVisible"
      width="30%"
      center
    >
      <p class="context">{{ text }}</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="goFormPage">确 定</el-button>
      </span>
    </el-dialog>
  </div>-->
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      text: "",
      idName: [
        "bkgc1",
        "bkgc2",
        "bkgc3",
        "bkgc4",
        "bkgc5",
        "bkgc6",
        "bkgc7",
        "bkgc8",
        "bkgc9",
        "bkgc9"
      ],
      idText: [
        "社会保险争议是指因用人单位未给职工依法缴纳社会保险而发生的争议类型，也包含用人单位未为职工依法缴纳社会保险致使职工不能享受相关社会保险待遇，造成损失的争议类型",
        "劳动报酬争议是指因用人单位拖欠职工的工资、加班费、奖金、津贴等而发生的争议类型",
        "经济补偿金争议是指用人单位与劳动者协议解除劳动关系、劳动者依法单方解除劳动关系等法定需要支付经济补偿金的情形",
        "双倍工资争议是指因用人单位未依法与劳动者签订劳动合同须支付双倍工资的争议类型",
        "工伤争议是指劳动者履行职务过程中发生工伤，因工伤赔偿待遇引起的争议类型",
        "赔偿金争议是指因用人单位违法解除劳动关系引起的赔偿争议。",
        "劳动关系争议是指职工在履行职务过程中严重违反公司管理制度、存在营私舞弊等法定情形用人单位依法解除劳动关系引起的争议类型或劳动者需要与用人单位确认劳动关系的争议类型。",
        "其他争议是指其他争议类型。"
      ],
      ball: [
        {
          top: "25%",
          left: "28%",
          class: "ball1"
        },
        {
          top: "27%",
          left: "65%",
          class: "ball2"
        },
        {
          top: "60%",
          left: "15%",
          class: "ball3"
        },
        {
          top: "79%",
          left: "55%",
          class: "ball4"
        },
        {
          top: "60%",
          left: "80%",
          class: "ball5"
        }
      ],
      sort: [
        {
          pic: require("../../../public/img/insurance.png"),
          text: "社会保险",
          top: "0%",
          left: "33%",
          class: "round"
        },
        {
          pic: require("../../../public/img/remuneration.png"),
          text: "劳动报酬",
          top: "25%",
          left: "18%",
          class: "round"
        },
        {
          pic: require("../../../public/img/econ.png"),
          text: "经济补偿金",
          top: "50%",
          left: "28%",
          class: "round"
        },
        {
          pic: require("../../../public/img/wage.png"),
          text: "双倍工资",
          top: "78%",
          left: "15%",
          class: "round"
        },
        {
          pic: require("../../../public/img/inductrial_injury.png"),
          text: "工伤",
          top: "0%",
          left: "60%",
          class: "round"
        },
        {
          pic: require("../../../public/img/compensation.png"),
          text: "赔偿金",
          top: "25%",
          left: "75%",
          class: "round"
        },
        {
          pic: require("../../../public/img/labor_relations.png"),
          text: "劳动关系",
          top: "50%",
          left: "65%",
          class: "round"
        },
        {
          pic: require("../../../public/img/other.png"),
          text: "其他",
          top: "80%",
          left: "75%",
          class: "round"
        }
      ]
    };
  },
  methods: {
    changCon(index) {
      this.text = this.idText[index];
      this.dialogVisible = true;
    },
    goFormPage() {
      this.$router.push("/newcase/newform");
    }
  }
};
</script>

<style lang="less" scoped>
// html,
// body {
//   height: auto;
// }
.option {
  width: 100%;
  height: 75vh;
  display: flex;
  justify-content: center;
  // background-image: url("../../../public/img/bkg.png");
  .context {
    font-size: 16px;
    text-indent: 2em;
  }
  .content {
    // background: url("../../../public/img/home_rotate.png") no-repeat center;
    // background: url("../../../public/img/bkg.png") no-repeat center;
    background-size: 20%;
    width: 100%;
    height: 100%;
    margin: 10px 0;
    position: relative;
     .bkg_img {
       width: 20%;
       position: absolute;
      top: 20%;
      left: 40%;
      z-index: 1;
      }
      .ro_img {
        z-index: -1;
        width: 30%;
        position: absolute;
        top: 10%;
        left: 35%;
        -webkit-animation:run 8s linear 0s infinite;
      }
       @-webkit-keyframes run{
        from{
            -webkit-transform:rotate(0deg);
        }
        to{
            -webkit-transform:rotate(360deg);
        }
    }
    .jump {
      height: 7rem;
      width: 3rem;
      // background-color: aqua;
      position: absolute;
      z-index: 3;
      .ball1 {
        height: 2rem;
        width: 2rem;
        border-radius: 50%;
        background: linear-gradient(
        to bottom,
        rgb(255,243,204),
        rgb(255,236,196)
      );
      -webkit-animation: bounce-down 3s linear infinite;animation: bounce-down 3s linear infinite;
      }
      .ball2 {
        height: 2rem;
        width: 2rem;
        border-radius: 50%;
        background: linear-gradient(
        to bottom,
        rgb(226,253,226),
        rgb(196,238,222)
      );
      -webkit-animation: bounce-down 3.5s linear infinite;animation: bounce-down 3.5s linear infinite;
      }
      .ball3 {
        height: 2rem;
        width: 2rem;
        border-radius: 50%;
        background: linear-gradient(
        to bottom,
        rgb(209,249,248),
        rgb(182,239,236)
      );
      -webkit-animation: bounce-down 3.5s linear infinite;animation: bounce-down 3.5s linear infinite;
      }
      .ball4 {
        height: 2rem;
        width: 2rem;
        border-radius: 50%;
        background: linear-gradient(
        to bottom,
        rgb(243,208,252),
        rgb(211,184,255)
      );
      -webkit-animation: bounce-down 3s linear infinite;animation: bounce-down 3s linear infinite;
      }
       .ball5 {
        height: 2rem;
        width: 2rem;
        border-radius: 50%;
        background: linear-gradient(
        to bottom,
        rgb(255,241,202),
        rgb(255,232,191)
        );
         -webkit-animation: bounce-down 2s linear infinite;animation: bounce-down 2s linear infinite;
      }
      @-webkit-keyframes bounce-down {
        25% {-webkit-transform: translateY(-1.5rem);}
        50%, 100% {-webkit-transform: translateY(0);}
        75% {-webkit-transform: translateY(1.5rem);}
      }

      @keyframes bounce-down {
        25% {transform: translateY(-1.5rem);}
        50%, 100% {transform: translateY(0);}
        75% {transform: translateY(1.5rem);}
      }
    }
    .entry {
      position: absolute;
      z-index: 2;
      .round {
        height: 7rem;
        width: 7rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        .el-image {
          width: 50%;
        }
      }
      .text {
        text-align: center;
        padding: 5px 0;
      }
    }
    #bkgc1 {
      background: linear-gradient(
        to bottom,
        rgb(185, 243, 178),
        rgb(89, 224, 55)
      );
    }
    #bkgc2 {
      background: linear-gradient(
        to bottom,
        rgb(60, 210, 254),
        rgb(46, 171, 255)
      );
    }
    #bkgc3 {
      background: linear-gradient(
        to bottom,
        rgb(174, 168, 254),
        rgb(130, 120, 243)
      );
    }
    #bkgc4 {
      background: linear-gradient(
        to bottom,
        rgb(252, 215, 85),
        rgb(255, 177, 43)
      );
    }
    #bkgc5 {
      background: linear-gradient(
        to bottom,
        rgb(254, 172, 149),
        rgb(235, 121, 143)
      );
    }
    #bkgc6 {
      background: linear-gradient(
        to bottom,
        rgb(229, 159, 249),
        rgb(169, 115, 255)
      );
    }
    #bkgc7 {
      background: linear-gradient(
        to bottom,
        rgb(252, 214, 83),
        rgb(255, 177, 43)
      );
    }
    #bkgc8 {
      background: linear-gradient(
        to bottom,
        rgb(136, 216, 255),
        rgb(71, 137, 255)
      );
    }
  }
}
</style>
