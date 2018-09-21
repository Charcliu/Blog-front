<template>
    <div class="blogDetail">
        <mavon-editor v-model="blogInfo.content" defaultOpen="preview" :toolbarsFlag="false" :subfield="false" :preview="true" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'blogDetail',
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['GET_CURRENT_BLOG_DETAIL']),
    blogInfo () {
      return this.GET_CURRENT_BLOG_DETAIL
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
