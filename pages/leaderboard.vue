<template>
  <div class="thePage pos--rel z--2">
    <div class="container container--medium">
      <GlobalBanner header="Leaderboard" />
      <TableMain />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageLeaderboard',
  setup() {
    definePageMeta({ ...useTransition() })
    useOnPageLoad()
  }
}
</script>
