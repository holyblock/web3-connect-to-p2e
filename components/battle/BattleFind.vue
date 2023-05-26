<template>
  <section class="battleFind">

    <GlobalBanner header="Find a Buccaneer to attack" backLink :backFunction="backBtn" subheader>
      <template #subheader>
        <!-- <BaseMapIcon class="globalBanner__subheaderIcon" type="battle" invert small />
        <p class="globalBanner__subheaderlabel ff--slab fc--para flex alignI--center gap--8">
          Attacks remaining today: <span class="fs--20 fc--white fw--700">{{ 5 }}/5</span>
        </p> -->
      </template>
    </GlobalBanner>

    <div class="battleFind__columns grid gap--40 alignI--start">
      <!-- <BattleCard v-if="pirates" class="battleFind__card" :pirate="pirates[0]" /> -->
      <!-- disabled by john -->
      <BattleCard v-if="selectedBuccaneer" class="battleFind__card" :pirate="selectedBuccaneer" />
      <!-- created by john -->
      <div class="battleFind__actions grid gap--16">
        <BasePanel class="battleFind__attack">
          <div class="battleFind__attackContent grid gap--8 alignI--center justifyC--between">
            <div class="battleFind__attackInfo flex flex--dirC">
              <h6 class="battleFind__attackHeader fs--24 ff--slab">Random Attack</h6>
              <p class="battleFind__attackLabel ff--slab o--7">Attack Fee:</p>
              <BaseCurrency
                :value="attackPrice"
                class="battleFind__attackCurrency"
                size="small"
                showUsdConversion
                showCurrency />
            </div>
            <BaseBtn class="battleFind__attackBtn baseBtn--full" @click="openModal(0)">Attack for {{attackPrice}} ETH</BaseBtn>
          </div>
        </BasePanel>

        <BasePanel class="battleFind__attack">
          <div class="battleFind__attackContent grid gap--8 alignI--center justifyC--between">
            <div class="battleFind__attackInfo flex flex--dirC">
              <h6 class="battleFind__attackHeader fs--24 fw--700 ff--slab">Deliberate Attack</h6>
              <p class="battleFind__attackLabel ff--slab o--7">Attack Fee:</p>
              <BaseCurrency
                :value="attackPrice"
                class="battleFind__attackCurrency"
                size="small"
                showUsdConversion
                showCurrency />
            </div>
            <div class="battleFind__attack__attackInputHolder flex flex--dirC">
              <!-- <div v-if="attackeeId > 0">
                <BaseInput class="battleFind__attackInput" :value="attackeeId" icon="search" placeholder="Search by Token ID" @onEnter = "validateTokenId" />
                <BaseBtn class="battleFind__attackBtn baseBtn--full baseBtn--active" @click="openModal(1)">
                  Attack for {{attackPrice}} ETH
                </BaseBtn>
              </div>
              <div v-else>
                <BaseInput class="battleFind__attackInput" icon="search" placeholder="Search by Token ID" @onEnter = "validateTokenId" />
                <BaseBtn class="battleFind__attackBtn baseBtn--full baseBtn--inactive">
                    Attack for {{attackPrice}} ETH
                </BaseBtn>

              </div> -->

              <BaseInput class="battleFind__attackInput" :value="tempId" icon="search" placeholder="Search by Token ID"  @onInput="(val) => (tempId = val)"  />

              <BaseBtn class="battleFind__attackBtn baseBtn--full" :class="{ 'baseBtn--inactive': parseInt(tempId) < 0 || tempId === '' }"
              @click="openModal(1)">Attack for {{attackPrice}} ETH</BaseBtn>
              
            </div>
          </div>
        </BasePanel>
      </div>
    </div>

  </section>
</template>

<script>
import { useGlobalStore } from '~/stores/global'
import { usePiratesStore } from '~/stores/pirates'
import { useCryptoStore } from '~~/stores/crypto'

import config from '~/config/index'


