<template>
  <div class="about">
    <button @click="changeValue">change</button>
    <all-select
      :value="value"
      :option-list="list"
      @change="(val) => value=val" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import allSelect from '@/components/allSelect.vue';

@Component({
  components: {
    allSelect,
  },
})

export default class AllSelect extends Vue {
  public value = [1];
  public list = [
    {
      label: '1',
      value: 1,
    },
    {
      label: '2',
      value: 2,
    },
    {
      label: '3',
      value: 3,
    },
    {
      label: '4',
      value: 4,
    },
  ];

  public changeValue() {
    this.value = [1, 2, 3, 4];
  }
}
</script>

