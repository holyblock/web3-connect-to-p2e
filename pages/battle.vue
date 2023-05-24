<template>
  <div class="thePage pos--rel z--2">
    <div class="container container--medium">

      <BattleStart v-if="battleState === 0" />
      <NftGrid v-else-if="battleState === 1" header="Select the Buccaneer you want to battle with" backLink subheader>
        <template #subheader>
          <BaseMapIcon class="globalBanner__subheaderIcon" type="battle" invert small />
          <p class="globalBanner__subheaderlabel ff--slab fc--para flex alignI--center gap--8">
            Attacks remaining today: <span class="fs--20 fc--white fw--700">{{ 5 }}/5</span>
          </p>
        </template>
      </NftGrid>
      <BattleFind v-else-if="battleState === 2" />
      <BattleAttack v-else-if="battleState === 3" />

    </div>
  </div>
</template>

<script>
import { usePiratesStore } from '~/stores/pirates'

export default {
  name: 'PageBattle',
  setup() {
    definePageMeta({ ...useTransition() })
    useOnPageLoad()
  },
  computed: {
    ...mapState(usePiratesStore, ['battleState'])
  }
}
</script>
