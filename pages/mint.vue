<template>
  <div class="thePage pageMint flex alignI--center pos--rel z--2">
    <div class="container container--medium">
      <MintForm />
    </div>
  </div>
</template>

<script>
import { useCryptoStore } from '~/stores/crypto'

export default {
  name: 'PageMint',
  setup() {
    definePageMeta({ ...useTransition() })
    useOnPageLoad()
  },
  created() {
    if (!useCryptoStore().walletAddress){
      alert('connect your metamask wallet first')
      this.$router.push('/')
    }
  },
}
</script>
