<template>
  <div class="nftInfo z--3">
    <!--  -->

    <div v-if="!seasonReport" class="nftInfo__info grid gap--16 alignI--end">
      <p class="nftInfo__infoLabel fc--para ff--slab fs--16">Buccaneer:</p>
      <div class="nftInfo__name flex">
        <p class="nftInfo__infoName ff--slab fs--32 fw--700">{{ pirate.name }}</p>
        <BaseLevel class="nftInfo__level" :level="pirate.level" />
      </div>

      <!-- <p class="nftInfo__infoLabel fc--para ff--slab fs--16">Gang:</p>
      <div class="nftInfo__gang flex alignI--center">
        <BaseMapIcon class="nftInfo__gangIcon" type="gangs" invert smallest />
        <p class="ff--slab fs--16 fw--700">{{ pirate.gang || 'No gang' }}</p>
      </div> -->
    </div>
    <div class="nftInfo__record">
      <NftRecord :wins="pirate.wins" :losses="pirate.losses" />
    </div>
    <BaseColumns
      class="nftInfo__tables flex justifyC--between"
      :class="{ 'nftInfo__tables--seasonReport': seasonReport }">
      <div class="columns__col colSize--6">
        <p v-if="!seasonReport" class="nftInfo__infoLabel fc--para ff--slab fs--16">Traits:</p>
        <BaseTable :items="pirate.traits" />
      </div>

      <div class="columns__col colSize--6">
        <p v-if="!seasonReport" class="nftInfo__infoLabel fc--para ff--slab fs--16">Stats:</p>
        <BaseTable :items="pirate.stats" />
      </div>
    </BaseColumns>

    <p v-if="!seasonReport" class="nftInfo__infoLabel fc--para ff--slab fs--16">Actions:</p>
    <div v-if="!seasonReport" class="nftInfo__actions flex gap--8">
      <BaseBtn link="/battle/">Send to Fight</BaseBtn>
      <BaseBtn color="greenDark" link="/training/">Send to Train</BaseBtn>
      <BaseBtn color="white" icon="opensea" link="https://opensea.io/" external>List on Marketplace</BaseBtn>
    </div>

  </div>
</template>

<script>
export default {
  name: 'NftInfo',
  props: {
    pirate: {
      type: Object,
      default: () => ({})
    },
    seasonReport: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.nftInfo {
  width: 100%;

  &__info {
    grid-template-columns: max-content auto;
    margin-bottom: 28px;
  }

  &__infoLabel {
    margin-bottom: 3px;
  }

  &__record {
    margin-bottom: 10px;
  }

  &__level {
    margin: 0 0 -14px 12px;
    transform: translateY(-6px);
  }

  &__gangIcon {
    margin-right: 8px;
  }

  &__tables {
    margin-bottom: 24px;
    padding-right: 16px;

    .baseTable {
      margin-top: 5px;
    }

    &--seasonReport {
      padding-right: 0;

      .columns__col {
        width: calc(50% - 10px);
      }
    }
  }

  &__actions {
    margin-top: 5px;
    margin-bottom: -8px;
  }
}
/*----------------------------------------*/

// 1080
@include breakpoint(xl) {
  .nftInfo {
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
  .nftInfo {
    &__infoName {
      font-size: 26px;
    }

    &__level {
      transform: translateY(-9px);
    }
  }
}
/*----------------------------------------*/

// 750
@include breakpoint(m) {
  .nftInfo {
    &__tables {
      flex-wrap: wrap;
      padding-right: 0;
    }

    &__tables .columns__col {
      width: 100%;
    }

    &__actions .baseBtn {
      width: 100%;
    }
  }
}
</style>
