<template>
  <div :class="'baseAlert--' + type" class="baseAlert">
    <ul class="baseAlert__items">
      <li v-for="(el, i) in items" :key="el + i" class="baseAlert__item">{{ el }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BaseAlert',
  props: {
    type: {
      type: String,
      default: 'error',
      validator(value) {
        return ['error', 'warning', 'success'].includes(value) // The value must match one of these strings
      }
    },
    items: {
      type: Array,
      default: null,
      required: true
    }
  }
}
</script>

<style lang="scss">
.baseAlert {
  padding: 12px 16px;

  //
  &--error {
    border: 1px dashed $error;
    color: $error;
  }

  &--warning {
    border: 1px dashed $warning;
    color: $warning;
  }

  &--success {
    border: 1px dashed $success;
    color: $success;
  }
}
</style>
