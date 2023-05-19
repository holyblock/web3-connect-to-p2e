<template>
  <div class="thePage pageMyPirates flex alignI--center pos--rel z--2">
    <div class="container container--medium">
      <NftBase type="info" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageMyPirates',
  setup() {
    definePageMeta({ ...useTransition() })
    useOnPageLoad()
  }
}
</script>
