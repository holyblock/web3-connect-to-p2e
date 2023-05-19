<template>
  <div class="baseStat pos--rel z--3">
    <!--  -->

    <div class="baseStat__content pos--rel z--2">
      <div class="baseStat__name flex alignI--center gap--8">
        <IconTreasure v-if="icon === 'treasure'" class="baseStat__icon fill--green" />
        <IconDonations v-if="icon === 'donations'" class="baseStat__icon fill--green" />
        <IconShip v-if="icon === 'ship'" class="baseStat__icon fill--green" />
        <IconTimer v-if="icon === 'timer'" class="baseStat__icon fill--green" />
        <h3
          class="baseStat__header fc--black ff--slab fs--14 fw--300 lh--140 o--6"
          :class="{ 'baseStat__header--dark': isDark }">
          {{ header }}
        </h3>
      </div>
      <div class="baseStat__values flex gap--8" :class="{ 'baseStat__values--dark': isDark }">
        <p v-if="!endDate" class="baseStat__label1 fc--black fs--20 fw--500 lh--100 alignS--end">{{ label1 }}</p>
        <p v-if="label2" class="baseStat__label2 fc--black fs--11 fw--500 o--5 alignS--end">{{ label2 }}</p>
        <CountdownTimer
          class="baseStat__label1 fc--black fs--20 fw--500 lh--100 alignS--end"
          v-if="endDate"
          :endDate="endDate" />
      </div>
    </div>

    <IconBg class="baseStat__bg pos--abs z--1" :class="{ 'baseStat__bg--dark': isDark }" />
  </div>
</template>

<script>
import IconBg from '~/assets/svgs/interface/stat-bg.svg'
import IconTreasure from '~/assets/svgs/interface/treasure.svg'
import IconDonations from '~/assets/svgs/interface/donations.svg'
import IconShip from '~/assets/svgs/interface/ship.svg'
import IconTimer from '~/assets/svgs/interface/end-of-season.svg'

export default {
  name: 'BaseStat',
  components: {
    IconBg,
    IconTreasure,
    IconDonations,
    IconShip,
    IconTimer
  },
  props: {
    icon: {
      type: String,
      default: ''
    },
    header: {
      type: String,
      default: ''
    },
    label1: {
      type: String,
      default: ''
    },
    label2: {
      type: String,
      default: ''
    },
    endDate: {
      type: String,
      default: ''
    },
    isDark: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.baseStat {
  width: 260px;

  &__content {
    padding: 24px;
  }

  &__name {
    margin-bottom: 8px;
  }

  &__header {
    &--dark {
      color: white;
    }
  }

  &__values {
    &--dark {
      p {
        color: white;
      }
    }
  }

  &__icon {
    width: 20px;
  }

  //
  &__bg {
    inset: 0;
    width: 100%;
    height: 100%;

    &--dark {
      fill: #1e212e;

      path {
        stroke: #1e212e;
      }
    }
  }
}
/*----------------------------------------*/

// 600
@include breakpoint(s) {
  .baseStat {
    width: 100%;
    max-width: 260px;

    &__content {
      padding: 24px 20px;
    }

    &__icon {
      width: 16px;
    }

    &__header {
      font-size: 12px;
    }

    &__label1 {
      font-size: 18px;
    }

    &__label2 {
      display: none;
    }
  }
}
/*----------------------------------------*/

// 600
@include breakpoint(s) {
  .baseStat {
    &__name {
      display: block;
    }
  }
}
</style>
