<template>
  <div>
    <Handler id="handler"></Handler>
    <div>
      <el-button @click="confirm">确认</el-button>
    </div>
  </div>
</template>

<script>

import Handler from '@/components/Handler'

export default {
  components: { Handler },
  methods: {
    confirm () {
      this.$confirm('确定要结束吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        alert(111)
      }).catch(() => {
      })
    }
  }
}
</script>

<style>
#handler {
  position: relative;
}
</style>
