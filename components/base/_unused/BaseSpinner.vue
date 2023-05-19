<template>
  <div :class="['baseSpinner--' + size, 'baseSpinner--' + color]" class="baseSpinner" />
</template>

<script>
export default {
  name: 'BaseSpinner',
  props: {
    size: {
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'small', 'smaller'].includes(value) // The value must match one of these strings
      }
    },
    color: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes spinXY {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.baseSpinner {
  display: block;
  width: 32px;
  height: 32px;
  border: 3px solid rgba($black, 0.2);
  border-radius: 50%;
  margin: 0 auto;
  border-top-color: $black;
  animation: spin 1s ease-in-out infinite;

  // sizes
  &--small {
    width: 24px;
    height: 24px;
  }

  &--smaller {
    width: 16px;
    height: 16px;
  }

  // colors
  &--white {
    border: 3px solid rgba($white, 0.2);
    border-top-color: $white;
  }

  // if positioned abs or fix and centred, change animtion
  &.xy--center {
    animation: spinXY 1s ease-in-out infinite;
  }
}
</style>
