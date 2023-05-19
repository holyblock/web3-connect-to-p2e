<template>
  <div class="baseTabs">
    <button
      v-for="(el, i) in items"
      :key="el + i"
      :class="{ active: activeTab === i }"
      class="baseTabs__tab buttonReset pos--rel"
      @click="changeTab(i)">
      <p class="baseTabs__label ff--slab fw--500">{{ el }}</p>
      <TabUnderline class="baseTabs__underline pos--abs" />
    </button>
  </div>
</template>

<script>
import TabUnderline from '~/assets/svgs/interface/tab-underline.svg'

export default {
  name: 'BaseTabs',
  components: {
    TabUnderline
  },
  props: {
    active: {
      type: Number,
      default: 0
    },
    items: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      activeTab: this.active
    }
  },
  methods: {
    changeTab(index) {
      this.activeTab = index

      this.$emit('onTabChange', index)
    }
  }
}
</script>

<style lang="scss">
.baseTabs {
  margin-bottom: 24px;

  &__tab {
    &:not(:last-child) {
      margin-right: 32px;
    }
  }

  &__label {
    padding: 0 0 6px;
  }

  &__underline {
    left: 0;
    bottom: 0;
    width: 100%;
    stroke: white;
    opacity: 0.5;

    .active & {
      stroke: $green;
      opacity: 1;
    }
  }
}

@include breakpoint(m) {
  .baseTabs {
    &__tab:not(:last-child) {
      margin-right: 18px;
    }
  }
}
</style>
