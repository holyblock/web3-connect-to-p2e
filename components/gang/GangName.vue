<template>
  <section class="gangName">
    <!--  -->

    <GlobalBanner header="Name your Gang" backLink :backFunction="backBtn" />

    <BasePanel class="gangName__panel">
      <div class="gangName__details flex">
        <div class="gangName__nftHolder">
          <NftCard :image="pirate.image" class="nftGrid__nft" />
        </div>
        <div class="gangName__info">
          <div class="gangName__infoItem">
            <p class="gangName__infoLabel fc--para fw--500">Gang leader:</p>
            <h3 class="gangName__infoName ff--slab fs--20">{{ pirate.name }}</h3>
          </div>
          <div class="gangName__infoItem">
            <p class="gangName__infoLabel fc--para fw--500">Leader level:</p>
            <BaseLevel :level="pirate.level" class="gangName__infoLevel" />
          </div>
        </div>
      </div>
      <BaseInput
        class="gangName__input"
        label="Enter the name of your gang"
        placeholder="Gang name"
        @onInput="(val) => (name = val)" />
      <BaseBtn :class="{ 'baseBtn--inactive': name.length < 6 }" class="gangName__btn baseBtn--full" @click="openModal">
        Create a Gang for 0.5 ETH
      </BaseBtn>
    </BasePanel>

    <!--  -->
  </section>
</template>

<script>
import { useGlobalStore } from '~/stores/global'
import { usePiratesStore } from '~/stores/pirates'
import { useGangsStore } from '~/stores/gangs'

export default {
  name: 'GangName',
  data() {
    return {
      name: ''
    }
  },
  computed: {
    pirate() {
      // get pirates from store
      const pirates = usePiratesStore().pirates
      const leaderId = useGangsStore().gangLeader

      // if pirates haven't been populated or gang leader hasn't been selected, return null
      if (!pirates || !leaderId) return null

      let selectedPirate = null

      // loop through all pirates and match leaderId
      pirates.forEach((el) => {
        if (el.id === leaderId) selectedPirate = el
      })

      // return all info about that pirate
      return selectedPirate
    }
  },
  methods: {
    backBtn() {
      const route = useRoute()
      if (route.name === 'gangs') {
        useGangsStore().updateState(1)
        useGangsStore().updateGangLeader(null)
      }
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
      useGangsStore().updateName(this.name)
    }
  }
}
</script>

<style lang="scss">
.gangName {
  &__panel {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }

  &__details {
    margin-bottom: 24px;
  }

  &__nftHolder {
    width: 50%;
    padding-right: 40px;
  }

  &__info {
    width: 50%;
  }

  &__infoItem {
    margin-top: 16px;
  }

  &__infoLabel {
    margin-bottom: 8px;
  }

  &__btn {
    margin-top: 20px;
  }
}
/*----------------------------------------*/

// 600
@include breakpoint(s) {
  .gangName {
    &__panel {
      width: calc(100% + 32px);
      margin: 0 -16px;
    }

    &__nftHolder {
      padding-right: 20px;
    }

    &__infoName {
      font-size: 16px;
    }
  }
}
/*----------------------------------------*/

// 400
@include breakpoint(xxs) {
  .gangName {
    &__nftHolder,
    &__info {
      width: 100%;
      padding: 0;
    }
  }
}
</style>
