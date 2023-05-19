<template>
  <label class="baseCheckbox flex alignI--center">
    <input
      :checked="checked"
      type="checkbox"
      class="baseCheckbox__checkbox"
      @change="$emit('the-val', $event.target.checked)" />
    <div class="baseCheckbox__box" />
    <p class="baseCheckbox__label"><slot /></p>
  </label>
</template>

<script>
export default {
  name: 'BaseCheckbox',
  props: {
    checked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.baseCheckbox {
  &__checkbox {
    display: none;

    &:checked + .baseCheckbox__box {
      background: $green;
    }
  }

  &__box {
    width: 32px;
    height: 32px;
    border: 1px solid rgba($black, 0.5);
    cursor: pointer;

    &:hover {
      border: 1px solid rgba($black, 1);
    }
  }

  &__label {
    flex: 1;
    padding-left: 16px;
  }
}
</style>
