<template>
  <div :class="{ 'quickAccessMenu--open': isOpen }" class="quickAccessMenu pos--fix z--max">
    <div class="quickAccessMenu__items grid grid--flow-c gap--8 justifyC--start">
      <!--  -->

      <div v-for="(el, i) in links" :key="el + i" class="quickAccessMenu__item">
        <NuxtLink
          v-if="el.type !== 'watering-hole'"
          :to="el.linkOverride || `/${el.type}/`"
          :target="el.linkOverride ? '_blank' : null"
          class="quickAccessMenu__link flex flex--nowrap alignI--center"
          :class="{ 'quickAccessMenu__link--disabled': el.disabled }"
          @click="closeMenu">
          <BaseMapIcon :type="el.type" smaller invert class="quickAccessMenu__icon" />
          <p class="quickAccessMenu__label ff--slab fs--24 fw--600">{{ el.label }}</p>
        </NuxtLink>

        <button v-else class="quickAccessMenu__link flex flex--nowrap alignI--center buttonReset" @click="openModal">
          <BaseMapIcon :type="el.type" smaller invert class="quickAccessMenu__icon" />
          <p class="quickAccessMenu__label ff--slab fs--24 fw--600">{{ el.label }}</p>
        </button>
      </div>

      <!--  -->
    </div>
  </div>
</template>

<script>
import { useGlobalStore } from '~/stores/global'

export default {
  name: 'QuickAccessMenu',
  data() {
    return {
      isOpen: computed(() => useGlobalStore().menu),
      links: [
        { type: 'mint', label: 'Mint', disabled: null },
        { type: 'battle', label: 'Battle', disabled: null },
        { type: 'training', label: 'Training', disabled: null },
        { type: 'marketplace', label: 'Marketplace', linkOverride: 'https://opensea.io/', disabled: null },
        { type: 'leaderboard', label: 'Leaderboard', disabled: null },
        { type: 'watering-hole', label: 'Watering Hole', disabled: null },
        { type: 'donations', label: 'Donations', disabled: null },
        { type: 'gangs', label: 'Gangs', disabled: null },
        { type: 'oracle', label: 'Oracle', disabled: null }
      ]
    }
  },
  mounted() {
    this.links.forEach((link, index) => {
      link.disabled = useGlobalStore().disabledPages.includes(link.label.toLowerCase() || link.label)

      if (link.disabled) {
        link.label = link.label + ' (Coming Soon)'
      }
    })
  },
  methods: {
    closeMenu() {
      useGlobalStore().updateMenu(null)
    },
    openModal() {
      const data = {
        type: 'default',
        header: 'Join the Discord',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
        upgradeLevelTo: null,
        totalFee: null,
        breakdown: null,
        btns: [
          {
            color: 'white',
            icon: 'discord',
            label: 'Join Discord Community',
            function: 'joinDiscord'
          },
          {
            color: 'green',
            icon: null,
            label: 'Go to Gangs',
            function: 'toGangs'
          }
        ]
      }
      useGlobalStore().updateModal(data)
    }
  }
}
</script>

<style lang="scss">
.quickAccessMenu {
  top: 0;
  right: 0;
  bottom: 0;
  padding-top: 80px;
  width: 400px;
  background: url('/images/interface/menu-bg.png') left top repeat;
  transform: translateX(100%);
  pointer-events: none;
  transition: transform 0.4s ease;

  &__items {
    padding: 0 40px;
  }

  &__link--disabled {
    opacity: 0.5;
    pointer-events: none;
    position: relative;

    &::before {
      position: absolute;
      content: '';
      left: 0;
      top: 0;
      background: url('/images/map/IconCross.png');
      background-size: contain;
      background-repeat: no-repeat;
      height: 50px;
      width: 50px;
    }
  }

  &__link:hover {
    .quickAccessMenu__icon {
      transform: scale(1.1);
    }

    .quickAccessMenu__label {
      transform: translateX(4px);
    }
  }

  &__icon {
    transition: transform 0.8s $easeCubic;
  }

  &__label {
    margin: -4px 0 0 8px;
    transition: transform 0.8s $easeCubic;
  }

  //
  &--open {
    transform: translateX(0);
    pointer-events: initial;
  }
}
/*----------------------------------------*/

// 960
@include breakpoint(l) {
  .quickAccessMenu {
    padding-top: 48px;

    &__label {
      font-size: 20px;
    }
  }
}
/*----------------------------------------*/

// 750
@include breakpoint(m) {
  .quickAccessMenu {
    width: 300px;

    &__label {
      font-size: 18px;
    }
  }
}
/*----------------------------------------*/

// 600
@include breakpoint(s) {
  .quickAccessMenu {
    width: calc(100% + 20px);
    background-size: cover;
    margin-left: -20px;
    padding-left: 20px;

    &__items {
      grid-template-columns: 1fr 1fr;
      padding: 0 32px;
    }

    &__label {
      margin: 0 0 0 8px;
      font-size: 15px;
    }
  }
}
/*----------------------------------------*/

// 400
@include breakpoint(xxs) {
  .quickAccessMenu {
    &__items {
      padding: 0 24px;
    }
  }
}
/*----------------------------------------*/

// 350
@include breakpoint(t) {
  .quickAccessMenu {
    &__items {
      padding: 0 12px;
    }
  }
}
</style>
