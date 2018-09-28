<template>
    <div> 
        <div class="title">
            <h3>{{item.title}}</h3>
            <BlogOperate></BlogOperate>
        </div>
        <div class="detail">
            <div class="vistor">
                <i class="el-icon-view"></i>
                <span>
                {{item.vistor_count}}
                </span>
            </div>
            <div class="time">
                <i class="el-icon-date"></i>
                <span>
                {{item.time}}
                </span>
            </div>
        </div>
    </div>
</template>
<script>
import BlogOperate from '@/components/BlogOperate'

export default {
  props: ['item'],
  data() {
    return {}
  },
  components: {
    BlogOperate
  }
}
</script>
<style lang="scss" scoped>
.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.detail {
  display: flex;
  flex-direction: row;
  align-items: center;
  div:last-child {
    margin-left: 10px;
  }
}
</style>