export default {
  name: 'BattleFind',
  // computed: {
  //   pirates() {
  //     return usePiratesStore().pirates
  //   }
  // }, // disable by john
  data() {
    return {
      selectedBuccaneer: null,
      attackPrice: config.attackPrice,
      tempId: '',
      attackeeId: null
    }
  },
  mounted() {
    this.selectedBuccaneer = usePiratesStore().getSelectedBuccaneer
    this.attackeeId = usePiratesStore().attackeeId
  },
  // watch: {
  //   tempId: {
  //     immediate: true, 
  //     handler (val, oldVal) {
  //       if (val != oldVal){
  //         this.validateTokenId()
  //       }
  //     }
  //   }
  // },
  methods: {

    validateTokenId(value) {
      // console.log(value)
      if(!/^[0-9]+$/.test(value)){
        this.tempId = ''
        alert("Please only enter numeric characters only for token id! (Allowed input:0-9)")
        return false
      }
      // let pirates = usePiratesStore().pirates
      // console.log(pirates)
      if (usePiratesStore().pirates.map((pirate) => pirate.id).includes(parseInt(value))){
        this.tempId = ''
        alert("You can not attack your own buccaneer.")
        return false
      }
      if (parseInt(value) > useCryptoStore().totalTokenCount || parseInt(value) < 0) {
        this.tempId = ''
        alert(`Your value is out of range. Please enter a number between 0 and ${useCryptoStore().totalTokenCount}.`)
        return false
      }

      
    },
    backBtn() {
      usePiratesStore().updateBattleState(1)
    },
    openModal(index) {
      if (index > 0) {
        if (!this.validateTokenId(this.tempId))
        return

        this.attackeeId = parseInt(this.tempId)
        usePiratesStore().updateAttackeeId(parseInt(this.attackeeId))
      } else
        this.tempId = ''

      
        
      // if (index > 0)
      //   this.validateTokenId(this.attackeeId)

      
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
            label: 'Attack Buccaneer',
            function: 'attackBuccaneer'
          }
        ]
      }
      useGlobalStore().updateModal(data)
    }
  }
}
</script>
<style lang="scss">
.battleFind {
  &__columns {
    grid-template-columns: 1fr 2fr;
    max-width: 1000px;
    margin: 0 auto;
  }

  //
  &__attack {
    padding: 40px 56px;
  }

  &__attackHeader {
    margin-bottom: 20px;
  }

  &__attackContent {
    grid-template-columns: 1fr 1fr;
  }

  &__attackLabel {
    margin-bottom: 10px;
  }

  /* Search */
  &__attackInputHolder {
    width: 50%;
  }

  &__attackInput {
    margin-bottom: 10px;
  }
}
/*----------------------------------------*/

// 1200
@include breakpoint(xxl) {
  .battleFind {
    &__columns {
      width: calc(100% + 24px);
      margin: 0 -12px;
      gap: 20px;
    }

    &__attack {
      padding: 32px 48px;
    }

    &__attackContent {
      grid-template-columns: 170px 1fr;
    }

    &__attackHeader {
      font-size: 20px;
    }

    &__attackCurrency .baseCurrency__usdAmount {
      display: none;
    }
  }
}
/*----------------------------------------*/

// 750
@include breakpoint(m) {
  .battleFind {
    &__columns {
      width: calc(100% + 40px);
      margin: 0 -20px;
      grid-template-columns: 180px 1fr;
      gap: 12px;
    }

    &__attack {
      padding: 24px;
    }

    &__attackContent {
      grid-template-columns: 150px 1fr;
    }

    &__attackHeader {
      font-size: 18px;
    }

    &__attackLabel {
      font-size: 14px;
    }

    &__attackBtn {
      padding: 0;
    }
  }
}
/*----------------------------------------*/

// 600
@include breakpoint(s) {
  .battleFind {
    &__columns {
      grid-template-columns: 1fr;
    }

    &__card {
      order: 2;
    }

    &__card .basePanel__content {
      display: grid;
      grid-template-columns: 120px 1fr;
      gap: 40px;
    }

    &__card .battleCard__name {
      margin-top: 0;
    }

    //
    &__actions {
      order: 1;
    }
  }
}
/*----------------------------------------*/

// 400
@include breakpoint(xxs) {
  .battleFind {
    &__card .basePanel__content {
      display: block;
    }

    &__card .battleCard__name {
      margin-top: 16px;
    }

    //
    &__attackContent {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    &__attackHeader {
      margin: 0 0 8px;
    }
  }
}
</style>
