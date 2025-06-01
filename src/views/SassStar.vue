<template>
  <div class="sass-star-container">
    <div v-for="(item, index) in layer" :key="index" :class="item.class"></div>
  </div>
</template>

<script setup lang="ts">
const layer = reactive([
  { class: 'layer1' },
  { class: 'layer2' },
  { class: 'layer3' },
  { class: 'layer4' },
  { class: 'layer5' },
]);
</script>

<style lang="scss" scoped>
@use 'sass:math';
@use 'sass:string';

@function star($n) {
  $result: '#{math.random(100)}vw #{math.random(100)}vh #fff';
  @for $i from 2 through $n {
    $result: '#{$result}, #{math.random(100)}vw #{math.random(100)}vh #fff';
  }
  @return string.unquote($result);
}

$n: 5;
$duration: 400s;
$count: 1000;
@for $i from 1 through $n {
  $duration: math.floor(math.div($duration, 2));
  $count: math.floor(math.div($count, 2));
  .layer#{$i} {
    position: absolute;
    width: #{$i}px;
    height: #{$i}px;
    top: 0;
    left: 0;
    border-radius: 50%;
    box-shadow: star($count);
    animation: moveUp $duration linear infinite;
  }
  .layer#{$i}::after {
    content: '';
    position: inherit;
    left: 0;
    top: 100vh;
    width: inherit;
    height: inherit;
    border-radius: inherit;
    box-shadow: inherit;
  }
}

@keyframes moveUp {
  to {
    transform: translateY(-100vh);
  }
}

.sass-star-container {
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #0a0a1f, #000000);
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  @include flex-center;
}
</style>
