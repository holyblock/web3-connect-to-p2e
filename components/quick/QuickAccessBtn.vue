<template>
  <button
    :class="[{ 'quickAccessBtn--hidden': page === 'index' }, { 'quickAccessBtn--open': isOpen }]"
    class="quickAccessBtn pos--fix z--max buttonReset"
    @click="toggleMenu">
    <IconQuickAccess />
  </button>
</template>

<script>
import { useGlobalStore } from '@/stores/global'

import IconQuickAccess from '~/assets/svgs/interface/quick-access.svg'

export default {
  name: 'QuickAccessBtn',
  components: {
    IconQuickAccess
  },
  data() {
    return {
      isOpen: computed(() => useGlobalStore().menu),
      page: computed(() => useGlobalStore().page)
    }
  },
  methods: {
    toggleMenu() {
      useGlobalStore().updateMenu(!this.isOpen)
    }
  }
}
</script>

<style lang="scss">
@keyframes textRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.quickAccessBtn {
  right: 48px;
  bottom: 48px;
  width: 112px;
  aspect-ratio: 1;
  visibility: visible;
  transition: opacity 0.5s ease, visbility 0.5s ease;

  &__icon {
    width: 100%;
    aspect-ratio: 1;
    display: block;
  }

  &__iconText {
    animation: textRotate 10s infinite linear;
    transform-origin: center;
  }

  &__iconOuter,
  &__iconBg {
    transition: transform 0.8s $easeCubic;
    transform-origin: center;
  }

  &:hover .quickAccessBtn__iconBg {
    transform: scale(0.93);
  }

  //
  &--hidden {
    opacity: 0;
    visibility: hidden;
  }

  //
  &--open {
    .quickAccessBtn__iconOuter {
      transform: rotate(45deg);
    }
  }
}
/*----------------------------------------*/

// 960
@include breakpoint(l) {
  .quickAccessBtn {
    right: 32px;
    bottom: 32px;
  }
}
/*----------------------------------------*/

// 750
@include breakpoint(m) {
  .quickAccessBtn {
    width: 80px;
  }
}
</style>
