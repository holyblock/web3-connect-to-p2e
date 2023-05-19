<template>
  <div class="thePage pageMint flex alignI--center pos--rel z--2">
    <div class="container container--medium">
      <!--  -->

      <MintForm />

      <!--  -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageMint',
  setup() {
    definePageMeta({ ...useTransition() })
    useOnPageLoad()
  }
}
</script>
