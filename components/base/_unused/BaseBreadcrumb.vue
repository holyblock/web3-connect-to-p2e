<template>
  <ul class="baseBreadcrumb flex noList">
    <li class="baseBreadcrumb__item">
      <NuxtLink to="/" class="baseBreadcrumb__link">{{ firstPage }}</NuxtLink>
    </li>
    <li v-for="(el, i) in items" :key="el + i" class="baseBreadcrumb__item">
      <NuxtLink :to="fullSlug(i)" class="baseBreadcrumb__link" v-html="toTitleCase(el)" />
    </li>
  </ul>
</template>

<script>
import { helpers } from '~/mixins/helpers.js'

export default {
  name: 'BaseBreadcrumb',
  mixins: [helpers],
  props: {
    firstPage: {
      type: String,
      default: 'Home'
    }
  },
  computed: {
    items() {
      const path = this.$route.path
      const split = path.split('/')
      const items = []

      split.forEach((el) => {
        if (el !== '') {
          items.push(el)
        }
      })

      return items
    }
  },
  methods: {
    fullSlug(index) {
      let res = '/'

      for (let i = 0; i <= index; i++) {
        res += this.items[i] + '/'
      }

      return res
    }
  }
}
</script>

<style lang="scss">
.baseBreadcrumb {
  &__item {
    &::after {
      content: '>';
      margin: 0 12px;
      opacity: 0.3;
      font-size: 16px;
    }

    &:last-child::after {
      content: none;
    }

    &:last-child .baseBreadcrumb__link {
      border-bottom: 0;
      pointer-events: none;
    }
  }

  &__link {
    display: inline-block;
    padding-bottom: 2px;
    border-bottom: 1px solid rgba($black, 0.3);
    transition: border-bottom 0.2s ease;

    &:hover {
      border-bottom: 1px solid rgba($black, 0.7);
    }
  }
}
</style>
