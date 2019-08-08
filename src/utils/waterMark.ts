const setWaterMark = (str: string[]) => {
  const id: string = 'water-mark';
  const dom: HTMLElement | null = document.getElementById(id);
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  canvas.width = 500;
  canvas.height = 200;
  const ctx: any = canvas.getContext('2d');
  ctx.font = '18px 微软雅黑';
  ctx.fillStyle = 'rgba(204, 204, 204, 0.5)';
  ctx.fillText('123', 0, 18, 100);
  const div: HTMLElement = document.createElement('div');
  div.style.pointerEvents = 'none';
  div.style.top = '-500px';
  div.style.left = '-500px';
  div.style.position = 'fixed';
  div.style.width = `${document.documentElement.clientWidth + 1000}px`;
  div.style.height = `${document.documentElement.clientHeight + 1000}px`;
  div.style.background = `url(${canvas.toDataURL('image/png')}) top left repeat`;
  div.style.transform = 'rotate(-15deg)';
  document.body.appendChild(div);
};

export default class Watermark {
  public option: any = {};
  public strings: string[] = [];
  private id: string = 'water-mark';
  private intervalId: number = 0;
  constructor(strings: string[]) {
    this.strings = strings;
    // console.log(this.strings);
  }
  /**
   * setMark
   */
  public setMark() {
    this.intervalId = setInterval(() => {
      const dom: HTMLElement | null = document.getElementById(this.id);
      const style: any = dom ? dom.style : {};
      const hidden = style.display === 'none';
      const visibility = style.visibility === 'hidden';
      const bgNone = style.background === 'none';
      if (dom === null || hidden || visibility || bgNone) {
        this.createMark();
      }
    }, 1000);
  }
  /**
   * destroy
   */
  public destroy() {
    const dom: HTMLElement | null = document.getElementById(this.id);
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (dom) {
      document.body.removeChild(dom);
    }
  }
  private createMark() {
    const { canvasWidth = 500, canvasHeight = 200 } = this.option;
    const id = this.id;
    const dom: HTMLElement | null = document.getElementById(id);
    if (dom) {
      document.body.removeChild(dom);
    }
    const canvas: HTMLCanvasElement = this.createCanvas();
    const div: HTMLElement = document.createElement('div');
    div.id = 'water-mark';
    div.style.pointerEvents = 'none';
    div.style.position = 'fixed';
    div.style.top = `-${canvasWidth}px`;
    div.style.left = `-${canvasHeight}px`;
    div.style.width = `${document.documentElement.clientWidth + canvasWidth * 2}px`;
    div.style.height = `${document.documentElement.clientHeight + canvasHeight * 2}px`;
    div.style.background = `url(${canvas.toDataURL('image/png')}) top left repeat`;
    div.style.transform = 'rotate(-15deg)';
    document.body.appendChild(div);
  }
  private createCanvas(): HTMLCanvasElement {
    const { option, strings } = this;
    const { font, fillStyle, canvasWidth, canvasHeight } = option;
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = canvasWidth || 500;
    canvas.height = canvasHeight || 200;
    const ctx: any = canvas.getContext('2d');
    ctx.font = font || '18px 微软雅黑';
    ctx.fillStyle = fillStyle || 'rgba(204, 204, 204, 0.5)';
    let x = 0;
    strings.forEach((str: string) => {
      const strWidth = ctx.measureText(str).width;
      ctx.fillText(str, x, 80);
      x += strWidth + 80;
    });
    return canvas;
  }
}

// export default {
//   set: (str: string[]) => {
//     setWaterMark(str);
//   },
// };
