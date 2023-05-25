<template>
  <div class="nftGrid">
    <GlobalBanner :header="header" :subheader="subheader" :backFunction="backBtn" :backLink="backLink">
      <slot name="subheader" />
    </GlobalBanner>

    <div v-if="pirates" class="nftGrid__items grid gap--16">
      <NftCard
        v-for="(el, i) in pirates"
        :key="el + i"
        :image="el.image"
        :level="el.level"
        learnMore
        class="nftGrid__item pos--rel"
        @click="selectNft(el.id)" />
      <!-- <div v-for="(item, i) in 10 - pirates.length" :key="item + i" class="nftGrid__blurred">
        <img class="nftGrid__blurredImg o--5" src="/images/nfts/blurred.png" />
      </div> -->
    </div>

    <div v-else class="nftGrid__items grid gap--16">
      <div v-for="(item, i) in 10" :key="item + i" class="nftGrid__blurred pos--rel">
        <BaseSpinner class="pos--abs xy--center" color="white" />
        <img class="nftGrid__blurredImg o--2" src="/images/nfts/blurred.png" />
      </div>
    </div>
  </div>
</template>

<script>
import { usePiratesStore } from '~/stores/pirates'
import { useGangsStore } from '~/stores/gangs'

export default {
  name: 'NftGrid',
  props: {
    backLink: {
      type: Boolean,
      default: false
    },
    header: {
      type: String,
      default: ''
    },
    subheader: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      route: useRoute(),
      pirates: usePiratesStore().pirates
    }
  },
  
  methods: {
    backBtn() {
      if (this.route.name === 'battle') usePiratesStore().updateBattleState(0)
      if (this.route.name === 'gangs') useGangsStore().updateState(0)
    },
    selectNft(id) {
      usePiratesStore().updateSelectedId(id)
      if (this.route.name === 'battle') {
        usePiratesStore().updateBattleState(2)
      }

      if (this.route.name === 'training') {
        usePiratesStore().updateTrainingState(1)
        // usePiratesStore().updateSelectedId(id)
      }

      if (this.route.name === 'gangs') {
        useGangsStore().updateState(2)
        // useGangsStore().updateGangLeader(id)
      }
    }
  }
}
</script>

<style lang="scss">
.nftGrid {
  &__items {
    margin-top: 48px;
    grid-template-columns: repeat(5, 1fr);
    max-width: 100%;

    &:hover .nftGrid__item:not(:hover) {
      opacity: 0.2;
    }
  }

  &__item {
    opacity: 1;
    transition: opacity 0.3s ease, transform 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: scale(1.03);
    }
  }

  &__item,
  &__blurred {
    aspect-ratio: auto;

    &:nth-of-type(1),
    &:nth-of-type(4) {
      transform: rotate(-3deg);
    }

    &:nth-of-type(2),
    &:nth-of-type(9) {
      transform: rotate(-1deg);
    }

    &:nth-of-type(3) {
      transform: rotate(1deg);
    }

    &:nth-of-type(6) {
      transform: rotate(-2deg);
    }

    &:nth-of-type(7) {
      transform: rotate(0deg);
    }

    &:nth-of-type(8n),
    &:nth-of-type(10) {
      transform: rotate(3deg);
    }
  }

  &__blurredImg {
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
}
/*----------------------------------------*/

// 1080
@include breakpoint(xl) {
  .nftGrid {
    &__items {
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }
  }
}
/*----------------------------------------*/

// 960
@include breakpoint(l) {
  .nftGrid {
    &__items {
      grid-template-columns: repeat(3, 1fr);
    }

    &__item:nth-of-type(1n) {
      transform: rotate(0deg);
    }
  }
}
/*----------------------------------------*/

// 500
@include breakpoint(xs) {
  .nftGrid {
    &__items {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>
