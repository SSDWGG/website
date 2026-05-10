<template>
  <div id="menu">
    <canvas id="LxCanvas" class="LxCanvas"></canvas>
  </div>
</template>

<script>

import Stars from './Star'
import Moon from './Moon'
import Meteor from './Meteor'

export default {
  mounted() {
    let canvas = document.getElementById('LxCanvas'),
      ctx = canvas.getContext('2d'),
      width = window.innerWidth,
      height = window.innerHeight,
      //实例化月亮和星星。流星是随机时间生成，所以只初始化数组
      moon = new Moon(ctx, width, height),
      stars = new Stars(ctx, width, height, 1500),
      meteors = [],
      count = 0

    canvas.width = width;
    canvas.height = height;

    const meteorGenerator = () => {
      let x = Math.random() * 4 * width 
      meteors.push(new Meteor(ctx, x, height))

      //每隔随机时间，生成新流星
      setTimeout(() => {
        meteorGenerator()

      }, Math.random() * 500)
    }

    const frame = () => {
      count++
      count % 10 == 0 && stars.blink()
      moon.draw()
      stars.draw()

      meteors.forEach((meteor, index, arr) => {
        //如果流星离开视野之内，销毁流星实例，回收内存
        if (meteor.flow()) {
          meteor.draw()
        } else {
          arr.splice(index, 1)
        }
      })
      requestAnimationFrame(frame)
    }
    meteorGenerator()
    frame()
  }
}
</script>

<style scoped>
#menu {
  height: 100%;
  overflow: hidden;
  position: relative;
}

.LxCanvas {
  position: fixed;
  /* z-index: -1; */
  z-index: 9999;
  opacity: .2;
  pointer-events: none;
}
</style>