<template>
  <div :class="'baseCurrency--' + size" class="baseCurrency flex alignI--center fs--700">
    <BaseIconBtn :size="size" parentLink bgColor="blue" icon="eth" class="baseCurrency__icon" />
    <p class="baseCurrency__amount ff--clash fw--500 fs--24">
      {{ value }} <span v-if="showCurrency" class="baseCurrency__currency">{{ currency }}</span>
      <span v-if="showUsdConversion" class="baseCurrency__usdAmount fc--para fs--16">({{ usdPrice }} USD)</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'BaseCurrency',
  props: {
    currency: {
      type: String,
      default: 'ETH'
    },
    value: {
      type: Number,
      default: 0
    },
    showCurrency: {
      type: Boolean,
      default: false
    },
    showUsdConversion: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: ''
    }
  },
  computed: {
    usdPrice() {
      const conversions = {
        // 1 ETH = 1125 USD
        ETH: 1125
      }
      return this.value * conversions[this.currency]
    }
  }
}
</script>

<style lang="scss">
.baseCurrency {
  &__icon {
    margin-right: 12px;
    pointer-events: none;
  }

  &__usdAmount {
    margin-left: 8px;
  }

  //
  &--small {
    .baseCurrency__icon {
      margin-right: 8px;
    }

    .baseCurrency__amount {
      font-weight: 600;
      font-size: 20px;
    }

    .baseCurrency__usdAmount {
      font-weight: 500;
    }

    .baseCurrency__currency {
      font-size: 16px;
    }
  }

  //
  &--smaller {
    .baseCurrency__icon {
      margin-right: 6px;
    }

    .baseCurrency__amount {
      font-weight: 600;
      font-size: 16px;
    }

    .baseCurrency__usdAmount {
      font-weight: 500;
    }

    .baseCurrency__currency {
      font-size: 12px;
    }
  }
}
/*----------------------------------------*/

// 400
@include breakpoint(xxs) {
  .baseCurrency {
    &--small .baseCurrency__amount {
      font-weight: 600;
      font-size: 18px;
    }

    &--small .baseCurrency__currency {
      font-size: 14px;
    }
  }
}
</style>
