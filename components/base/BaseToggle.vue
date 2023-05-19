<template>
  <button
    :class="{ 'baseToggle--multi': multi }"
    class="baseToggle flex gap--12 alignI--center buttonReset"
    @click="toggle">
    <p
      v-if="label1"
      :class="{ 'baseToggle__label--active': !active }"
      class="baseToggle__label ff--slab fs--22 fc--white fw--700">
      {{ label1 }}
    </p>
    <div :class="{ 'baseToggle__switch--active': active }" class="baseToggle__switch pos--rel" />
    <p
      v-if="label2"
      :class="{ 'baseToggle__label--active': active }"
      class="baseToggle__label ff--slab fs--22 fc--white fw--700">
      {{ label2 }}
    </p>
  </button>
</template>

<script>
export default {
  name: 'BaseToggle',
  props: {
    label1: {
      type: String,
      default: ''
    },
    label2: {
      type: String,
      default: ''
    },
    multi: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: false
    }
  },
  methods: {
    toggle() {
      this.active = !this.active
      this.$emit('onToggle', this.active)
    }
  }
}
</script>

<style lang="scss">
.baseToggle {
  height: max-content;

  &__label {
    transition: opacity 0.3s ease;
  }

  &__switch {
    border: 1px solid rgba($white, 0.2);
    border-radius: 20px;
    width: 36px;
    height: 20px;
    background: rgba($white, 0.1);
    transition: border-color 0.3s ease, background 0.3s ease;

    &::after {
      content: '';
      position: absolute;
      margin: 3px;
      left: 0;
      border-radius: 50%;
      width: 12px;
      aspect-ratio: 1;
      background: $white;
      transition: left 0.3s;
    }

    &--active {
      background: rgba($white, 0.2);
      border-color: rgba($white, 0.5);
    }

    &--active::after {
      left: calc(100% - 18px);
    }
  }

  //
  &--multi {
    .baseToggle__label {
      opacity: 0.5;
    }

    .baseToggle__label--active {
      opacity: 1;
    }
  }

  //
  &:hover .baseToggle__switch,
  &:active .baseToggle__switch,
  &:focus .baseToggle__switch {
    border-color: rgba($white, 0.7);
  }
}
/*----------------------------------------*/

// 500
@include breakpoint(s) {
  .baseToggle {
    &__label {
      font-size: 18px;
    }
  }
}
</style>
