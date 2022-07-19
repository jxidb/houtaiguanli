<template>
  <!-- inline表示的排列方式， 是单行还是上下排列 -->
  <!-- model表示的是表单数据对象 -->
  <!-- 	label-width表示的是表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。 -->

  <el-form ref="form" :model="form" label-width="100px" :inline="inline">
    <!-- label表示的是标签文本 -->

    <el-form-item v-for="item in formLabel" :key="item.label" :label="item.label">
      <el-input v-if="item.type === 'input'" :placeholder="`请输入${item.label}`" v-model="form[item.model]"></el-input>

      <el-switch v-model="form[item.model]" v-if="item.type === 'switch'"></el-switch>

      <el-date-picker v-model="form[item.model]" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-if="item.type === 'date'"></el-date-picker>

      <el-select v-model="form[item.model]" placeholder="请选择" v-if="item.type === 'select'">
        <el-option v-for="item1 in item.opts" :key="item1.value" :label="item1.label" :value="item1.value"> </el-option>
      </el-select>
    </el-form-item>

    <el-form-item>
      <slot></slot>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'Form',

  props: {
    formLabel: Array,
    form: Object,
    inline: Boolean
  }
}
</script>
<style lang=""></style>
