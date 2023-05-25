<template>
  <header
    :class="[{ 'globalHeader--bg': page !== 'index' }, { 'globalHeader--seasonEnd': page === 'end-of-season' }]"
    class="globalHeader grid placeI--center pos--rel z--max">

    <div v-if="page !== 'end-of-season'" class="globalHeader__container flex alignI--center justifyC--between">
      <div class="globalHeader__navHolder flex alignI--center">
        <NuxtLink class="globalHeader__logoLink pos--rel z--2" to="/">
          <img class="globalHeader__logo" src="/images/logo/main-logo.png" alt="Buccaneers of the Blockchain logo" />
        </NuxtLink>
        <nav :class="{ 'globalHeader__nav--reveal': page !== 'index' }" class="globalHeader__nav pos--rel">
          <ul class="globalHeader__items noList flex pos--rel z--2">
            <li class="globalHeader__item">
              <NuxtLink class="globalHeader__link pos--rel" to="/">
                <div class="globalHeader__labelHolder">
                  <p v-for="label in 2" :key="label" class="globalHeader__label ff--slab fw--500 ls--l0">Back to map</p>
                </div>
              </NuxtLink>
            </li>
            <template v-if="page === 'mint' || page === 'my-buccaneers'">
              <li class="globalHeader__item">
                <NuxtLink class="globalHeader__link pos--rel" to="/mint/">
                  <div class="globalHeader__labelHolder">
                    <p v-for="label in 2" :key="label" class="globalHeader__label ff--slab fw--500 ls--l0">Mint</p>
                  </div>
                </NuxtLink>
              </li>
              <li class="globalHeader__item">
                <NuxtLink class="globalHeader__link pos--rel" to="/my-buccaneers/">
                  <div class="globalHeader__labelHolder">
                    <p v-for="label in 2" :key="label" class="globalHeader__label ff--slab fw--500 ls--l0">
                      My Buccaneers
                    </p>
                  </div>
                </NuxtLink>
              </li>
            </template>
          </ul>
          <SvgBg class="globalHeader__navBg pos--abs inset z--1" />
        </nav>
      </div>

      <div class="globalHeader__actions flex alignI--center">
        <BaseBtn v-if="!crypto.connected" class="globalHeader__connect" @click="crypto.connAndCheck">Connect Wallet</BaseBtn>
        <BaseBtn v-else class="globalHeader__connect baseBtn--inactive">{{crypto.formatWalletAddress}}</BaseBtn>
        <BaseIconBtn v-if="crypto.connected" class="globalHeader__iconBtn" icon="bell" @click="openModal('notifications')" />
        <BaseIconBtn class="globalHeader__iconBtn" icon="question" @click="openModal('about')" />
        <BaseIconBtn class="globalHeader__iconBtn" icon="gear" @click="openModal('settings')" />
      </div>
    </div>

    <template v-if="page === 'end-of-season'">
      <div class="globalHeader__navHolder globalHeader__navHolder--seasonEnd flex alignI--center justifyC--between">
        <NuxtLink class="globalHeader__link globalHeader__backBtn" to="/">
          <BaseBtn color="greyDark">Back to Map</BaseBtn>
        </NuxtLink>
        <NuxtLink class="globalHeader__logoLink globalHeader__logoLink--seasonEnd pos--rel z--2" to="/">
          <img class="globalHeader__logo" src="/images/logo/main-logo.png" alt="Buccaneers of the Blockchain logo" />
        </NuxtLink>
        <BaseBtn class="globalHeader__shareBtn" @click="openModal('share')">Share Your Results</BaseBtn>
        <BaseBtn class="globalHeader__shareBtn--mobile" @click="openModal('share')">Share</BaseBtn>
      </div>
    </template>

  </header>
</template>

<script>
import { useGlobalStore } from '~~/stores/global'
import { useCryptoStore } from '~/stores/crypto'

import SvgBg from '~/assets/svgs/interface/btn-bg.svg'

export default {
  async setup() {
    const crypto = useCryptoStore()
    return { crypto }
  },
  name: 'GlobalHeader',
  components: {
    SvgBg
  },
  data() {
    return {
    }
  },
  computed: {

    ...mapState(useGlobalStore, ['page']),

    shareImage() {
      return usePiratesStore().shareImage
    }

  },
  mounted() {
    this.crypto.connAndCheck()
  }, // added by john
  methods: {

    openModal(type) {
      const data = {
        type: 'default',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'
      }

      switch (type) {
        case 'notifications':
          data.header = 'Notifications'
          break
        case 'about':
          data.header = 'About this'
          break
        case 'settings':
          data.header = 'Settings'
          data.settings = true
          break
        case 'share':
          data.header = 'Share your results'
          data.text = 'Share your personally generated image to show your friends how you did this season!'
          data.image = this.shareImage
          data.socialBtns = [
            { type: 'icon', icon: 'modalTwitter', color: 'modal' },
            { type: 'icon', icon: 'modalFacebook', color: 'modal' },
            { type: 'icon', icon: 'modalInstagram', color: 'modal' },
            { type: 'icon', icon: 'modalMastodon', color: 'modal' },
            { type: 'icon', icon: 'modalDownload', color: 'modal' }
          ]
          break
      }
      useGlobalStore().updateModal(data)
    }
  }
}
</script>

