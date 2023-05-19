import { useGlobalStore } from '~/stores/global'
import gsap from 'gsap'

export const useTransition = () => {
  return {
    pageTransition: {
      name: 'default',
      mode: 'out-in',
      onLeave: (el, done) => {
        if (useGlobalStore().preloader) useGlobalStore().updatePreloader(false)

        gsap.to(el, {
          duration: 0.4,
          autoAlpha: 0,
          onComplete() {
            done()
          }
        })
      },
      onEnter: (el, done) => {
        const route = useRoute()
        useGlobalStore().updatePage(route.name)

        if (route.name === 'index') useGlobalStore().updatePlayStormAnim(false)

        gsap.fromTo(
          el,
          { autoAlpha: 0 },
          {
            duration: 0.4,
            autoAlpha: 1,
            onComplete() {
              done()
            }
          }
        )
      }
    }
  }
}
