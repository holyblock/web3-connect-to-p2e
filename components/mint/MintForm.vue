<template>
  <section class="mintForm">
    <BaseColumns>

      <div class="mintForm__imgHolder columns__col colSize--5">
        <img class="mintForm__img" src="/images/nfts/poster.png" />
      </div>

      <div class="mintForm__formHolder columns__col colSize--5 colOffset--1 flex alignC--center">
        <h1 class="mintForm__header ff--slab fs--28">Mint your Buccaneer NFT</h1>
        <p class="mintForm__paragraph fc--para lh--150">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisai ut aliquip ex ea
          commodo consequat.
        </p>

        <div class="mintForm__mintDetails pos--rel">
          <!-- <p class="mintForm__available fc--para ff--slab fs--16">
            Available to Mint: <span class="fc--white fs--20 fw--600">10/10</span>
          </p> -->
          <BaseCurrency :value="mintingPrice" showUsdConversion showCurrency class="mintForm__cost" />
        </div>

        <div v-if="!isWalletConnected" class="mintForm__buttons flex gap--12">
          <BaseBtn @click="connectWallet">Connect Wallet</BaseBtn>
        </div>

        <div v-else class="mintForm__buttons flex gap--12">
          <BaseBtn @click="openModal">Mint for {{ mintingPrice }} ETH</BaseBtn>
          <!-- <BaseBtn icon="transak" color="white">Pay via Card</BaseBtn> -->
        </div>
      </div>

    </BaseColumns>
  </section>
</template>

<script>
import { useGlobalStore } from '~/stores/global'
import { useCryptoStore } from '~/stores/crypto'


export default {
  name: 'MintForm',
  data() {
    return {
      isWalletConnected: useCryptoStore().isWalletConnected,
      mintingPrice: useCryptoStore().mintingPrice
    }
  },
  methods: {
    connectWallet() {
      this.isWalletConnected = true
    },
    openModal() {
      const data = {
        type: 'default',
        // level: 3,
        header: 'Review Transaction',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
        // upgradeLevelTo: 3,
        totalFee: 0.8,
        breakdown: [
          {
            label: 'Treasure Chest:',
            value: 0.06
          },
          {
            label: 'Donation to DAV',
            value: 0.02
          }
        ],
        // battle: {
        //   won: 1,
        //   lost: 2
        // },
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
.mintForm {
  &__img {
    width: 100%;
    transform: rotate(-3deg);
  }

  &__header {
    margin-bottom: 16px;
  }

  &__paragraph {
    margin-bottom: 38px;
  }

  &__mintDetails {
    width: 100%;
    max-width: 312px;
    margin-bottom: 32px;
    padding: 16px 0 20px;

    &:before,
    &:after {
      content: '';
      position: absolute;
      left: 0;
      width: 100%;
      height: 1px;
      background: url('/images/interface/border-image.png');
    }

    &:before {
      top: 0;
    }

    &:after {
      bottom: 0;
    }
  }

  &__available {
    margin-bottom: 8px;
  }

  &__buttons {
    width: 100%;
  }
}
/*----------------------------------------*/

// 750
@include breakpoint(m) {
  .mintForm {
    margin-top: -64px;

    &__imgHolder {
      width: 100%;
      margin-bottom: 24px;
    }

    &__img {
      display: block;
      width: 80%;
      max-width: 320px;
      margin: 0 auto 8px;
    }

    &__formHolder {
      width: 100%;
      margin-left: 0;
    }

    &__mintDetails {
      max-width: none;
    }

    &__buttons .baseBtn {
      width: 100%;
    }

    &__cardButton {
      justify-content: center;
    }
  }
}
</style>
