<template>
  <section class="battleFind">
    <!--  -->

    <GlobalBanner header="Find a Buccaneer to attack" backLink :backFunction="backBtn" subheader>
      <template #subheader>
        <!-- <BaseMapIcon class="globalBanner__subheaderIcon" type="battle" invert small />
        <p class="globalBanner__subheaderlabel ff--slab fc--para flex alignI--center gap--8">
          Attacks remaining today: <span class="fs--20 fc--white fw--700">{{ 5 }}/5</span>
        </p> -->
      </template>
    </GlobalBanner>

    <div class="battleFind__columns grid gap--40 alignI--start">
      <BattleCard v-if="pirates" class="battleFind__card" :pirate="pirates[0]" />

      <div class="battleFind__actions grid gap--16">
        <BasePanel class="battleFind__attack">
          <div class="battleFind__attackContent grid gap--8 alignI--center justifyC--between">
            <div class="battleFind__attackInfo flex flex--dirC">
              <h6 class="battleFind__attackHeader fs--24 ff--slab">Random Attack</h6>
              <p class="battleFind__attackLabel ff--slab o--7">Attack Fee:</p>
              <BaseCurrency
                :value="0.5"
                class="battleFind__attackCurrency"
                size="small"
                showUsdConversion
                showCurrency />
            </div>
            <BaseBtn class="battleFind__attackBtn baseBtn--full" @click="openModal">Attack for 0.5 ETH</BaseBtn>
          </div>
        </BasePanel>

        <BasePanel class="battleFind__attack">
          <div class="battleFind__attackContent grid gap--8 alignI--center justifyC--between">
            <div class="battleFind__attackInfo flex flex--dirC">
              <h6 class="battleFind__attackHeader fs--24 fw--700 ff--slab">Deliberate Attack</h6>
              <p class="battleFind__attackLabel ff--slab o--7">Attack Fee:</p>
              <BaseCurrency
                :value="0.5"
                class="battleFind__attackCurrency"
                size="small"
                showUsdConversion
                showCurrency />
            </div>
            <div class="battleFind__attack__attackInputHolder flex flex--dirC">
              <BaseInput class="battleFind__attackInput" icon="search" placeholder="Search by Token ID" />
              <BaseBtn class="battleFind__attackBtn baseBtn--full baseBtn--inactive" @click="openModal">
                Attack for 0.5 ETH
              </BaseBtn>
            </div>
          </div>
        </BasePanel>
      </div>
    </div>

    <!--  -->
  </section>
</template>

<script>
import { useGlobalStore } from '~/stores/global'
import { usePiratesStore } from '~/stores/pirates'

export default {
  name: 'BattleFind',
  computed: {
    pirates() {
      return usePiratesStore().pirates
    }
  },
  mounted() {
    // update pirates here for demo purposes
    usePiratesStore().updatePirates()
  },
  methods: {
    backBtn() {
      usePiratesStore().updateBattleState(1)
    },
    openModal() {
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
