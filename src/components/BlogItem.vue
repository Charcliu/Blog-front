<template>
    <div>
        <div class="title">
            <h3 @click="toDetail(item)">{{item.title}}</h3>
            <BlogOperate :item="item"></BlogOperate>
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
  data () {
    return {}
  },
  methods: {
    toDetail (item) {
      this.$router.push({ name: 'blogDetail', params: { blogId: item.id } })
    }
  },
  components: {
    BlogOperate
  }
}
</script>
<style lang="scss" scoped>
h3 {
  cursor: pointer;
}

.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  h3{
    width: 80%;
  }
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
