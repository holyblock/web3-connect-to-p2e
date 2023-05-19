<template>
  <div
    :class="[
      {
        'baseMapIcon--invert': invert,
        'baseMapIcon--small': small,
        'baseMapIcon--smaller': smaller,
        'baseMapIcon--smallest': smallest
      },
      'baseMapIcon--' + color
    ]"
    class="baseMapIcon">
    <IconBattle v-if="type === 'battle'" />
    <IconDonations v-if="type === 'donations'" />
    <IconGangs v-if="type === 'gangs'" />
    <IconGangs2 v-if="type === 'gangs2'" />
    <IconLeaderboard v-if="type === 'leaderboard'" />
    <IconMarketplace v-if="type === 'marketplace'" />
    <IconMint v-if="type === 'mint'" />
    <IconOracle v-if="type === 'oracle'" />
    <IconTraining v-if="type === 'training'" />
    <IconWateringHole v-if="type === 'watering-hole'" />
    <IconDefence v-if="type === 'defence'" />
  </div>
</template>

<script lang="ts">
import IconBattle from '~/assets/svgs/map-icons/battle.svg'
import IconDonations from '~/assets/svgs/map-icons/donations.svg'
import IconGangs from '~/assets/svgs/map-icons/gangs.svg'
import IconGangs2 from '~/assets/svgs/map-icons/gangs2.svg'
import IconLeaderboard from '~/assets/svgs/map-icons/leaderboard.svg'
import IconMarketplace from '~/assets/svgs/map-icons/marketplace.svg'
import IconMint from '~/assets/svgs/map-icons/mint.svg'
import IconOracle from '~/assets/svgs/map-icons/oracle.svg'
import IconTraining from '~/assets/svgs/map-icons/training.svg'
import IconWateringHole from '~/assets/svgs/map-icons/watering-hole.svg'
import IconDefence from '~/assets/svgs/map-icons/defence.svg'

export default {
  name: 'BaseMapIcon',
  components: {
    IconBattle,
    IconDonations,
    IconGangs,
    IconGangs2,
    IconLeaderboard,
    IconMarketplace,
    IconMint,
    IconOracle,
    IconTraining,
    IconWateringHole,
    IconDefence
  },
  props: {
    type: {
      type: String,
      default: 'battle',
      validator(value: string) {
        return [
          'battle',
          'donations',
          'gangs',
          'gangs2',
          'leaderboard',
          'marketplace',
          'mint',
          'oracle',
          'training',
          'watering-hole'
        ].includes(value) // The value must match one of these strings
      }
    },
    invert: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    smaller: {
      type: Boolean,
      default: false
    },
    smallest: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'default'
    }
  }
}
</script>

<style lang="scss">
.baseMapIcon {
  width: 88px;
  aspect-ratio: 1;
  display: inline-block;

  .mapIcon {
    width: 100%;
    aspect-ratio: 1;
    display: block;
  }

  &--green {
    .mapIcon__bg {
      fill: #27868e !important;
    }
  }

  &--red {
    .mapIcon__bg {
      fill: #b67a7b !important;
    }
  }

  //
  &--invert {
    .mapIcon__innerRing,
    .mapIcon__outerRing {
      fill: #fff;
    }

    .mapIcon__outerRing {
      opacity: 0.3;
    }
  }

  //
  &--small {
    width: 48px;
  }

  &--smaller {
    width: 40px;
    min-width: 40px;
  }

  &--smallest {
    width: 32px;
    min-width: 32px;
  }
}
</style>
