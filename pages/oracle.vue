<template>
  <div class="thePage pos--rel z--2">
    <div class="container container--medium">
      <GlobalBanner header="Oracle" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageOracle',
  setup() {
    definePageMeta({ ...useTransition() })
    useOnPageLoad()
  }
}
</script>
