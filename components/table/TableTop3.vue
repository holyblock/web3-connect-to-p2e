<template>
  <section class="tableTop3 grid gap--8">
    <!-- -->

    <div class="tableTop3__head grid">
      <p class="tableTop3__headItem fs--15 fw--500 o--5">Rank</p>
      <p class="tableTop3__headItem fs--15 fw--500 o--5">Wallet Address</p>
      <p class="tableTop3__headItem fs--15 fw--500 o--5">Total Donations</p>
    </div>

    <div class="tableTop3__items grid gap--8">
      <div v-for="(el, i) in items" :key="el + i" class="tableTop3__item ff--slab grid alignI--center pos--rel">
        <p class="tableTop3__itemRank fw--500 pos--rel z--2"><span class="fs--12">#</span>0{{ i + 1 }}</p>
        <p class="tableTop3__itemWallet fw--500 pos--rel z--2">{{ el.wallet }}</p>
        <BaseCurrency :value="formatValue(el.donated, 3)" class="tableTop3__itemWallet pos--rel z--2" size="smaller" />

        <SvgBg class="tableTop3__itemBg pos--abs inset z--1 o--7" />
      </div>
    </div>

    <!-- -->
  </section>
</template>

<script>
import SvgBg from '~/assets/svgs/highlights/shape2.svg'

export default {
  name: 'TableTop3',
  components: {
    SvgBg
  },
  data() {
    return {
      items: [
        { wallet: '0x5A14...652e', donated: 0.2862352352 },
        { wallet: '0x5A14...652e', donated: 0.2862352352 },
        { wallet: '0x5A14...652e', donated: 0.2862352352 }
      ]
    }
  }
}
</script>

<style lang="scss">
.tableTop3 {
  &__head {
    grid-template-columns: 80px 1fr 108px;
    padding: 0 32px 4px 0;
    border-bottom: 1px solid rgba($white, 0.2);
  }

  &__item {
    padding: 16px 32px 16px 0;
    grid-template-columns: 80px 1fr 108px;

    &:nth-child(1) .tableTop3__itemRank {
      color: $gold;
    }

    &:nth-child(2) .tableTop3__itemRank {
      color: $silver;
    }

    &:nth-child(2) .tableTop3__itemBg {
      transform: rotate(180deg);
      top: -3px;
      bottom: 3px;
      opacity: 0.4;
    }

    &:nth-child(3) .tableTop3__itemRank {
      color: $bronze;
    }
  }

  &__itemRank {
    padding-left: 20px;
  }

  &__itemWallet .baseCurrency__amount {
    font-family: $slab;
  }

  &__itemBg {
    left: -12px;
    right: -12px;
    width: calc(100% + 24px);
    height: 100%;
    fill: #1e212e;
  }
}
/*----------------------------------------*/

// 1200
@include breakpoint(xxl) {
  .tableTop3 {
    &__head,
    &__item {
      grid-template-columns: 64px 1fr 108px;
      padding-right: 20px;
    }

    &__itemRank {
      padding-left: 12px;
    }
  }
}
/*----------------------------------------*/

// 960
@include breakpoint(l) {
  .tableTop3 {
    &__head,
    &__item {
      grid-template-columns: 44px 1fr 96px;
      padding-right: 0;
    }

    &__headItem {
      font-size: 13px;
    }

    &__item,
    &__itemWallet .baseCurrency__amount {
      font-size: 14px;
    }

    &__itemRank {
      padding-left: 8px;
    }
  }
}
</style>
