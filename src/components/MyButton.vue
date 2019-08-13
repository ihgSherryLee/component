<template>
  <button @click="onClick">
  <slot></slot>
  </button>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class MyButton extends Vue {
  @Prop({
    type: Boolean,
    default: false,
  }) public rounded!: boolean;
  /**
   * onClick
   */
  public onClick() {

  }
}
</script>
