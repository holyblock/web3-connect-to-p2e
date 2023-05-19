<template>
  <div class="nftRecord">
    <BasePanel class="nftRecord__holder">
      <div class="nftRecord__content flex justifyC--around alignI--center">
        <div class="flex alignI--center">
          <BaseMapIcon class="nftRecord__icon" type="battle" invert color="green" />
          <div class="nftRecord__winsHolder">
            <p class="nftRecord__label ff--slab">Battles Won:</p>
            <p class="nftRecord__value ff--clash">{{ wins }}</p>
          </div>
        </div>
        <div class="flex alignI--center">
          <BaseMapIcon class="nftRecord__icon" type="gangs" invert color="red" />
          <div class="nftRecord__lossesHolder">
            <p class="nftRecord__label ff--slab">Battles Lost:</p>
            <p class="nftRecord__value ff--clash">{{ losses }}</p>
          </div>
        </div>
      </div>
    </BasePanel>
  </div>
</template>
<script>
export default {
  name: 'NftRecord',
  props: {
    wins: {
      type: Number,
      default: null
    },
    losses: {
      type: Number,
      default: ''
    }
  }
}
</script>
<style lang="scss">
.nftRecord {
  &__holder {
    padding: 20px 35px;
  }

  &__content {
    flex-wrap: nowrap;
  }
  &__icon {
    flex: 1;
  }
  &__winsHolder {
    color: $greenLight;
    margin: 0 20px;
  }

  &__lossesHolder {
    color: $redLight;
    margin-left: 20px;
  }

  &__label {
    font-size: 24px;
    font-weight: 700;
  }

  &__value {
    font-size: 24px;
    font-weight: 500;
  }
}

// 600
@include breakpoint(s) {
  .nftRecord {
    &__content {
      flex-wrap: wrap;
    }
    &__winsHolder {
      margin: 30px 0 30px 20px;
    }

    &__lossesHolder {
      margin: 30px 0 30px 20px;
    }
  }
}

// 400
@include breakpoint(xxs) {
  .nftRecord {
    &__label {
      font-size: 20px;
    }

    &__value {
      font-size: 20px;
    }
  }
}
</style>