<style lang="scss">
.globalHeader {
  gap: 16px 0;
  padding: 24px 48px 0 24px;
  width: 100%;
  top: 0;
  left: 0;
  pointer-events: none;

  &--seasonEnd {
    padding: 24px 24px 0;
    position: fixed;
  }

  &__container {
    width: 100%;
  }

  &__navHolder {
    pointer-events: auto;
    overflow: hidden;
    border-top-left-radius: 48px;
    border-bottom-left-radius: 48px;
    position: relative;

    &--seasonEnd {
      width: 100%;
      border-radius: 0;
      overflow: visible;
      padding: 0 20px;
    }
  }

  &__logoLink {
    display: block;
    width: 96px;
    height: 96px;
    transition: transform 0.8s $easeCubic;

    &:hover {
      transform: rotate(-10deg);
    }

    &--seasonEnd {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);

      &:hover {
        transform: translateX(-50%) rotate(-10deg);
      }
    }
  }

  &__logo {
    display: block;
    width: 100%;
    height: 100%;
  }

  &__nav {
    padding: 0 40px;
    margin-left: -12px;
    transition: transform 0.8s $easeCubic;
    transform: translateX(-100%);

    &--reveal {
      transform: translateX(0);
      transition-delay: 0.1s;
    }
  }

  &__item {
    margin-left: 32px;

    &:first-child {
      margin-left: 0;
    }

    &:first-child .globalHeader__link::after {
      content: none;
    }
  }

  &__link {
    padding: 18px 0;
    display: block;

    &.router-link-active {
      pointer-events: none;
    }

    &.router-link-active::after {
      opacity: 1;
    }

    &::after {
      content: '';
      width: 20px;
      height: 24px;
      background: url('~/assets/svgs/interface/cross.svg');
      position: absolute;
      top: calc(50% - 12px);
      left: calc(50% - 10px);
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    &:hover .globalHeader__label {
      transform: translateY(-100%);
    }
  }

  &__labelHolder {
    height: 18px;
    overflow: hidden;
    width: 100%;
  }

  &__label {
    transition: transform 0.8s $easeCubic;
  }

  &__navBg {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    fill: $greyDark;
    stroke-opacity: 0.5;
  }

  //
  &__actions {
    pointer-events: auto;
  }

  &__connect {
    margin-right: 16px;
  }

  &__iconBtn {
    margin-left: 8px;
  }

  &__shareBtn {
    &--mobile {
      display: none;
    }
  }

  &__mobileNav {
    display: none;
    border-block: 2px solid rgba($grey, 0.6);
    width: 100%;
    background: $greyDark;
    pointer-events: initial;
  }
}
/*----------------------------------------*/

// 960
@include breakpoint(l) {
  .globalHeader {
    padding: 16px;

    &__nav {
      padding: 0 32px;
    }

    &__label {
      font-size: 14px;
    }

    &__link {
      padding: 16px 0 15px;
    }
  }
}
/*----------------------------------------*/

// 750
@include breakpoint(m) {
  .globalHeader {
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: $black;
      z-index: 1;
      opacity: 0;
      transition: opacity 0.4s $easeCubic;
    }

    &__logoLink {
      width: 64px;
      height: 64px;

      &--seasonEnd {
        width: 80px;
        height: 80px;
      }
    }

    &__nav {
      position: absolute;
      top: calc(100% - 2px);
      left: -10px;
      right: -10px;
      margin: 0;
      z-index: 2;
      transition: opacity 0.4s $easeCubic;
    }

    &__nav--hidden {
      transform: none;
      opacity: 0;
    }

    &__items {
      width: 100%;
      justify-content: center;
    }

    &__shareBtn {
      display: none;
      &--mobile {
        display: block;
      }
    }

    //
    &--bg::before {
      opacity: 1;
    }
  }
}
/*----------------------------------------*/

// 500
@include breakpoint(xs) {
  .globalHeader {
    padding: 8px 24px 8px 16px;

    &__connect {
      height: 40px;
      padding: 0 16px;
      margin-right: 8px;
    }

    // Enf of season page
    &__backBtn {
      display: none;
    }

    &__navHolder {
      &--seasonEnd {
        justify-content: flex-end;
        padding: 0;
      }
    }

    &__logoLink {
      &--seasonEnd {
        width: 60px;
        height: 60px;
        left: 30px;
      }
    }
  }
}
/*----------------------------------------*/

// 400
@include breakpoint(xxs) {
  .globalHeader {
    &__iconBtn {
      width: 32px;
      height: 32px;
    }
  }
}
/*----------------------------------------*/

// 350
@include breakpoint(t) {
  .globalHeader {
    &__iconBtn {
      margin-left: 6px;
    }

    &__connect {
      margin-right: 0;
    }

    &__connect .baseBtn__label {
      font-size: 13px;
    }
  }
}
</style>
