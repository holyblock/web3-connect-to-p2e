<template>
  <div class="thePage pos--rel z--2">
    <div class="container container--medium">
      <NftGrid v-if="trainingState === 0" header="Select the Buccaneer you want to train" />
      <NftBase v-if="trainingState === 1" type="upgrade" />
    </div>
  </div>
</template>

<script>
import { usePiratesStore } from '~/stores/pirates'

export default {
  name: 'PageTraining',
  setup() {
    definePageMeta({ ...useTransition() })
    useOnPageLoad()
  },
  computed: {
    ...mapState(usePiratesStore, ['trainingState', 'defenceMode'])
  }
}
</script>
