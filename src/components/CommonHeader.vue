<template>
    <div class="header">
        <span class="title">{{header.title}}</span>
        <span @click="header.rightBtn.callBack" v-if="header.rightBtn" class="rightBtn">
          <i class="el-icon-edit" v-if="header.rightBtn.type === 0"></i>
          <i class="el-icon-back" v-if="header.rightBtn.type === 1"></i>
          <span>{{header.rightBtn.content}}</span>
        </span>
    </div>
</template>
<script>
export default {
  name: 'CommonHeader',
  props: ['headerInfo'],
  data () {
    return {}
  },
  computed: {
    header () {
      return this.headerInfo
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
$header-height: 5rem;

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: white;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 1501;
  font-size: 2rem;
  height: $header-height;
  line-height: $header-height;
  > span {
    width: 40%;
    overflow: hidden;
    white-space: nowrap;
  }
  .title {
    padding-left: 1.25rem;
  }
  .rightBtn {
    padding-right: 1.25rem;
    text-align: right;
    cursor: pointer;
  }
}
</style>
