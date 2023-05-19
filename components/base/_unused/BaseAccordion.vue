<template>
  <div :class="{ 'baseAccordion--open': open }" class="baseAccordion">
    <button class="baseAccordion__toggle ta--left buttonReset" @click="open = !open">
      <h4 class="baseAccordion__header">{{ header }}</h4>
    </button>
    <div class="baseAccordion__content noEdgeMargin">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseAccordion',
  props: {
    header: {
      type: String,
      default: '',
      required: true
    },
    text: {
      type: String,
      default: '',
      required: true
    }
  },
  data() {
    return {
      open: false
    }
  }
}
</script>

<style lang="scss">
.baseAccordion {
  border: 1px solid rgba($black, 0.5);

  &__toggle {
    width: 100%;
    padding: 12px 20px;
  }

  &__content {
    display: none;
    padding: 0 20px 16px;
  }

  //
  &--open .baseAccordion__content {
    display: block;
  }

  &:hover {
    border: 1px solid rgba($black, 1);
  }
}
</style>
