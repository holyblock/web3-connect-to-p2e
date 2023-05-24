<template>
  <label class="baseSelect">
    <p v-if="label" class="baseSelect__label">{{ label }}</p>
    <div class="baseSelect__content grid alignI--center pos--rel">
      <select
        class="baseSelect__select ff--slab fc--white fs--16 fw--500"
        @change="$emit('onChange', $event.target.value)">
        <option
          v-for="(el, index) in options"
          :key="el + index"
          :value="el.value || el.label.toLowerCase()"
          :selected="el.selected ? true : false">
          {{ el.label }}
        </option>
      </select>
      <IconBg class="baseSelect__bg pos--abs inset z--0" />
    </div>
  </label>
</template>

<script>
import IconBg from '~/assets/svgs/interface/input-bg.svg'

export default {
  name: 'BaseSelect',
  components: {
    IconBg
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: null
    }
  }
}
</script>

<style lang="scss">
.baseSelect {
  &__label {
    display: block;
    margin-bottom: 8px;
  }

  &__content::after {
    content: '';
    position: absolute;
    right: 24px;
    top: calc(50% - 3px);
    border: 6px solid transparent;
    border-top-color: $white;
    border-bottom: 0;
    width: 8px;
    aspect-ratio: 1;
    pointer-events: none;
  }

  &__bg {
    width: 100%;
    height: 100%;
    stroke-opacity: 0.3;
    transition: stroke-opacity 0.3s ease;
    fill: rgba($white, 0.05);
  }

  &__select {
    padding: 0 24px;
    border: 0;
    height: 56px;
    background: 0;
    cursor: pointer;
    appearance: none;
    outline: 0;
  }

  //
  &:hover .baseSelect__bg,
  &:active .baseSelect__bg,
  &:focus .baseSelect__bg {
    stroke-opacity: 0.5;
  }
}
/*----------------------------------------*/

// 960
@include breakpoint(l) {
  .baseSelect {
    &__select {
      height: 48px;
      font-size: 14px;
    }
  }
}
</style>
