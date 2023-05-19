import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state() {
    return {
      preloader: true,
      page: 'index',
      menu: false,
      alert: null,
      modal: null,
      playStormAnim: false,
      disabledPages: ['oracle', 'gangs']
    }
  },
  actions: {
    updatePage(page) {
      this.page = page
    },
    updatePreloader(preloader) {
      this.preloader = preloader
    },
    updateMenu(menu) {
      this.menu = menu
    },
    updateAlert(alert) {
      this.alert = alert
    },
    updateModal(modal) {
      this.modal = modal
    },
    updatePlayStormAnim(playStormAnim) {
      this.playStormAnim = playStormAnim
    },
    updateDisabledPages(page) {
      this.disabledPages.push(page)
    }
  }
})
