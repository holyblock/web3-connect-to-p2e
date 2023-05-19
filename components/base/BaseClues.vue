<template>
  <div class="baseClues flex alignI--center">
    <img class="baseClues__compass pos--rel z--2" src="/images/interface/clues-compass.png" />

    <div class="baseClues__main pos--rel z--1">
      <div class="baseClues__items grid pos--abs inset z--2" :style="{ gridTemplateColumns: `repeat(${total}, 1fr)` }">
        <div v-for="(el, i) in total" :key="el + i" class="baseClues__item flex placeC--center">
          <IconCross v-if="i < solved" class="baseClues__cross" />
        </div>
      </div>
      <img class="baseClues__paper pos--rel z--1" src="/images/interface/clues-paper.png" />
    </div>
  </div>
</template>

<script>
import IconCross from '~/assets/svgs/interface/cross.svg'

export default {
  name: 'BaseClues',
  components: {
    IconCross
  },
  props: {
    total: {
      type: Number,
      default: 12
    },
    solved: {
      type: Number,
      default: 4
    }
  }
}
</script>

<style lang="scss">
.baseClues {
  max-width: 510px;

  &__compass {
    width: 58px;
    height: 60px;
  }

  &__main {
    flex: 1;
    margin-left: -16px;
  }

  &__items {
    border-left: 1px solid rgba($black, 0.1);
    padding: 0 4px 0 20px;
  }

  &__item {
    border-right: 1px solid rgba($black, 0.1);
  }

  &__cross {
    width: 10px;
    height: 12px;
  }

  &__paper {
    width: 100%;
    min-height: 40px;
  }
}
</style>
