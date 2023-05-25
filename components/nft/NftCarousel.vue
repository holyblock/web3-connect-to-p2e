<template>
  <div class="nftCarousel">
    <div class="nftCarousel__nfts flex justifyC--center pos--rel">
      <!-- <NftCard
        v-for="(slide, key) of slides"
        :key="slide + key"
        :image="slide"
        class="nftCarousel__nft"
        :class="{
          'nftCarousel__nft--active': currentIndex === key,
          'nftCarousel__nft--previous': previousIndex === key,
          'nftCarousel__nft--animated': isAnimated
        }" /> -->

        <!-- <div  style="height: 600px; width: 500px;"> -->

          <NftCard
          v-for="(slide, key) of slides"
          :key="slide + key"
          :image="slide"
          class="nftCarousel__nft"
          :class="{
            'nftCarousel_show--none': currentIndex != key,
            'nftCarousel__nft--animated': isAnimated
          }" />
        <!-- </div> -->
        <!-- <NftCard
        v-for="(slide, key) of slides"
        :key="slide + key"
        :image="slide"
        class="nftCarousel__nft nftCarousel__nft--previous"/> -->
    </div>
    <div class="nftCarousel__controls flex alignI--center justifyC--center">
      <BaseIconBtn
        class="nftCarousel__button--left"
        :class="{ 'nftCarousel__button--inactive': currentIndex === 0 }"
        icon="arrow"
        bgColor="white"
        arrowDir="left"
        @click.prevent="changeSlide(currentIndex - 1)" />
      <span class="nftCarousel__slideIndicator ff--slab o--7">{{ currentIndex + 1 }} / {{ slides.length }}</span>
      <BaseIconBtn
        class="nftCarousel__button--right"
        :class="{ 'nftCarousel__button--inactive': currentIndex + 1 === slides.length }"
        icon="arrow"
        bgColor="white"
        arrowDir="right"
        @click.prevent="changeSlide(currentIndex + 1)" />
    </div>
  </div>
</template>

<script>
import { usePiratesStore } from '~/stores/pirates'

export default {
  name: 'NftCarousel',
  props: {
    slides: {
      type: Array,
      default: () => [],
      validator(value) {
        return value.length > 0
      }
    }
  },
  data() {
    return {
      currentIndex: usePiratesStore().selectedId < 0 ? 0 : usePiratesStore().pirates.findIndex( p => p.id == usePiratesStore().selectedId),
      previousIndex: 0,
      isAnimated: false
    }
  },
  // created() 
  methods: {
    changeSlide(index) {
      this.previousIndex = this.currentIndex
      this.currentIndex = index
      this.isAnimated = true
      this.$emit('onSlideChange', this.currentIndex)
    }
  }
}
</script>

<style lang="scss">
.nftCarousel_show--none {
  // display: none;
  visibility: hidden;
}
.nftCarousel {
  &__nfts {
    margin-bottom: 16px;
    transform: rotate(-3deg);
  }

  &__nft {
    position: relative;

    &:not(:first-child) {
      position: absolute;
      top: 0;
      left: 50%;
      width: 100%;
      height: 100%;
      transform: translateX(-50%);
    }

    &--previous {
      z-index: 1;
    }

    &--active {
      z-index: 2;
    }

    &--active.nftCarousel__nft--animated {
      animation: fadeIn 0.3s forwards;
    }
  }

  &__slideIndicator {
    margin: 0 24px;
  }

  &__button--inactive {
    opacity: 0.4;
    pointer-events: none;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
