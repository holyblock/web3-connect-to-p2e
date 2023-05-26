<template>
  <section class="battleAttack">

    <GlobalBanner header="Attack the Buccaneer" subheader>
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
      countdown: 5,
      attckerResult: null,
      attackeeResult: null,
      attacker: null,
      attackee: null
    }
  },
  mounted() {
    this.getBattleResult()
    // countdown demo
    const countdown = setInterval(() => {
      this.countdown--
      if (this.countdown === 0) {
        clearInterval(countdown)
      }
    }, 1000)
  },
  methods: {
    async getBattleResult() {
      let attackerRes = await fetch(`${config.battleServer}/bucc/${usePiratesStore().selectedId}`)
      // let attackerRes = await fetch(`${config.battleServer}/bucc/${15}`)
      let attacker = await attackerRes.json()
      this.attacker = attacker.buccaneer
      console.log('attacker info')
      console.log(this.attacker)

      let attackeeRes = await fetch(`${config.battleServer}/bucc/${usePiratesStore().attackeeId}`)
      // let attackeeRes = await fetch(`${config.battleServer}/bucc/${1}`)
      let attackee = await attackeeRes.json()
      console.log('defender info');
      this.attackee = attackee.buccaneer
      console.log(this.attackee)


      let req = {}
      req.attacker_id = usePiratesStore().selectedId
      req.defender_id = usePiratesStore().attackeeId
      req.tx_hash = usePiratesStore().battleHash

      var result = await $fetch('/api/getAttackResult', { method: 'post', body: req })
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
      }, 3000)
    },

    openModal() {
      let data = {
        type: 'default',
        level: 5,
        header: 'Battle Won',
        text: 'Pete Blackbeard has won the battle and has levelled up to level 1.',
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
      if (this.attckerResult == 'won') {
        data.header = 'Battle Won'
        data.text = `Buccaneer #${this.attacker.id} has won the battle and has levelled up to level ${this.attacker.level}`
      } else {
        data.header = 'Battle Lost'
        data.text = `Buccaneer #${this.attacker.id} has lost the battle and has levelled up to level ${this.attacker.level}`
      }
      data.level = this.attacker.level
      data.battle.won = this.attacker.wins
      data.battle.lost = this.attacker.losses


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
