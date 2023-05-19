<template>
  <div class="pageEndOfSeason z--3">
    <div class="container container--medium">
      <BaseColumns class="flex--dirC flex">
        <div class="pageEndOfSeason__titleHolder flex justifyC--center colSize--12">
          <h1 class="pageEndOfSeason__title ff--slab z--3">End of Season Report!</h1>
        </div>
        <div class="colSize--12 flex">
          <div class="pageEndOfSeason__statsHolder colSize--7 colOffset--5">
            <div class="flex colSize--12"></div>
          </div>
          <div class="pageEndOfSeason__pirateHolder colSize--12">
            <NftBase :pirateIndex="pirateId" type="seasonReport" />
          </div>
        </div>
      </BaseColumns>
    </div>
  </div>
</template>
<script>
import { usePiratesStore } from '~/stores/pirates'

export default {
  name: 'PageEndOfSeason',
  data() {
    return {
      pirateId: 2
    }
  },
  mounted() {
    usePiratesStore().updateShareImage(this.pirateId)
  },

  setup() {
    definePageMeta({ ...useTransition() })
    useOnPageLoad()
  }
}
</script>

<style lang="scss">
.pageEndOfSeason {
  padding-top: 140px;
  padding-bottom: 80px;

  &__title {
    font-size: 28px;
    margin-bottom: 30px;
  }

  &__grid {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
}

// 750
@include breakpoint(m) {
  .pageEndOfSeason {
    &__title {
      font-size: 24px;
    }
  }
}
</style>
