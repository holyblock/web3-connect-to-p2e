<template>
  <div :class="'baseTooltip--' + direction" class="baseTooltip ta--center pos--abs x--center z--2 o--0">
    <div class="baseTooltip__label"><slot /></div>
  </div>
</template>

<script>
export default {
  name: 'BaseTooltip',
  props: {
    direction: {
      type: String,
      default: 'top',
      validator(value) {
        return ['top', 'bottom'].includes(value) // The value must match one of these strings
      }
    }
  }
}
</script>

<style lang="scss">
.baseTooltip {
  background: $black;
  padding: 10px 10px 8px;
  max-width: 200px;
  pointer-events: none;
  transition: transform 0.3s ease, opacity 0.3s ease;

  &::after {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    border-style: solid;
    left: 50%;
    transform: translateX(-50%);
  }

  &__label {
    color: $white;
  }

  &__top {
    margin-bottom: 4px;
  }

  // directions
  //
  &--top {
    transform: translate(-50%, 8px);
    bottom: 110%;

    &::after {
      top: 100%;
      border-width: 5px 10px 0 10px;
      border-color: $black transparent transparent transparent;
    }
  }

  &--bottom {
    transform: translate(-50%, -8px);
    top: 110%;

    &::after {
      bottom: 100%;
      border-width: 0 10px 5px 10px;
      border-color: transparent transparent $black transparent;
    }
  }

  //
  &__parent:hover .baseTooltip {
    transform: translate(-50%, 0);
    opacity: 1;
  }
}
</style>
