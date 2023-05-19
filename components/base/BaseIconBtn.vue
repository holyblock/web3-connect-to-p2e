<template>
  <component
    :is="wrapperTag"
    :href="link ? link : null"
    :target="external ? '_blank' : null"
    :class="'baseIconBtn--' + size"
    class="baseIconBtn flex flex--inline placeC--center pos--rel ta--center buttonReset">
    <!--  -->

    <SvgBg :class="'baseIconBtn__bg--' + bgColor" class="baseIconBtn__bg pos--abs inset z--1" />

    <IconBell v-if="icon === 'bell'" class="baseIconBtn__icon fill--black pos--rel z--2" />
    <IconQuestion v-else-if="icon === 'question'" class="baseIconBtn__icon fill--black pos--rel z--2" />
    <IconGear v-else-if="icon === 'gear'" class="baseIconBtn__icon fill--black pos--rel z--2" />
    <IconEth v-else-if="icon === 'eth'" class="baseIconBtn__icon pos--rel z--2" />
    <IconUpgrade
      v-else-if="icon === 'upgrade'"
      class="baseIconBtn__icon baseIconBtn__icon--upgrade fill--white pos--rel z--2" />

    <IconArrow
      v-else-if="icon === 'arrow'"
      :class="'baseIconBtn__arrow--' + arrowDir"
      class="baseIconBtn__arrow fill--white pos--rel z--2" />

    <span v-else-if="icon === 'none'" class="fs--18 ff--slab fw--500 z--2">
      <slot />
    </span>

    <!--  -->
  </component>
</template>

<script>
import IconBell from '~/assets/svgs/interface/bell.svg'
import IconQuestion from '~/assets/svgs/interface/question.svg'
import IconGear from '~/assets/svgs/interface/gear.svg'
import IconEth from '~/assets/svgs/interface/eth.svg'
import IconUpgrade from '~/assets/svgs/interface/upgrade.svg'

import IconArrow from '~/assets/svgs/interface/arrow-head.svg'

import SvgBg from '~/assets/svgs/interface/icon-btn-bg.svg'

export default {
  name: 'BaseIconBtn',
  components: {
    IconBell,
    IconQuestion,
    IconGear,
    IconEth,
    IconUpgrade,
    IconArrow,
    SvgBg
  },
  props: {
    link: {
      type: String,
      default: ''
    },
    external: {
      type: Boolean,
      default: false
    },
    parentLink: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: 'none',
      validator(value) {
        return ['bell', 'question', 'gear', 'eth', 'arrow', 'none', 'upgrade'].includes(value)
      }
    },
    bgColor: {
      type: String,
      default: 'grey',
      validator(value) {
        return ['grey', 'blue', 'green', 'white'].includes(value)
      }
    },
    arrowDir: {
      type: String,
      default: 'top',
      validator(value) {
        return ['top', 'right', 'bottom', 'left'].includes(value)
      }
    },
    size: {
      type: String,
      default: ''
    }
  },
  computed: {
    wrapperTag() {
      if (this.parentLink) return 'div'
      else if (this.link) return resolveComponent('NuxtLink')
      else return 'button'
    }
  }
}
</script>

<style lang="scss">
.baseIconBtn {
  width: 40px;
  height: 40px;

  &__icon {
    width: 100%;
    height: 100%;
    max-width: 16px;
    max-height: 16px;
    transition: transform 0.8s $easeCubic;

    &--upgrade {
      max-width: 20px;
      max-height: 20px;
    }
  }

  &__arrow {
    width: 20px;
    height: 20px;

    &--top {
      transform: rotate(180deg);
    }

    &--right {
      transform: rotate(-90deg);
    }

    &--left {
      transform: rotate(90deg);
    }
  }

  &__bg {
    width: 100%;
    height: 100%;
    transition: transform 0.8s $easeCubic;

    &--grey {
      fill: #cdcac8;
    }

    &--blue {
      fill: #627eea;
    }

    &--green {
      fill: $greenLight;
    }

    &--white {
      fill: rgba(#fff, 0.05);
      stroke-opacity: 0.5;
    }
  }

  //
  &--small {
    width: 32px;
    height: 32px;
  }

  &--smaller {
    width: 20px;
    height: 20px;

    .baseIconBtn__icon {
      max-width: 12px;
      max-height: 12px;
    }
  }

  &--inactive {
    pointer-events: none;
    opacity: 0.2;
  }

  //
  &:hover {
    .baseIconBtn__icon {
      transform: scale(1.15);
    }

    .baseIconBtn__bg {
      transform: scale(0.95);
    }
  }
}
/*----------------------------------------*/

// 350
@include breakpoint(t) {
  .baseIconBtn {
    width: 32px;
    height: 32px;

    &--smaller {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
