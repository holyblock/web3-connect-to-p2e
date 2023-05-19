import { defineStore } from 'pinia'

export const useGangsStore = defineStore('gangs', {
  state() {
    return {
      state: 0,
      loading: true,
      gangLeader: null,
      name: null,
      members: null,
      cluesSolved: 4,
      rank: 257
    }
  },
  actions: {
    updateState(state) {
      this.state = state
    },
    updateLoading(loading) {
      this.loading = loading
    },
    updateGangLeader(gangLeader) {
      this.gangLeader = gangLeader
    },
    updateName(name) {
      this.name = name
    },
    updateMembers(members) {
      // this.members = members

      // for demo purposes
      this.members = [
        {
          id: 837,
          image: '/images/nfts/temp5.png',
          name: 'Pete Bluebeard',
          level: 5,
          gang: 'The Shiver Boys',
          traits: [
            { name: 'Background', value: 'Red' },
            { name: 'Beard', value: 'Yes' },
            { name: 'Hair', value: 'Blue' },
            { name: 'Eyes', value: 'Cyborg' },
            { name: 'Clothes', value: 'General' },
            { name: 'Skin', value: 'Blue' },
            { name: 'Hat', value: 'Bandana' },
            { name: 'Power', value: 'Skull Barrel' },
            { name: 'Eye Patch', value: 'No' },
            { name: 'Objects', value: 'Gun' },
            { name: 'Parrot', value: 'None' },
            { name: 'Hook', value: 'No' }
          ],
          stats: [
            { group: 'Physical', name: 'Weapon', value: 1 },
            { group: 'Physical', name: 'Attack', value: 2 },
            { group: 'Physical', name: 'Defence', value: 1 },
            { group: 'Physical', name: 'Agility/Speed', value: 1 },
            { group: 'Mental', name: 'Cunning', value: 4 },
            { group: 'Mental', name: 'Ruthlessness', value: 2 },
            { group: 'Mental', name: 'Strategy', value: 2 },
            { group: 'Mental', name: 'Seamanship', value: 1 },
            { group: 'Spiritual', name: 'Foresight', value: 3 },
            { group: 'Spiritual', name: 'Spirit', value: 3 },
            { group: 'Spiritual', name: 'Faith', value: 2 },
            { group: 'Spiritual', name: 'Benevolence', value: '-' }
          ]
        }
      ]
    }
  }
})
