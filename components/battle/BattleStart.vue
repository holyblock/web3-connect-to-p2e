<template>
  <section class="battleStart">

    <GlobalBanner header="Enter the Battle" subheader>
      <template #subheader>
        <BaseMapIcon class="globalBanner__subheaderIcon" type="battle" invert small />
      </template>
    </GlobalBanner>

    <BasePanel v-if="attacked" class="battleStart__attacked basePanel--spaced" darker>
      <div class="battleStart__attackedContainer grid">
        <div class="battleStart__attackedCol flex flex--dirC justifyC--between">
          <div class="battleStart__attackedContent">
            <h3 class="battleStart__attackedHeader ff--slab fs--24 fw--700">You were attacked!</h3>
            <p class="battleStart__attackedText fc--para lh--160">
              Pete Blackbeard has been attacked by Jack Sparrow. Intitate a revenge battle now
            </p>
          </div>

          <BaseBtn class="battleStart__attackedBtn" color="red" @click="revengeAttackModal">
            Initiate Revenge Battle for 0.5 ETH
          </BaseBtn>
        </div>
        <div class="battleStart__attackedCol flex flex--dirC justifyC--between">
          <div class="battleStart__attackedItem">
            <p class="battleStart__attackedLabel ff--slab o--7">Revenge Bonus:</p>
            <BaseCountdown class="battleStart__attackedCountdown" simple>45%</BaseCountdown>
          </div>
          <div class="battleStart__attackedItem">
            <p class="battleStart__attackedLabel ff--slab o--7">Time Remaining:</p>
            <BaseCountdown class="battleStart__attackedCountdown">04 : 23 : 18</BaseCountdown>
          </div>
        </div>
      </div>
    </BasePanel>

    <div class="battleStart__columns flex gap--40">
      <BasePanel class="battleStart__col">
        <div class="battleStart__content ta--center">
          <BaseMapIcon class="battleStart__icon" type="battle" invert />
          <h3 class="battleStart__header fs--24 fw--700 ff--slab">Attack a Buccaneer</h3>
          <p class="battleStart__text fc--para lh--160">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
          </p>
          <BaseBtn class="battleStart__btn baseBtn--full" color="battle" @click="startBattle">
            Choose your Buccaneer
          </BaseBtn>
        </div>
      </BasePanel>

      <BattleDefMode v-if="defenceMode" class="battleStart__col" />

      <BasePanel v-else class="battleStart__col">
        <div class="battleStart__content ta--center">
          <BaseMapIcon class="battleStart__icon" type="defence" invert />
          <h3 class="battleStart__header fs--24 fw--700 ff--slab">Enter Defense Mode</h3>
          <p class="battleStart__text fc--para lh--160">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
          </p>
          <BaseBtn class="battleStart__btn baseBtn--full" @click="chooseDefendBucc">Enter Defense Mode for 0.2 ETH</BaseBtn>
        </div>
      </BasePanel>
      
    </div>

  </section>
</template>

<script>
import { useGlobalStore } from '~/stores/global'
import { usePiratesStore } from '~/stores/pirates'

export default {
  name: 'BattleStart',
  data() {
    return {
      attacked: false,
      // global: useGlobalStore(),

    }
  },
  computed: {
    ...mapState(usePiratesStore, ['defenceMode'])
  },
  mounted() {
    // this.checkIfAttacked()
  },
  methods: {
    checkIfAttacked() {
      this.attacked = true
    },
    startBattle() {
      usePiratesStore().updateBattleState(1)
    },
    chooseDefendBucc() {
      console.log('jfaioefi')

      usePiratesStore().updateDefenceState(1)
      this.$router.push('/defend')
    },
    defenceModeModal() {
      const data = {
        type: 'default',
        header: 'Review Transaction',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
        totalFee: 0.2,
        breakdown: [
          {
            label: 'Treasure Pot:',
            value: 0.015
          },
          {
            label: 'Fee to Veterans:',
            value: 0.005
          }
        ],
        btns: [
          {
            color: 'green',
            label: 'Confirm Transaction',
            function: 'defendBuccaneer'
          }
        ]
      }
      useGlobalStore().updateModal(data)
    },
    revengeAttackModal() {

      const data = {
        type: 'default',
        header: 'Review Transaction',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
        totalFee: 0.8,
        breakdown: [
          {
            label: 'Treasure Pot:',
            value: 0.06
          },
          {
            label: 'Fee to Veterans:',
            value: 0.02
          }
        ],
        btns: [
          {
            color: 'green',
            label: 'Confirm Transaction',
            function: 'confirmTransaction'
          }
        ]
      }
      useGlobalStore().updateModal(data)
    }
  }
}
</script>

<style lang="scss">
.battleStart {
  max-width: 900px;
  margin: 0 auto;

  //
  &__attacked {
    margin-bottom: 40px;
  }

  &__attackedContainer {
    gap: 80px;
    grid-template-columns: 1fr 1fr;
  }

  &__attackedHeader {
    margin-bottom: 8px;
  }

  &__attackedBtn {
    margin-top: 16px;
  }

  &__attackedItem {
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__attackedLabel {
    margin-bottom: 8px;
  }

  //
  &__col {
    width: calc(50% - 24px);
    transform: rotate(-2deg);

    &:last-child {
      transform: rotate(2deg);
    }
  }

  &__icon {
    margin-bottom: 16px;
  }

  &__text {
    margin: 8px 0 20px;
  }
}
/*----------------------------------------*/

// 960
@include breakpoint(l) {
  .battleStart {
    //
    &__attackedContainer {
      gap: 40px;
    }

    &__attackedHeader {
      font-size: 20px;
    }

    &__attackedText,
    &__attackedLabel {
      font-size: 14px;
    }

    //
    &__columns {
      gap: 16px;
    }

    &__header {
      font-size: 20px;
    }

    &__text {
      font-size: 14px;
    }

    &__col {
      width: calc(50% - 8px);
    }
  }
}
/*----------------------------------------*/

// 750
@include breakpoint(m) {
  .battleStart {
    width: calc(100% + 64px);
    margin: 0 -32px;

    &__attackedContainer {
      grid-template-columns: 1fr;
      gap: 24px;
    }
  }
}
/*----------------------------------------*/

// 600
@include breakpoint(s) {
  .battleStart {
    width: 100%;
    margin: 0;

    &__col {
      width: 100%;
      transform: none;
    }

    &__col:last-child {
      transform: none;
    }
  }
}
/*----------------------------------------*/

// 400
@include breakpoint(xxs) {
  .battleStart {
    width: calc(100% + 64px);
    margin: 0 -32px;
  }
}
</style>
