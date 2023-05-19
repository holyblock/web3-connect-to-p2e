import { useGlobalStore } from '~/stores/global'

export const useOnPageLoad = () => {
  const route = useRoute()

  // store current page name
  setTimeout(() => {
    useGlobalStore().updatePage(route.name)
  }, 100)

  // play
  if (route.name !== 'index') useGlobalStore().updatePlayStormAnim(true)
}
