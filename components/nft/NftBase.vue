<template>
  <section class="nftBase">
    <!--  -->

    <BaseColumns
      v-if="pirates"
      class="nftBase__columns"
      :class="{ 'nftBase__columns--seasonReport': type === 'seasonReport' }">
      <div v-if="type !== 'seasonReport'" class="nftBase__carousel columns__col colSize--5">
        <NftCarousel :slides="slideImages" @onSlideChange="updateCurrentIndex" />
      </div>

      <div v-if="type === 'seasonReport'" class="nftBase__carousel columns__col colSize--5">
        <NftCard
          class="nftBase__card"
          :image="pirates[pirateIndex].image"
          :level="pirates[pirateIndex].level"
          :name="pirates[pirateIndex].name"
          :tilted="type === 'seasonReport'" />
      </div>

      <div class="nftBase__info columns__col colSize--6 colOffset--1 flex alignC--center justifyC--between">
        <BaseStat
          v-if="type === 'seasonReport'"
          :label1="formatValue(20, 2) + ' ETH'"
          :label2="formatValue(24653646, 2) + ' USD'"
          icon="treasure"
          header="Prize Money"
          class="nftBase__stat colSize--6"
          isDark />
        <BaseStat
          v-if="type === 'seasonReport'"
          :label1="formatValue(35, 2) + ' ETH'"
          :label2="formatValue(24653645, 2) + ' USD'"
          icon="donations"
          header="Total Donations to DAV"
          class="nftBase__stat colSize--6"
          isDark />
        <NftInfo v-if="type === 'info'" :pirate="pirates[currentIndex]" />
        <NftInfo v-else-if="type === 'seasonReport'" :pirate="pirates[pirateIndex]" :seasonReport="true" />
        <NftUpgrade v-else-if="type === 'upgrade'" :pirate="pirates[currentIndex]" />
      </div>
    </BaseColumns>

    <!--  -->
  </section>
</template>

<script>
import { usePiratesStore } from '~/stores/pirates'

export default {
  name: 'PirateInfo',
  props: {
    type: {
      type: String,
      default: 'info',
      validator(value) {
        return ['info', 'upgrade', 'seasonReport'].includes(value) // The value must match one of these strings
      }
    },
    pirateIndex: {
      type: Number,
      defafult: 0
    }
  },
  setup() {
    definePageMeta({ ...useTransition() })
    useOnPageLoad()
  },
  data() {
    return {
      currentIndex: 0,
      // pirates: [],
      // slideImages: []
    }
  },
  // async created() {

  //   this.setPirateData()
  // },
  computed: {
    pirates() {
      return usePiratesStore().pirates
    },
    slideImages() {
      return usePiratesStore().pirates.map((pirate) => pirate.image)
    }
  },
  mounted() {
    usePiratesStore().updatePirates()
  },
  methods: {
  //   async setPirateData() {
  //   // await usePiratesStore().updatePirates()

  //   this.pirates = usePiratesStore().pirates
  //   this.slideImages = []
  //   usePiratesStore().pirates.map((pirate) => {
  //     this.slideImages.push(pirate.image)
  //   })
  //   // console.log('setPirateDataa')
  //   // console.log(this.pirates)
  // },
  
  updateCurrentIndex(newIndex) {
      console.log(this.slideImages[newIndex])
      console.log(newIndex)
      this.currentIndex = newIndex
    }
  }
}
</script>

<style lang="scss">
.nftBase {
  &__columns {
    &--seasonReport {
      display: flex;
      align-items: center;
    }
  }

  &__stat {
    width: calc(50% - 5px) !important;
    margin-bottom: 10px;
  }
}
// 1200
@include breakpoint(xxl) {
  .nftBase {
    &__carousel {
      width: #{$colSize * 4 * 1%};
    }

    &__info {
      width: #{$colSize * 7 * 1%};
    }
  }
}
/*----------------------------------------*/

// 960
@include breakpoint(l) {
  .nftBase {
    &__columns {
      flex-wrap: wrap;
    }

    &__carousel {
      width: 100%;
    }

    &__carousel .nftCarousel {
      width: 80%;
      margin: 0 auto;
    }

    &__info {
      width: 100%;
      margin: 0;
    }

    &__card {
      margin: 0 auto;
    }
  }
}
</style>
