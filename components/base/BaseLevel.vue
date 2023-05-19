<template>
  <div class="baseLevel z--2 pos--rel">
    <p class="baseLevel__value ff--slab fs--24 fw--700 pos--abs xy--center z--2">{{ level }}</p>
    <div class="baseLevel__bg pos--abs inset z--1" />
  </div>
</template>
<script>
export default {
  name: 'BaseLevel',
  props: {
    level: {
      type: Number,
      default: null
    }
  }
}
</script>
<style lang="scss">
.baseLevel {
  border-radius: 50%;
  height: 50px;
  width: 50px;

  &__bg {
    background: url('/images/interface/level-bg.png') center no-repeat;
    background-size: cover;
    height: 100%;
    width: 100%;
  }

  &__value {
    text-shadow: 0px 2px 1px #9e5709;
    top: 47%;
  }
}

// 500
@include breakpoint(xs) {
  .baseLevel {
    height: 40px;
    width: 40px;

    &__value {
      font-size: 20px;
    }
  }
}
</style>
