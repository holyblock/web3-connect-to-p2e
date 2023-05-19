<template>
  <component
    :is="wrapperTag"
    :href="link ? link : null"
    :target="external ? '_blank' : null"
    :class="['baseBtn--' + type, 'baseBtn--' + color, { 'baseBtn--full': full }, { 'baseBtn--loading': loading }]"
    class="baseBtn flex flex--inline alignI--center justifyC--center pos--rel ta--center buttonReset">
    <!--  -->

    <IconShip v-if="loading" class="baseBtn__loader pos--abs xy--center z--2" />

    <div
      v-if="icon"
      :class="[{ 'o--0': loading }, { 'baseBtn__iconHolder--alt': type === 'icon' }]"
      class="baseBtn__iconHolder">
      <img v-if="icon === 'opensea'" src="/images/icons/opensea.png" class="baseBtn__icon pos--rel z--2" />
      <img v-else-if="icon === 'transak'" src="/images/icons/transak.png" class="baseBtn__icon pos--rel z--2" />
      <img v-else-if="icon === 'discord'" src="/images/icons/discord.png" class="baseBtn__icon pos--rel z--2" />
      <ModalTwitter v-else-if="icon === 'modalTwitter'" class="baseBtn__icon baseBtn__icon--share pos--rel z--2" />
      <ModalFacebook v-else-if="icon === 'modalFacebook'" class="baseBtn__icon baseBtn__icon--share pos--rel z--2" />
      <ModalInstagram v-else-if="icon === 'modalInstagram'" class="baseBtn__icon baseBtn__icon--share pos--rel z--2" />
      <ModalMastodon v-else-if="icon === 'modalMastodon'" class="baseBtn__icon baseBtn__icon--share pos--rel z--2" />
      <ModalDownload v-else-if="icon === 'modalDownload'" class="baseBtn__icon baseBtn__icon--share pos--rel z--2" />
    </div>

    <div :class="{ 'o--0': loading }" class="baseBtn__labelHolder pos--rel z--2">
      <p
        v-for="label in 2"
        :key="label"
        :class="{ 'fc--black': color === 'gangs' }"
        class="baseBtn__label ff--slab fw--500">
        <slot />
      </p>
    </div>

    <SvgBg
      v-if="type === 'btn' || type === 'inactive' || type === 'icon'"
      :class="'fill--' + color"
      class="baseBtn__bg pos--abs inset z--1" />
    <SvgLine v-else class="baseBtn__underline pos--abs z--1 o--5" />

    <!--  -->
  </component>
</template>

<script lang="ts">
import IconShip from '~/assets/svgs/interface/ship.svg'
import SvgBg from '~/assets/svgs/interface/btn-bg.svg'
import SvgLine from '~/assets/svgs/interface/btn-underline.svg'

import ModalTwitter from '~/assets/svgs/modal-share/modal-twitter.svg'
import ModalFacebook from '~/assets/svgs/modal-share/modal-facebook.svg'
import ModalInstagram from '~/assets/svgs/modal-share/modal-insta.svg'
import ModalMastodon from '~/assets/svgs/modal-share/modal-mastodon.svg'
import ModalDownload from '~/assets/svgs/modal-share/modal-download.svg'

export default {
  name: 'BaseBtn',
  components: {
    IconShip,
    SvgBg,
    SvgLine,
    ModalTwitter,
    ModalFacebook,
    ModalInstagram,
    ModalMastodon,
    ModalDownload
  },
  props: {
    type: {
      type: String,
      default: 'btn',
      validator(value: string) {
        return ['btn', 'link', 'icon'].includes(value) // The value must match one of these strings
      }
    },
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
    loading: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'green'
    },
    full: {
      type: Boolean,
      default: false
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
@keyframes shipLoader {
  0% {
    transform: translate(calc(-50% - 12px), -50%);
    opacity: 0;
  }
  20%,
  70% {
    opacity: 1;
  }
  90%,
  100% {
    transform: translate(calc(-50% + 12px), -50%);
    opacity: 0;
  }
}

.baseBtn {
  //
  &--btn {
    height: 56px;
    padding: 0 32px;
    transition: border-color 0.2s ease;
  }

  &--link {
    padding: 6px 0;
  }

  &--icon {
    height: 56px;
    max-width: 66px;
  }

  //
  &__iconHolder {
    margin: 0 8px 0 -8px;

    + .baseBtn__labelHolder {
      width: auto;
    }

    &--alt {
      margin: 0;
    }
  }

  &__icon {
    width: 24px;
    height: 24px;
    transition: transform 0.8s $easeCubic;
    object-fit: contain;
    display: block;

    &--share {
      width: unset;
      max-width: 29px;
    }
  }

  //
  &__loader {
    width: 24px;
    height: 24px;
    display: inline-block;
    margin: 0 auto;
    animation: shipLoader 2s infinite;
  }

  //
  &__labelHolder {
    height: 18px;
    overflow: hidden;
    width: 100%;
  }

  &__label {
    transition: transform 0.8s $easeCubic;
  }

  //
  &__bg {
    width: 100%;
    height: 100%;
    transition: transform 0.8s $easeCubic;

    &.fill--white {
      fill: rgba($white, 0.05);
    }

    &.fill--red {
      fill: #ba0000;
    }

    &.fill--redLight {
      fill: #b67a7b;
    }

    &.fill--greyDark {
      fill: #252a3a;
    }

    &.fill--modal {
      fill: #3a2a25;
    }
  }

  &__underline {
    width: 100%;
    top: 100%;
    transition: opacity 0.8s $easeCubic;
  }

  //
  &--full {
    width: 100%;

    .baseBtn__iconHolder {
      margin-left: 0;
    }
  }

  //
  &--loading {
    pointer-events: none;
  }

  //
  &--inactive {
    pointer-events: none;
    height: 56px;
    padding: 0 32px;

    .baseBtn__label {
      opacity: 0.5;
    }

    .baseBtn__bg {
      fill: rgba($white, 0.05);
      stroke: none;
    }
  }

  //
  &__parentHover:hover,
  &:hover {
    .baseBtn__icon {
      transform: scale(1.15);
    }

    .baseBtn__label {
      transform: translateY(-100%);
    }

    .baseBtn__bg {
      transform: scale(0.98);
    }

    .baseBtn__underline {
      opacity: 1;
    }
  }
}
/*----------------------------------------*/

// 960
@include breakpoint(l) {
  .baseBtn {
    &--btn {
      height: 48px;
      padding: 0 24px;
    }

    &__labelHolder {
      height: 16px;
    }

    &__label {
      font-size: 14px;
    }
  }
}
</style>
