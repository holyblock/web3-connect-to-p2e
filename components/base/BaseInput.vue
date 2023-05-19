<template>
  <label class="baseInput" :class="{ 'baseInput--disabled': disabled }">
    <p v-if="label" class="baseInput__label ff--clash fw--500 o--7">
      {{ label }}
      <span v-if="subLabel">{{ subLabel }}</span>
    </p>

    <div class="baseInput__contentHolder flex">
      <div class="baseInput__holder pos--rel">
        <IconSearch v-if="icon === 'search'" class="baseInput__icon pos--abs y--center z--1" />
        <input
          ref="input"
          :type="type"
          :placeholder="placeholder || label"
          :value="value"
          :class="{ 'baseInput__input--icon': icon }"
          class="baseInput__input ff--slab fw--500"
          @input="$emit('onInput', $event.target.value)" />
        <SvgBg class="baseInput__bg pos--abs inset z--0" />
      </div>

      <BaseBtn v-if="cta" class="baseInput__cta" :disabled="disabled" type="btn" @click="$emit('onBtnClick')">
        {{ cta }}
      </BaseBtn>
    </div>

    <p v-if="error" class="baseInput__error">{{ error }}</p>
  </label>
</template>

<script>
import IconSearch from '~/assets/svgs/interface/search.svg'
import SvgBg from '~/assets/svgs/interface/input-bg.svg'

export default {
  name: 'BaseInput',
  components: {
    IconSearch,
    SvgBg
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    subLabel: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text',
      validator(value) {
        return ['text', 'email', 'tel', 'password'].includes(value) // The value must match one of these strings
      }
    },
    icon: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    cta: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.baseInput {
  display: block;

  &--disabled {
    pointer-events: none;

    .baseInput__background {
      stroke-opacity: 0;
    }
  }

  &__label {
    display: block;
    margin-bottom: 8px;
  }

  &__holder {
    flex: 1;
  }

  &__icon {
    left: 16px;
    width: 24px;
    height: 24px;
  }

  &__input {
    width: 100%;
    /* min-width: 280px; */
    height: 56px;
    padding: 0 22px 2px;
    background: none;
    border: none;
    color: $white;

    &::placeholder {
      color: rgba($white, 0.5);
    }

    &--icon {
      padding-left: 48px;
    }
  }

  &__bg {
    width: 100%;
    height: 100%;
    stroke-opacity: 0.3;
    transition: stroke-opacity 0.3s;
    fill: rgba($white, 0.05);
  }

  &__cta {
    margin-left: 8px;
  }

  //
  &:hover .baseInput__bg,
  &:active .baseInput__bg,
  &:focus .baseInput__bg {
    stroke-opacity: 0.5;
  }
}
/*----------------------------------------*/

// 960
@include breakpoint(l) {
  .baseInput {
    &__input {
      height: 48px;
      font-size: 14px;
    }
  }
}
</style>
