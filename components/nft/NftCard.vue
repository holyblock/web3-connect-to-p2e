<template>
  <div class="nftCard pos--rel z--3">
    <div class="nftCard__imageHolder" :class="{ 'nftCard__imageHolder--tilted': tilted }">
      <img class="nftCard__art" :src="image" />
      <img class="nftCard__border pos--abs inset z--1" src="/images/nfts/border.png" />
    </div>
    <p v-if="name" class="nftCard__name ff--slab ta--center">{{ name }}</p>
    <BaseIconBtn v-if="learnMore" class="nftCard__iconBtn pos--abs" icon="question" />
    <BaseLevel
      v-if="level"
      :level="level"
      class="nftCard__level pos--abs"
      :class="{ 'nftCard__level--tilted': tilted }" />
  </div>
</template>

<script>
export default {
  name: 'NftCard',
  props: {
    image: {
      type: String,
      default: ''
    },
    learnMore: {
      type: Boolean,
      default: false
    },
    level: {
      type: Number,
      default: null
    },
    tilted: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.nftCard {
  padding: 3.9225%;
  width: 100%;
  max-width: 520px;
  aspect-ratio: 1 / 1;
  display: block;

  &__art,
  &__border {
    display: block;
    width: 100%;
    height: 100%;
  }

  &__border {
    pointer-events: none;
  }

  &__imageHolder {
    &--tilted {
      padding: 3.9225%;
      width: 100%;
      max-width: 520px;
      aspect-ratio: 1 / 1;
      display: block;
      transform: rotate(-3deg);
    }
  }

  &__iconBtn {
    bottom: 10%;
    left: 10%;
    max-width: 32px;
    max-height: 32px;
  }

  &__level {
    top: -5px;
    right: -5px;

    &--tilted {
      top: 1.5%;
      right: 4.5%;
    }
  }

  &__name {
    font-size: 26px;
    font-weight: 700;
    margin-top: 15px;
  }
}
</style>
