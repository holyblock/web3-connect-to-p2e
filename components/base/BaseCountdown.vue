<template>
  <div class="baseCountdown pos--rel">
    <div class="baseCountdown__main flex gap--12 alignI--center justifyC--center">
      <IconWatch v-if="!simple" class="baseCountdown__icon fill--white pos--rel z--2" />
      <p class="baseCountdown__label ff--slab fs--20 fw--600">
        <slot />
      </p>
    </div>
    <SvgBg class="baseCountdown__bg fill--white pos--abs z--1 o--1" />
  </div>
</template>

<script>
import IconWatch from '~/assets/svgs/interface/watch.svg'
import SvgBg from '~/assets/svgs/interface/btn-bg.svg'

export default {
  name: 'BaseCountdown',
  components: {
    IconWatch,
    SvgBg
  },
  props: {
    simple: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.baseCountdown {
  &__main {
    min-height: 50px;
    padding: 8px 0;
  }

  //
  &__bg {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
/*----------------------------------------*/

// 960
@include breakpoint(l) {
  .baseCountdown {
    &__icon {
      width: 18px;
      height: 24px;
    }

    &__label {
      font-size: 18px;
    }
  }
}
</style>
