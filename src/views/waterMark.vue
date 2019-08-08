<template>
  <div>
    <button @click="hide">隐藏水印</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import WaterMark from '@/utils/waterMark';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
@Component({
  components: {
    // HelloWorld,
  },
})
export default class WaterMarkVue extends Vue {
  public waterMark: any;
  public mounted() {
    const waterMark = new WaterMark(['abc', 'def', '2019-08-08']);
    waterMark.option = {
      font: '28px 微软雅黑',
      fillStyle: 'rgba(204, 204, 204, 0.5)',
      canvasHeight: 80,
      canvasWidth: 600,
    };
    waterMark.setMark();
    this.waterMark = waterMark;
  }
  public hide() {
    this.waterMark.destroy();
  }
}
</script>
