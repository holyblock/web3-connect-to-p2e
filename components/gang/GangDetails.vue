<template>
  <section class="gangDetails">
    <!--  -->

    <GlobalBanner :header="name" subheader>
      <template #subheader>
        <BaseMapIcon class="globalBanner__subheaderIcon" type="gangs" invert small />
        <p class="globalBanner__subheaderlabel ff--slab fc--para flex alignI--center gap--8">
          Gang members: <span class="fs--20 fc--white fw--700">{{ members?.length || 0 }}/8</span>
        </p>
      </template>
    </GlobalBanner>

    <BaseColumns class="alignI--start">
      <div class="gangDetails__main colSize--6">
        <div class="gangDetails__details colSize--10">
          <h2 class="gangDetails__header ff--slab fs--20">Find gang members</h2>
          <p class="gangDetails__text fc--para lh--160">
            You have no gang members, search for Pirates to invite to your gang or launch Discord to start a chat and
            find some gang members or start inviting pirates to your gang.
          </p>
          <BaseBtn class="gangDetails__btn" color="white" icon="discord" link="https://www.discord.com/" external>
            Launch Discord
          </BaseBtn>
        </div>

        <div v-if="members" class="gangDetails__members grid gap--4">
          <NftCard
            v-for="(el, i) in members"
            :key="el + i"
            :image="el.image"
            :level="el.level"
            learnMore
            class="gangDetails__member" />
          <div v-for="(item, i) in 8 - members.length" :key="item + i" class="gangDetails__blurred">
            <img class="gangDetails__blurredImg o--5" src="/images/nfts/blurred.png" />
          </div>
        </div>
      </div>

      <div class="gangDetails__side colSize--5 colOffset--1 grid gap--8">
        <BasePanel class="basePanel--condensed">
          <div class="flex alignI--center justifyC--between">
            <h3 class="ff--slab fs--20">Clues Solved</h3>
            <p class="ff--slab fs--20 fw--700">{{ cluesSolved }}/12</p>
          </div>
          <BaseClues :solved="cluesSolved" class="gangDetails__clues" />
        </BasePanel>

        <BasePanel class="basePanel--condensed">
          <div class="flex alignI--center justifyC--between">
            <div class="flex alignI--center gap--12">
              <BaseMapIcon type="leaderboard" small invert />
              <h3 class="ff--slab fs--20">Rank</h3>
            </div>
            <p class="ff--slab fs--32 fw--700">#{{ rank }}</p>
          </div>
        </BasePanel>

        <BasePanel>
          <div class="grid gap--8">
            <h5 class="ff--slab fs--20">Search Pirate</h5>
            <p class="fc--para lh--160">Search for Pirates to invite to your gang</p>
            <BaseInput placeholder="Search by Pirate name" icon="search" @onInput="(val) => (searchPirate = val)" />
            <BaseBtn :class="{ 'baseBtn--inactive': searchPirate.length < 6 }" class="baseBtn--full">
              Invite Pirate for 0.1 ETH
            </BaseBtn>
          </div>
        </BasePanel>
      </div>
    </BaseColumns>

    <!--  -->
  </section>
</template>

<script>
import { usePiratesStore } from '~/stores/pirates'
import { useGangsStore } from '~/stores/gangs'

export default {
  name: 'GangDetails',
  data() {
    return {
      pirates: usePiratesStore(),
      gangs: useGangsStore(),
      searchPirate: ''
    }
  },
  computed: {
    ...mapState(useGangsStore, ['name', 'members', 'cluesSolved', 'rank'])
  },
  mounted() {
    this.gangs.updateMembers()
  }
}
</script>

<style lang="scss">
.gangDetails {
  &__text {
    margin: 12px 0 20px;
  }

  &__members {
    margin-top: 32px;
    grid-template-columns: repeat(4, 1fr);
  }

  &__member,
  &__blurred {
    aspect-ratio: auto;
    width: 100%;
  }

  &__blurredImg {
    width: 100%;
  }

  &__clues {
    margin: 8px 0 -8px;
  }
}
/*----------------------------------------*/

// 960
@include breakpoint(l) {
  .gangDetails {
    &__main {
      width: calc(100% - 340px - #{$colSize * 1%});
    }

    &__details {
      width: 100%;
    }

    &__members {
      grid-template-columns: repeat(3, 1fr);
    }

    &__side {
      width: 340px;
    }
  }
}
/*----------------------------------------*/

// 750
@include breakpoint(m) {
  .gangDetails {
    &__main {
      width: 100%;
      margin: 0;
    }

    &__members {
      grid-template-columns: repeat(4, 1fr);
    }

    &__side {
      width: 100%;
      margin: 0;
      margin-top: 40px;
    }
  }
}
/*----------------------------------------*/

// 500
@include breakpoint(xs) {
  .gangDetails {
    &__members {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
/*----------------------------------------*/

// 400
@include breakpoint(xxs) {
  .gangDetails {
    &__members {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>
