<template>
  <div class="nftUpgrade">
    <!--  -->

    <div class="nftUpgrade__info grid gap--16 alignI--end">
      <p class="nftUpgrade__infoLabel fc--para ff--slab fs--16">Buccaneer:</p>
      <div class="nftUpgrade__name flex">
        <p class="nftUpgrade__infoName ff--slab fs--32 fw--700">{{ pirate.name }}</p>
        <BaseLevel class="nftUpgrade__level" :level="pirate.level" />
      </div>

      <!-- <p class="nftUpgrade__infoLabel fc--para ff--slab fs--16">Gang:</p>
      <div class="nftUpgrade__gang flex alignI--center">
        <BaseMapIcon class="nftUpgrade__gangIcon" type="gangs" invert smallest />
        <p class="ff--slab fs--16 fw--700">{{ pirate.gang || 'No gang' }}</p>
      </div> -->
    </div>

    <p class="nftUpgrade__infoLabel fc--para ff--slab fs--16">Stats:</p>

    <BasePanel class="nftUpgrade__stats">
      <div v-for="(group, key) in groups" :key="group + key" class="nftUpgrade__statsGroup pos--rel">
        <!--  -->

        <p class="nftUpgrade__statsHeader fc--para ff--slab fs--16 pos--rel z--2">{{ group[0].group }}:</p>
        <div class="nftUpgrade__statsItems grid pos--rel z--2">
          <div v-for="(el, i) in group" :key="el + i" class="flex alignI--center justifyC--between">
            <p class="fc--para">{{ el.name }}</p>
            <div class="flex alignI--center gap--12">
              <p class="ff--slab fs--20 fw--700">{{ el.value }}</p>
              <!-- <BaseIconBtn
                :class="{ 'baseIconBtn--inactive': el.value === '-' }"
                icon="upgrade"
                bgColor="white"
                @click="upgradeModal(pirate.id, el.value)" /> -->
            </div>
          </div>
        </div>
        <SvgBg class="nftUpgrade__statsBg pos--abs inset o--0" />

        <!--  -->
      </div>
    </BasePanel>
    <BaseBtn class="nftUpgrade__upgradeBtn" @click="upgradeModal(pirate.id)">Train Buccaneer</BaseBtn>

    <!--  -->
  </div>
</template>

<script>
import { useGlobalStore } from '~/stores/global'
import SvgBg from '~/assets/svgs/highlights/shape3.svg'

export default {
  name: 'NftInfo',
  components: {
    SvgBg
  },
  props: {
    pirate: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      groups: []
    }
  },
  computed: {
    statsPhysical() {
      return
    }
  },
  watch: {
    pirate: {
      handler: function (val, oldVal) {
        this.createGroups()
      }
    }
  },
  mounted() {
    this.createGroups()
  },
  methods: {
    createGroups() {
      this.groups = []
      const groups = ['Physical', 'Mental', 'Spiritual']
      groups.forEach((group) => {
        this.groups.push(this.pirate.stats.filter((el) => el.group === group))
      })
    },
    upgradeModal(id, currentLvl) {
      const data = {
        type: 'default',
        header: 'Upgrade Random Stat',
        upgradeLevelTo: currentLvl + 1,
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
.nftUpgrade {
  width: 100%;

  &__info {
    grid-template-columns: max-content auto;
    margin-bottom: 28px;
  }

  &__infoLabel {
    margin-bottom: 3px;
  }

  &__level {
    margin: 0 0 -14px 12px;
    transform: translateY(-6px);
  }

  &__gangIcon {
    margin-right: 8px;
  }

  //
  &__statsGroup {
    padding: 4px 0 20px;

    &:nth-child(even) .nftUpgrade__statsBg {
      transform: rotate(180deg);
      top: -8px;
      opacity: 0.7;
    }

    &:last-child:not(:nth-child(even)) {
      padding-bottom: 0;
    }
  }

  &__statsHeader {
    margin-bottom: 8px;
  }

  &__statsItems {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px 32px;
  }

  &__statsBg {
    width: calc(100% + 56px);
    left: -28px;
    height: 100%;
    fill: #1e212e;
  }

  //

  &__upgradeBtn {
    margin-top: 30px;
  }
}
/*----------------------------------------*/

// 1080
@include breakpoint(xl) {
  .nftUpgrade {
    &__info {
      margin-bottom: 16px;
      gap: 0;
      grid-template-columns: auto;
    }

    &__infoLabel {
      margin-bottom: 5px;
    }

    &__name {
      margin-bottom: 16px;
    }
  }
}
/*----------------------------------------*/

// 960
@include breakpoint(l) {
  .nftUpgrade {
    &__infoName {
      font-size: 26px;
    }

    &__level {
      transform: translateY(-9px);
    }

    &__stats {
      width: calc(100% + 40px);
      margin-left: -20px;
      padding: 32px;
    }
  }
}
/*----------------------------------------*/

// 500
@include breakpoint(xs) {
  .nftUpgrade {
    &__statsItems {
      grid-template-columns: 1fr;
    }
  }
}
</style>
