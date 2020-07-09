<template>
  <el-row>
    <el-col :span="24">
      <div class="option">
        <div class="content">
          <div
            v-for="(item, index) in sort"
            :key="index"
            class="entry"
            :style="{ top: item.top, left: item.left }"
          >
            <div :id="idName[index]" class="round" @click="changCon(index)">
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
      sort: [
        {
          pic: require("../../../public/img/insurance.png"),
          text: "社会保险",
          top: "0%",
          left: "35%"
        },
        {
          pic: require("../../../public/img/remuneration.png"),
          text: "劳动报酬",
          top: "25%",
          left: "15%"
        },
        {
          pic: require("../../../public/img/econ.png"),
          text: "经济补偿金",
          top: "50%",
          left: "35%"
        },
        {
          pic: require("../../../public/img/wage.png"),
          text: "双倍工资",
          top: "75%",
          left: "15%"
        },
        {
          pic: require("../../../public/img/inductrial_injury.png"),
          text: "工伤",
          top: "0%",
          left: "65%"
        },
        {
          pic: require("../../../public/img/compensation.png"),
          text: "赔偿金",
          top: "25%",
          left: "85%"
        },
        {
          pic: require("../../../public/img/labor_relations.png"),
          text: "劳动关系",
          top: "50%",
          left: "65%"
        },
        {
          pic: require("../../../public/img/other.png"),
          text: "其他",
          top: "75%",
          left: "85%"
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
  width: 85%;
  height: 75vh;
  display: flex;
  justify-content: center;
  // background-image: url("../../../public/img/bkg.png");
  .context {
    font-size: 16px;
    text-indent: 2em;
  }
  .content {
    background-image: url("../../../public/img/bkg.png");
    background-repeat: no-repeat;
    background-size: 90%;
    background-position: 45% 45%;
    width: 100%;
    height: 100%;
    margin: 10px 0;
    position: relative;
    .entry {
      position: absolute;
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
