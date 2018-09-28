<template>
    <div class="header">
        <span class="title">{{header.title}}</span>
        <span @click="header.reback.callBack" v-if="header.reback" class="rebackBtn">
          {{header.reback.content}}
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
  font-size: 2em;
  height: $header-height;
  line-height: $header-height;
  .title {
    padding-left: 1.25rem;
  }
  .rebackBtn {
    border: 1px solid white;
    font-size: 12px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    padding: 0px 10px;
    border-radius: 5px;
    margin-right: 20px;
  }
}
</style>
