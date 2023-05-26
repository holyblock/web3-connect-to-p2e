<template>
  <BasePanel class="baseTable">
    <div v-for="(item, key) of items" :key="item + key" class="baseTable__item grid alignI--center pos--rel">
      <p v-if="attr" class="ff--clash fs--14 o--5">{{ item.name }}</p>
      <p v-else class="ff--clash fs--14 o--5">{{ item.trait_type }}</p>
      <p class="ff--slab fs--14 ta--right">{{ item.value }}</p>

      <TableBackground v-if="key % 2 === 0" class="baseTable__background pos--abs" />
    </div>
  </BasePanel>
</template>

<script>
import TableBackground from '~/assets/svgs/interface/table-background.svg'

export default {
  name: 'BaseTable',
  components: {
    TableBackground
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    attr : {
      type: Boolean,
      default: true
    }

  }
}
</script>

<style lang="scss">
.baseTable {
  padding: 19px 32px;

  &__item {
    padding: 5px 0;
    grid-template-columns: auto max-content;
  }

  &__background {
    top: 0;
    left: -26px;
    width: calc(100% + 52px);
    height: 100%;
    z-index: -1;
  }
}
</style>