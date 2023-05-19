<template>
  <section class="battleAttack">
    <!--  -->

    <GlobalBanner header="Random Attack" subheader>
      <template #subheader>
        <div>
          <p v-if="countdown > 0" class="globalBanner__subheaderlabel ff--slab fc--para gap--8 ta--center lh--160">
            Battle begins in: <span class="fs--20 fc--white fw--700">{{ countdown }}</span>
          </p>
          <p v-else class="globalBanner__subheaderlabel ff--slab fc--para gap--8 ta--center lh--160">
            Captain Crabby is no match for <span class="fs--20 fc--white fw--700">Pete Blackbeard</span>
          </p>
        </div>
      </template>
    </GlobalBanner>

    <div class="battleAttack__game flex alignI--center justifyC--center gap--24">
      <BattleCard v-if="pirates" :pirate="pirates[0]" :battleState="pirate1" class="battleAttack__card" />
      <IconSwords class="battleAttack__sword flex justifyC--center" />
      <BattleCard
        v-if="pirates"
        :pirate="pirates[1]"
        :battleState="pirate2"
        class="battleAttack__card"
        attackState="attacked" />
    </div>

    <!--  -->
  </section>
</template>

<script>
import { useGlobalStore } from '~/stores/global'
import { usePiratesStore } from '~/stores/pirates'

import IconSwords from '~/assets/svgs/interface/swords.svg'

export default {
  name: 'BattleAttack',
  components: {
    IconSwords
  },
  data() {
    return {
      countdown: 5,
      pirate1: null,
      pirate2: null
    }
  },
  computed: {
    pirates() {
      return usePiratesStore().pirates
    }
  },
  mounted() {
    // update pirates here for demo purposes
    usePiratesStore().updatePirates()

    // countdown demo
    const countdown = setInterval(() => {
      this.countdown--
      if (this.countdown === 0) {
        this.battle()
        clearInterval(countdown)
      }
    }, 1000)
  },
  methods: {
    battle() {
      this.pirate1 = 'won'
      this.pirate2 = 'lost'

      // wait 2 seconds before showing modal
      setTimeout(() => {
        this.openModal()
      }, 2000)
    },
    openModal() {
      const data = {
        type: 'default',
        level: 5,
        header: 'Battle Won',
        text: 'Pete Blackbeard has won the battle and has levelled up to level 5.',
        battle: {
          won: 3,
          lost: 4
        },
        btnsInline: true,
        btns: [
          {
            color: 'white',
            label: 'Head back',
            function: 'battleHeadBack'
          },
          {
            color: 'green',
            label: 'Attack again',
            function: 'attackAgain'
          }
        ]
      }
      useGlobalStore().updateModal(data)
    }
  }
}
</script>

<style lang="scss">
.battleAttack {
  &__card {
    width: calc(50% - 56px);
    max-width: 320px;

    &:first-child {
      transform: rotate(-2deg);
    }

    &:last-child {
      transform: rotate(2deg);
    }
  }

  &__sword {
    width: 48px;
    height: 48px;
  }
}
/*----------------------------------------*/

// 600
@include breakpoint(s) {
  .battleAttack {
    &__game {
      width: calc(100% + 40px);
      margin-left: -20px;
      gap: 12px;
    }

    &__card {
      width: calc(50% - 28px);
    }

    &__sword {
      width: 32px;
      height: 32px;
    }
  }
}
/*----------------------------------------*/

// 400
@include breakpoint(xxs) {
  .battleAttack {
    &__game {
      width: calc(100% + 56px);
      margin-left: -28px;
      gap: 8px;
    }
    &__sword {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
