<template>
  <el-dialog
    :visible.sync="visible"
    :before-close="close"
    :modal="false"
    v-dialogDrag
    v-zindexClick
    :data-tag="isDrag"
    v-bind="$attrs"
    ref="thisDialog"
  >
    <div class="imgheader" slot="title">
      <div class="titlespan">
        <span
          v-show="isShowLight"
          :class="story"
          ref="headerlight"
          class="light"
        ></span>
        <i :class="iconClass"></i>
        <span class="title-span">{{ title }}</span>
      </div>
      <div class="title-c"></div>
      <div class="title-r"></div>
    </div>
    <div
      slot="footer"
      :class="turnBigger ? 'min' : 'max'"
      @click="checkMax()"
      v-show="maxVisiable"
    ></div>
    <div class="dia-content" :class="isclip">
      <component
        :is="comp"
        :datas="dataResult"
        v-model="isClose"
        @lightchange="light"
        :ismax="isCpMax"
        :turnBigger="turnBigger"
        ref="component"
      >
      </component>
    </div>
    <div class="rtCore"></div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      compName: this.name,
      visible: true,
      isClose: false,
      isCpMax: true,
      story: '',
    };
  },
  created() {
    var that = this;
    this.$nextTick(function () {
      this.$refs.thisDialog.$refs.dialog.style.left = this.left;
      //(this.left || (document.body.clientWidth - parseInt(this.width)) * 0.5) + "px";

      this.$refs.thisDialog.$refs.dialog.style.top = this.top;
      //(this.top || (document.body.clientHeight - parseInt(this.height)) * 0.5) +        "px";
      // this.beginTop = this.$refs.thisDialog.$refs.dialog.style.top;
      // this.beginLeft = this.$refs.thisDialog.$refs.dialog.style.left;
      document.getElementById(this.id).children[0].style.width = this.width;
      document.getElementById(this.id).children[0].style.height = this.height;
      that.$refs.headerlight.addEventListener(
        'webkitAnimationEnd',
        function () {
          that.story = '';
        },
        false,
      );
    });
  },
  watch: {
    isClose: function () {
      this.close();
    },
  },
  computed: {
    comp: function () {
      return require(`@/${this.name}`).default; // TODO
    },
  },
  components: {
    //compname :resolve=>require([`src/page/${this.name}`],resolve)
  },
  props: {
    iconClass: {
      type: String,
      default: 'icon icon-manager',
    },
    height: {
      type: String,
      default: '990',
    },
    width: {
      type: String,
      default: '1284',
    },
    id: {
      type: String,
    },
    dataResult: {
      type: Array,
      default: () => {},
    },
    isOpenMulti: {
      type: Boolean,
      default: true,
    },
    customClass: {
      type: String,
    },
    left: {
      type: String,
      default: '-1',
    },
    top: {
      type: String,
      default: '76',
    },
    bigLeft: {
      type: String,
      default: '0',
    },
    bigTop: {
      type: String,
      default: '0',
    },
    minLeft: {
      type: String,
      default: '0',
    },
    minTop: {
      type: String,
      default: '0',
    },
    maxVisiable: {
      type: Boolean,
      default: false,
    },
    iscenter: {
      type: String,
      default: 'false',
    },
    isDrag: {
      type: String,
      default: 'false',
    },
    center: {
      type: Boolean,
      default: false,
    },
    turnBigger: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
    },
    title: {
      type: String,
    },
    closeOnClickModal: {
      type: Boolean,
      default: false,
    },

    showClose: {
      type: Boolean,
      default: true,
    },

    beforeClose: {
      type: Function,
    },

    lockScroll: {
      type: Boolean,
      default: false,
    },

    maxWidth: {
      type: String,
    },

    maxHeight: {
      type: String,
    },
    minWidth: {
      type: String,
    },
    minHeight: {
      type: String,
    },
    // 动态component完成自己的任务后是否关闭弹窗，默认为是
    closeAfterDone: {
      type: Boolean,
      default: true,
    },
    isclip: {
      type: String,
      default: '',
    },
    isShowLight: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    // 组件处理完自己的事情触发，默认关闭弹窗
    handleComponentDone() {
      if (this.closeAfterDone) this.close();
    },

    handleComponentCancel() {
      this.close();
    },

    checkMax: function () {
      if (this.turnBigger == false) {
        this.isCpMax = true;
        this.turnBigger = true;
        document.getElementById(this.id).children[0].style.left = this.bigLeft;
        document.getElementById(this.id).children[0].style.top = this.bigTop;
        document.getElementById(this.id).children[0].style.width =
          this.maxWidth;
        document.getElementById(this.id).children[0].style.height =
          this.maxHeight;
      } else {
        this.initMin();
      }
    },

    initMin: function () {
      this.isCpMax = false;
      this.turnBigger = false;
      document.getElementById(this.id).children[0].style.left = this.minLeft;
      document.getElementById(this.id).children[0].style.top = this.minTop;
      document.getElementById(this.id).children[0].style.width = this.minWidth;
      document.getElementById(this.id).children[0].style.height =
        this.minHeight;
    },

    close(done) {
      if (this.beforeClose) this.beforeClose();
      // 从handleComponentDone处调用的close没有done参数
      if (done) {
        done();
      } else {
        this.visible = false;
      }

      this.$refs.component.$destroy();
      //var app = document.getElementById('app');
      var idObject = document.getElementById(this.id);

      document.body.removeChild(idObject);

      var index = this.$el.style.zIndex;
      var list = this.$store.state.zindexList;
      var index2 = list.indexOf(index);
      if (index2 > -1) {
        list.splice(index2, 1);
        this.$store.commit('setIndexList', list);
      }

      if (this.isOpenMulti) {
        var dialogTitle = this.$store.state.dialogTitle;
        var dialogindex = dialogTitle.indexOf(this.title);
        dialogTitle.splice(dialogindex, 1);
        this.$store.commit('setDialog', dialogTitle);
      }
    },
    show() {
      this.visible = true;
    },
    light: function () {
      this.story = 'light-visiable';
    },
  },
};
</script>
