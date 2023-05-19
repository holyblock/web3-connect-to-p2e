<template>
  <div class="thePage pageDonations pos--rel z--2">
    <div class="container container--medium">
      <!--  -->

      <GangStart v-if="state === 0" @state-changed="(val) => (state = val)" />
      <NftGrid v-else-if="state === 1" header="Select the pirate you want as your Gang leader" backLink />
      <GangName v-else-if="state === 2" />
      <GangDetails v-else-if="state === 3" />

      <!--  -->
    </div>
  </div>
</template>

<script>
import { useGangsStore } from '~/stores/gangs'

export default {
  name: 'PageGangs',
  setup() {
    definePageMeta({ ...useTransition() })
    useOnPageLoad()
  },
  computed: {
    ...mapState(useGangsStore, ['state'])
  }
}
</script>
