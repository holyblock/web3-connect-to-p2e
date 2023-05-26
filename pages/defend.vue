<template>
    <div class="thePage pos--rel z--2">
      <div class="container container--medium">
  
        <NftGrid v-if="defendState === 1" header="Select the Buccaneer you want to defend" backLink subheader>
          <template #subheader>
            <BaseMapIcon class="globalBanner__subheaderIcon" type="battle" invert small />
            <p class="globalBanner__subheaderlabel ff--slab fc--para flex alignI--center gap--8">
              Attacks remaining today: <span class="fs--20 fc--white fw--700">{{ 5 }} / 5</span>
            </p>
          </template>
        </NftGrid>
        <NftBase v-else-if="defendState === 2" type="defend" />
      </div>
    </div>
</template>
  
<script>
  import { usePiratesStore } from '~/stores/pirates'
  import { useCryptoStore } from '~~/stores/crypto'
  
  export default {
    name: 'PageBattle',
    setup() {
      definePageMeta({ ...useTransition() })
      useOnPageLoad()
    },
    created() {
      if (!useCryptoStore().walletAddress)
        this.$router.push('/')
    },
    computed: {
      ...mapState(usePiratesStore, ['defendState'])
    }
  }
  </script>
  