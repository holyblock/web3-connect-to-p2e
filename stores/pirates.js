import { defineStore } from 'pinia'
import { useCryptoStore } from '~/stores/crypto'


export const usePiratesStore = defineStore('pirates', {
  state() {
    return {
      pirates: null,
      battleState: 0,
      defenceMode: false,
      trainingState: 0,
      shareImage: null,
      selectedId: null,
      findAttack: '' // added by john '' ? randome attack : find attack
    }
  },
  getters: {
    getSelectedBuccaneer: (state) => {
      return state.pirates.find( p => p.id == state.selectedId)
    }
  },
  actions: {
    // get users nft data and populate store
    async updatePirates() {
      console.log('updatePirates')
      let req = {}
      req.address = useCryptoStore().walletAddress
      console.log('Request:', req)
      var res = await $fetch('/api/pirates', { method: 'post', body: req })
      console.log(res)
      let pirates = res.pirates || []
      // console.log(pirates)


      // for demo purposes
      // const tempData = [
      //   {
      //     id: 182,
      //     image: '/images/nfts/temp1.png',
      //     endOfSeasonImg: '/images/modal/end-of-season-share.png',
      //     name: 'Pete Blackbeard',
      //     level: 4,
      //     gang: null,
      //     wins: 2,
      //     losses: 4,
      //     traits: [
      //       { name: 'Background', value: 'Blue' },
      //       { name: 'Beard', value: 'Yes' },
      //       { name: 'Hair', value: 'Red' },
      //       { name: 'Eyes', value: 'Cyborg' },
      //       { name: 'Clothes', value: 'General' },
      //       { name: 'Skin', value: 'Brown' },
      //       { name: 'Hat', value: 'Bandana' },
      //       { name: 'Power', value: 'Skull Barrel' },
      //       { name: 'Eye Patch', value: 'No' },
      //       { name: 'Objects', value: 'Gun' },
      //       { name: 'Parrot', value: 'Red' },
      //       { name: 'Hook', value: 'No' }
      //     ],
      //     stats: [
      //       { group: 'Physical', name: 'Weapon', value: 2 },
      //       { group: 'Physical', name: 'Attack', value: 1 },
      //       { group: 'Physical', name: 'Defence', value: 2 },
      //       { group: 'Physical', name: 'Agility/Speed', value: 2 },
      //       { group: 'Mental', name: 'Cunning', value: 3 },
      //       { group: 'Mental', name: 'Ruthlessness', value: 1 },
      //       { group: 'Mental', name: 'Strategy', value: 2 },
      //       { group: 'Mental', name: 'Seamanship', value: 1 },
      //       { group: 'Spiritual', name: 'Foresight', value: 3 },
      //       { group: 'Spiritual', name: 'Spirit', value: 3 },
      //       { group: 'Spiritual', name: 'Faith', value: 2 },
      //       { group: 'Spiritual', name: 'Benevolence', value: '-' }
      //     ]
      //   },
      //   {
      //     id: 1936,
      //     image: '/images/nfts/temp2.png',
      //     endOfSeasonImg: '/images/modal/end-of-season-share.png',
      //     name: 'Captain Crabby',
      //     level: 5,
      //     gang: null,
      //     wins: 12,
      //     losses: 6,
      //     traits: [
      //       { name: 'Background', value: 'Red' },
      //       { name: 'Beard', value: 'Yes' },
      //       { name: 'Hair', value: 'Blue' },
      //       { name: 'Eyes', value: 'Cyborg' },
      //       { name: 'Clothes', value: 'General' },
      //       { name: 'Skin', value: 'Blue' },
      //       { name: 'Hat', value: 'Bandana' },
      //       { name: 'Power', value: 'Skull Barrel' },
      //       { name: 'Eye Patch', value: 'No' },
      //       { name: 'Objects', value: 'Gun' },
      //       { name: 'Parrot', value: 'None' },
      //       { name: 'Hook', value: 'No' }
      //     ],
      //     stats: [
      //       { group: 'Physical', name: 'Weapon', value: 1 },
      //       { group: 'Physical', name: 'Attack', value: 2 },
      //       { group: 'Physical', name: 'Defence', value: 1 },
      //       { group: 'Physical', name: 'Agility/Speed', value: 1 },
      //       { group: 'Mental', name: 'Cunning', value: 4 },
      //       { group: 'Mental', name: 'Ruthlessness', value: 2 },
      //       { group: 'Mental', name: 'Strategy', value: 2 },
      //       { group: 'Mental', name: 'Seamanship', value: 1 },
      //       { group: 'Spiritual', name: 'Foresight', value: 3 },
      //       { group: 'Spiritual', name: 'Spirit', value: 3 },
      //       { group: 'Spiritual', name: 'Faith', value: 2 },
      //       { group: 'Spiritual', name: 'Benevolence', value: '-' }
      //     ]
      //   },
      //   {
      //     id: 26,
      //     image: '/images/nfts/temp3.png',
      //     endOfSeasonImg: '/images/modal/end-of-season-share.png',
      //     name: 'Pete Blackbeard',
      //     level: 4,
      //     gang: null,
      //     wins: 2,
      //     losses: 0,
      //     traits: [
      //       { name: 'Background', value: 'Blue' },
      //       { name: 'Beard', value: 'Yes' },
      //       { name: 'Hair', value: 'Red' },
      //       { name: 'Eyes', value: 'Cyborg' },
      //       { name: 'Clothes', value: 'General' },
      //       { name: 'Skin', value: 'Brown' },
      //       { name: 'Hat', value: 'Bandana' },
      //       { name: 'Power', value: 'Skull Barrel' },
      //       { name: 'Eye Patch', value: 'No' },
      //       { name: 'Objects', value: 'Gun' },
      //       { name: 'Parrot', value: 'Red' },
      //       { name: 'Hook', value: 'No' }
      //     ],
      //     stats: [
      //       { group: 'Physical', name: 'Weapon', value: 2 },
      //       { group: 'Physical', name: 'Attack', value: 1 },
      //       { group: 'Physical', name: 'Defence', value: 2 },
      //       { group: 'Physical', name: 'Agility/Speed', value: 2 },
      //       { group: 'Mental', name: 'Cunning', value: 3 },
      //       { group: 'Mental', name: 'Ruthlessness', value: 1 },
      //       { group: 'Mental', name: 'Strategy', value: 2 },
      //       { group: 'Mental', name: 'Seamanship', value: 1 },
      //       { group: 'Spiritual', name: 'Foresight', value: 3 },
      //       { group: 'Spiritual', name: 'Spirit', value: 3 },
      //       { group: 'Spiritual', name: 'Faith', value: 2 },
      //       { group: 'Spiritual', name: 'Benevolence', value: '-' }
      //     ]
      //   },
      //   {
      //     id: 837,
      //     image: '/images/nfts/temp5.png',
      //     endOfSeasonImg: '/images/modal/end-of-season-share.png',
      //     name: 'Pete Bluebeard',
      //     level: 5,
      //     gang: 'The Shiver Boys',
      //     wins: 8,
      //     losses: 1,
      //     traits: [
      //       { name: 'Background', value: 'Red' },
      //       { name: 'Beard', value: 'Yes' },
      //       { name: 'Hair', value: 'Blue' },
      //       { name: 'Eyes', value: 'Cyborg' },
      //       { name: 'Clothes', value: 'General' },
      //       { name: 'Skin', value: 'Blue' },
      //       { name: 'Hat', value: 'Bandana' },
      //       { name: 'Power', value: 'Skull Barrel' },
      //       { name: 'Eye Patch', value: 'No' },
      //       { name: 'Objects', value: 'Gun' },
      //       { name: 'Parrot', value: 'None' },
      //       { name: 'Hook', value: 'No' }
      //     ],
      //     stats: [
      //       { group: 'Physical', name: 'Weapon', value: 1 },
      //       { group: 'Physical', name: 'Attack', value: 2 },
      //       { group: 'Physical', name: 'Defence', value: 1 },
      //       { group: 'Physical', name: 'Agility/Speed', value: 1 },
      //       { group: 'Mental', name: 'Cunning', value: 4 },
      //       { group: 'Mental', name: 'Ruthlessness', value: 2 },
      //       { group: 'Mental', name: 'Strategy', value: 2 },
      //       { group: 'Mental', name: 'Seamanship', value: 1 },
      //       { group: 'Spiritual', name: 'Foresight', value: 3 },
      //       { group: 'Spiritual', name: 'Spirit', value: 3 },
      //       { group: 'Spiritual', name: 'Faith', value: 2 },
      //       { group: 'Spiritual', name: 'Benevolence', value: '-' }
      //     ]
      //   }
      // ]

      this.pirates = pirates
      // this.pirates = tempData
    },

    //

    updateShareImage(pirateId) {
      this.shareImage = this.pirates[pirateId].endOfSeasonImg
    },
    updateBattleState(battleState) {
      this.battleState = battleState
    },
    updateDefenceMode(defenceMode) {
      this.defenceMode = defenceMode
    },
    updateTrainingState(trainingState) {
      this.trainingState = trainingState
    },
    updateSelectedId(selectedId) {
      this.selectedId = selectedId
    }
  }
})
