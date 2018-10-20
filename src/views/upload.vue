<template>
    <div>
        <input ref="files" type="file" name="avatar" id="avatar" v-on:change="upload">
        <el-upload
            class="upload-demo"
            action="api/uploadDownload/uploadImage"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <img src="https://172.31.120.61:8080/uploadDownload/downloadImage?imageName=photo.png" width="50" alt="">
        <img src="https://172.31.120.61:8080/uploadDownload/downloadImage?imageName=WechatIMG4.jpeg" width="50" alt="">
        <a href="https://172.31.120.61:8080/uploadDownload/downloadImage?imageName=WechatIMG4.jpeg">Download</a>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'upload',
  data () {
    return {
      fileList: [
        {
          name: 'food.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          name: 'food2.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ]
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    upload: function (e) {
      //   上传
      let file = e.target.files[0]
      let param = new FormData() // 创建form对象
      param.append('file', file, file.name) // 通过append向form对象添加数据
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      } // 添加请求头
      axios
        .post('api/uploadDownload/uploadImage', param, config)
        .then(response => {
          console.log(response.data)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
