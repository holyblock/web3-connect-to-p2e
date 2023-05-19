<template>
  <div class="basePanel pos--rel">
    <div class="basePanel__content pos--rel z--2">
      <slot />
    </div>
    <img v-if="locked" class="basePanel__bg pos--abs inset z--1" src="/images/interface/panel-locked-bg.png" />
    <img
      v-else
      :class="{ 'basePanel__bg--darker': darker }"
      class="basePanel__bg pos--abs inset z--1"
      src="/images/interface/panel-bg.png" />
  </div>
</template>

<script>
export default {
  name: 'BasePanel',
  props: {
    locked: {
      type: Boolean,
      default: false
    },
    darker: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.basePanel {
  padding: 40px;

  &__content {
    height: 100%;

    hr {
      border: 0;
      border-top: 1px solid rgba(#fff, 0.2);
      margin: 24px 0;
    }
  }

  &__bg {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0px 0px 0px #484c58) drop-shadow(0px 0px 0px #484c58) drop-shadow(0 4px 20px rgba(#000, 0.2));

    &--darker {
      filter: brightness(0.7) drop-shadow(0px 0px 0px #484c58) drop-shadow(0px 0px 0px #484c58)
        drop-shadow(0 4px 20px rgba(#000, 0.2));
    }
  }

  //
  &--condensed {
    padding-top: 28px;
    padding-bottom: 28px;
  }

  &--spaced {
    padding: 40px 64px;
  }
}
/*----------------------------------------*/

// 960
@include breakpoint(l) {
  .basePanel {
    padding: 24px;

    &--spaced {
      padding: 40px 48px;
    }
  }
}
/*----------------------------------------*/

// 500
@include breakpoint(xs) {
  .basePanel {
    padding: 28px;
  }
}
</style>
