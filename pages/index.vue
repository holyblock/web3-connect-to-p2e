<template>
  <div class="thePage thePage--home pos--rel z--2">
    <SceneMap />
  </div>
</template>

<script>
export default {
  name: 'PageHome',
  setup() {
    definePageMeta({ ...useTransition() })
    useOnPageLoad()
  }
}
</script>
