<template>
  <el-select collapse-tags v-model="curValue" multiple clearable @change="changeMultiSelect">
    <el-option
      v-for="opt in compOptions"
      :key="opt[optionKey]"
      :label="opt[labelKey]"
      :value="opt[valueKey]"
    ></el-option>
  </el-select>
</template>
<script lang='ts'>
// js version
// export default {
//   props: {
//     value: {
//       required: true,
//     },
//     optionList: {
//       type: Array,
//       default: () => [],
//     },
//     optionKey: {
//       type: String,
//       default: 'value',
//     },
//     labelKey: {
//       type: String,
//       default: 'label',
//     },
//     valueKey: {
//       type: String,
//       default: 'value',
//     }
//   },
//   data() {
//     return {
//       curValue: this.value,
//       oldValue: [],
//     }
//   },
//   computed: {
//     compOptions() {
//       let { optionList, labelKey, valueKey } = this
//       let all = {}
//       all[labelKey] = '全部'
//       all[valueKey] = '全部'
//       return [all].concat(optionList)
//     }
//   },
//   // watch: {
//   //   value(val, oldValue) {
//   //     this.setCurrentValue(val);
//   //   }
//   // },
//   methods: {
//     changeMultiSelect(curValue){
//       console.log(curValue)
//       console.log(this.$slots)
//       const { oldValue, valueKey, compOptions } = this
//       const hasAll = oldValue.includes('全部')
//       const flag = curValue.includes('全部')
//       let value
//       if(!hasAll && flag) {
//         // 选中全部
//         value = compOptions.map((item) => item[valueKey])
//       }
//       if(hasAll && !flag) {
//         // 取消选中全部
//         value = []
//       }
//       if(hasAll && flag) {
//         // 新老数据都有全选,表明点击非全选,取消全选
//         const index = curValue.findIndex((val) => val === '全部')
//         curValue.splice(index, 1)
//         value = curValue
//       }
//       if(!hasAll && !flag) {
//         // 都没全选,但所有数据已全部选上
//         if(curValue.length === compOptions.length - 1) {
//           value = ['全部'].concat(curValue)
//         } else {
//           value = curValue
//         }
//       }
//       this.oldValue = [...value]
//       this.curValue = [...value]
//       // emit的绑定value不要全部
//       const emitValue = value.filter((val) => val !== '全部')
//       this.$emit('change', emitValue)
//     },
//   }
// }
</script>

<script lang="ts">
import { Component, Vue, Prop, PropSync, Model, Watch } from 'vue-property-decorator';
@Component
export default class AllSelect extends Vue {
  @Prop({
    type: Array,
    default: () => [],
  }) public optionList!: any[];

  @Prop({
    type: String,
    default: 'value',
  }) public optionKey!: string ;

  @Prop({
    type: String,
    default: 'label',
  }) public labelKey!: string;
  @Prop({
    type: String,
    default: 'value',
  }) public valueKey!: string;
  @Prop({
    required: true,
  }) public value!: any;

  curValue: any = this.value
  public oldValue: Array<number | string> = [];

  get compOptions(): object[] {
    const { optionList, labelKey, valueKey } = this;
    const all: any = {};
    all[labelKey] = '全部';
    all[valueKey] = '全部';
    return [all].concat(optionList);
  }

  @Watch('value') valueChange(value: Array<number | string>, oldValue: Array<number | string>) {
    if(value.length === this.optionList.length) {
      // 子组件emit或父组件赋值了列表全部value,需勾上全选
      const {compOptions, valueKey} = this
      this.curValue = compOptions.map((item: any) => item[valueKey])
    } else {
      this.curValue = value
      this.oldValue = value
    }
  }

  changeMultiSelect(curValue: any){
    const { oldValue, valueKey, compOptions } = this
    const hasAll = oldValue.includes('全部')
    const flag = curValue.includes('全部')
    let value
    if(!hasAll && flag) {
      // 选中全部
      value = compOptions.map((item: any) => item[valueKey])
    }
    if(hasAll && !flag) {
      // 取消选中全部
      value = []
    }
    if(hasAll && flag) {
      // 新老数据都有全选,表明点击非全选,取消全选
      const index = curValue.findIndex((val: number | string) => val === '全部')
      curValue.splice(index, 1)
      value = curValue
    }
    if(!hasAll && !flag) {
      // 都没全选,但所有数据已全部选上
      if(curValue.length === compOptions.length - 1) {
        value = ['全部'].concat(curValue)
      } else {
        value = curValue
      }
    }
    this.oldValue = [...value]
    this.curValue = [...value]
    // emit的绑定value不要全部
    const emitValue = value.filter((val: number | string) => val !== '全部')
    this.$emit('change', emitValue)
  }
}
</script>

