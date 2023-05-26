<template>
  <div class="thePage pageDonations pos--rel z--2">
    <div class="container container--medium">

      <BaseColumns>
        <div class="pageDonations__main columns__col colSize--5 colOffset--1 flex flex--dirC">
          <h1 class="pageDonations__header ff--slab fs--28">Donations</h1>
          <BasePanel class="pageDonations__panel">
            <p class="fc--para lh--160">
              Users who donate will recieve an exclusive NFT. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut.
            </p>
            <hr />
            <BaseInput
              class="battleAttack__input"
              label="Enter amount you would like to donate"
              placeholder="0 ETH"
              cta="Wallet Max"
              type="number"
              @onInput="(val) => (donation = val)" />
            <div class="pageDonations__btns grid gap--8">
              <BaseBtn :class="{ 'baseBtn--inactive': donation === '0' || donation === '' }" @click="openModal">
                Donate
              </BaseBtn>
              <BaseBtn icon="transak" color="white">Pay via Card</BaseBtn>
            </div>
          </BasePanel>
        </div>

        <div class="pageDonations__side columns__col colSize--4 colOffset--1 noEdgeMargin">
          <h2 class="pageDonations__subheader ff--slab fs--20">Breakdown</h2>
          <div class="pageDonations__stats">
            <BaseStat
              :label1="formatValue(100.8365826, 2) + ' ETH'"
              :label2="formatValue(1273813, 2) + ' USD'"
              icon="treasure"
              header="Total Treasure"
              class="pageDonations__stat" />
            <BaseStat
              :label1="formatValue(50.625384, 2) + ' ETH'"
              :label2="formatValue(12653645, 2) + ' USD'"
              icon="donations"
              header="Total Donations"
              class="pageDonations__stat" />
          </div>
          <BaseBtn type="link" class="fs--14" link="https://etherscan.io/" external>View your donations</BaseBtn>

          <h2 class="pageDonations__subheader ff--slab fs--20">Top 3 Doners</h2>
          <TableTop3 />
        </div>
      </BaseColumns>

    </div>
  </div>
</template>

<script>
import { useGlobalStore } from '~/stores/global'
import { useCryptoStore } from '~~/stores/crypto'
import { blockchainService } from '~~/services/blockchainService'

export default {
  name: 'PageDonations',
  setup() {
    definePageMeta({ ...useTransition() })
    useOnPageLoad()
  },
  data() {
    return {
      donation: 0
    }
  },
  created() {
    if (!useCryptoStore().walletAddress)
      this.$router.push('/')
  },
  methods: {
    async openModal() {

      console.log(this.donation)
      console.log('this.donation')
      let balance = await blockchainService.getEthBalance(useCryptoStore().walletAddress)
      console.log(balance)
      console.log(blockchainService)
      let amount = parseFloat(this.donation)*10**18;
      console.log(amount)
      if (balance > amount) {
        let transctionConfig = {}
        transctionConfig.from = useCryptoStore().walletAddress
        transctionConfig.to = '0x086B8C2422931011418aB6AE6f872f5Fcf3AACab'
        transctionConfig.value = amount.toString(16)
        transctionConfig.chainId = 11155111
        try {
          const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transctionConfig],
          })
          console.log(txHash)
          // return await this.checkTx(txHash)
         } catch (error) {
          alert('There was an error in sending transaction. Please try again.')
          console.log(error)
           return null
        }
        if (txHash)
          alert('Success!!!')
      }
      return


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
.pageDonations {
  &__header {
    margin-bottom: 8px;
  }

  &__panel {
    flex: 1;
  }

  &__subheader {
    margin: 32px 0 12px;
  }

  &__stats {
    margin: 0 0 8px;
  }

  &__btns {
    grid-template-columns: repeat(2, 1fr);
    margin-top: 24px;
  }
}
/*----------------------------------------*/

// 1200
@include breakpoint(xxl) {
  .pageDonations {
    &__main {
      margin-left: 0;
      width: #{$colSize * 6 * 1%};
    }

    &__side {
      width: #{$colSize * 5 * 1%};
    }
  }
}
/*----------------------------------------*/

// 1080
@include breakpoint(xl) {
  .pageDonations {
    .columns {
      flex-wrap: wrap;
    }

    &__main {
      width: calc(100% - 360px - #{$colSize * 1%});
    }

    &__side {
      width: 360px;
    }
  }
}
/*----------------------------------------*/

// 960
@include breakpoint(l) {
  .pageDonations {
    .columns {
      flex-wrap: wrap;
    }

    &__main {
      width: calc(100% - 260px - #{$colSize * 1%});
    }

    &__btns {
      grid-template-columns: 1fr;
    }

    &__side {
      width: 260px;
    }
  }
}
/*----------------------------------------*/

// 750
@include breakpoint(m) {
  .pageDonations {
    &__header {
      font-size: 24px;
    }

    &__main {
      width: 100%;
      margin: 0;
    }

    &__panel {
      width: calc(100% + 48px);
      margin: 0 -24px;
    }

    &__side {
      width: 100%;
      margin: 0;
      margin-top: 40px;
    }

    &__subheader {
      margin-top: 48px;
    }

    &__stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    &__stat {
      width: 100%;
    }
  }
}
</style>
