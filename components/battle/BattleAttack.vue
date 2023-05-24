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
      <BattleCard v-if="attacker" :pirate="attacker" :battleState="attckerResult" class="battleAttack__card" />
      <IconSwords class="battleAttack__sword flex justifyC--center" />
      <BattleCard v-if="attackee" :pirate="attackee" :battleState="attackeeResult" class="battleAttack__card" attackState="attacked" />
    </div>

    <!--  -->
  </section>
</template>

<script>
import { useGlobalStore } from '~/stores/global'
import { usePiratesStore } from '~/stores/pirates'

import config from '~/config/index'

import IconSwords from '~/assets/svgs/interface/swords.svg'

export default {
  name: 'BattleAttack',
  components: {
    IconSwords
  },
  data() {
    return {
      countdown: 10,
      attckerResult: null,
      attackeeResult: null,
      attacker: null,
      attackee: null
    }
  },
  // computed: {
  //   pirates() {
  //     return usePiratesStore().pirates
  //   }
  // },// disabled by john
  mounted() {
    // usePiratesStore().updatePirates()// disabled by john
    this.getBattleResult()
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
    async getBattleResult() {
      console.log('get battle result')
      console.log(`${config.battleServer}/bucc/${usePiratesStore().selectedId}`)
      let attackerRes = await fetch(`${config.battleServer}/bucc/${usePiratesStore().selectedId}`)
      let attacker = await attackerRes.json()
      console.log('attacker info')
      console.log(attacker.buccaneer)
      this.attacker = attacker.buccaneer
      let attackeeRes = await fetch(`${config.battleServer}/bucc/${usePiratesStore().attackeeId}`)
      let attackee = await attackeeRes.json()

      console.log('defender info');
      this.attackee = attackee.buccaneer

      let req = {}
      req.attacker_id = usePiratesStore().selectedId
      req.defender_id = usePiratesStore().attackeeId
      req.tx_hash = usePiratesStore().battleHash

      var res = await $fetch('/api/battle', { method: 'post', body: req })
      let result = res.result
      console.log(result)
      if (result.winner_id == usePiratesStore().selectedId ) {
        this.attckerResult = 'won'
        this.attackeeResult = 'lost'
      } else {
        this.attckerResult = 'lost'
        this.attackeeResult = 'won'
      }
      setTimeout(() => {
        this.openModal()
      }, 10000)
    },

    // battle() {
    //   this.attckerResult = 'won'
    //   this.attackeeResult = 'lost'

    //   // wait 2 seconds before showing modal
    //   setTimeout(() => {
    //     this.openModal()
    //   }, 5000)
    // },

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
