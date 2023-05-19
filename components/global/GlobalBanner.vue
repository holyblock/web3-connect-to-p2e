<template>
  <div class="globalBanner flex flex--dirC alignI--center">
    <!--  -->

    <button v-if="backLink" class="globalBanner__link ta--center ff--slab flex buttonReset" @click="backFunction">
      <IconArrowhead class="globalBanner__arrow" /> Head Back
    </button>

    <h2 class="globalBanner__header ff--slab fs--28 fw--700 lh--140 ta--center">{{ header }}</h2>

    <div v-if="subheader" class="globalBanner__subheader flex alignI--center gap--8">
      <slot name="subheader" />
    </div>

    <!-- <div v-if="subheader === 'battle'" class="globalBanner__subheader flex alignI--center gap--8">
      <BaseMapIcon class="globalBanner__subheaderIcon" type="battle" invert small />
      <p class="globalBanner__subheaderlabel ff--slab fc--para flex alignI--center gap--8">
        Attacks remaining today: <span class="fs--20 fc--white fw--700">5</span>
      </p>
    </div> -->

    <!--  -->
  </div>
</template>

<script>
import IconArrowhead from '~/assets/svgs/interface/arrow-head.svg'

export default {
  name: 'GlobalBanner',
  components: {
    IconArrowhead
  },
  props: {
    backLink: {
      type: Boolean,
      default: false
    },
    backFunction: {
      type: Function,
      default: () => {}
    },
    header: {
      type: String,
      default: ''
    },
    subheader: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.globalBanner {
  margin-bottom: 32px;

  &__link {
    margin-bottom: 20px;
    padding-bottom: 5px;
    border-bottom: 1px solid rgba(#fff, 0.3);
    transition: border-color 0.3s ease;

    &:hover {
      border-color: #fff;

      .globalBanner__arrow {
        transform: rotate(90deg) translateY(3px);
      }
    }
  }

  &__arrow {
    fill: #fff;
    transform: rotate(90deg);
    height: 20px;
    margin-right: 10px;
    transition: transform 0.3s ease;
  }

  &__subheader {
    margin-top: 12px;
  }
}
/*----------------------------------------*/

// 750
@include breakpoint(m) {
  .globalBanner {
    margin-bottom: 24px;

    &__header {
      font-size: 24px;
    }

    &__subheader .fs--20 {
      font-size: 18px;
    }
  }
}
/*----------------------------------------*/

// 500
@include breakpoint(xs) {
  .globalBanner {
    &__header {
      font-size: 20px;
    }
  }
}
</style>
