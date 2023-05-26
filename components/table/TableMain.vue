<template>
  <section class="tableMain">
    <div class="tableMain__top flex alignI--center justifyC--between">
      <BaseInput class="tableMain__search" icon="search" placeholder="Search by Token ID"  @onInput="filterByTokenId"/>

      <!-- <BaseToggle
        class="tableMain__toggle"
        label1="Pirates"
        label2="Gangs"
        multi
        @onToggle="(val) => (listType = val ? 1 : 0)" /> -->

      <BaseSelect class="tableMain__order" :options="options" @onChange = "sortBySelection"/>
    </div>

    <BasePanel class="tableMain__panel basePanel--spaced">
      <div :class="'tableMain__labels--' + gridCols" class="tableMain__labels grid gap--32">
        <p v-for="el in labels" class="tableMain__label fs--14 fw--500 o--5">
          {{ el }}
        </p>
      </div>

      <IconDivider class="tableMain__divider" />

      <div v-if="items" class="tableMain__items">
        <div v-for="el in items" :class="'tableMain__item--' + gridCols"
          class="tableMain__item grid gap--32 ff--slab fs--18 fw--500 pos--rel">
          <div v-for="(col, key) in el" :class="'tableMain__' + key">
            <div v-if="key === 'rank'" class="tableMain__rankHolder flex alignI--center justifyC--between">
              <p class="tableMain__mobileLabel ff--clash fs--14 fw--500 o--5 tt--capital">Rank</p>

              <div class="flex alignI--center justifyC--between">
                <p class="tableMain__rankNumber ff--slab fs--18 fw--500">
                  <span class="fs--12">#</span>{{ String(el.rank).padStart(2, '0') }}
                </p>

                <IconArrow v-if="el.direction === 'up'" class="tableMain__rankIcon tableMain__rankIcon--up fill--green" />
                <span v-if="el.direction === 'none'" class="tableMain__rankIcon tableMain__rankIcon--none" />
                <IconArrow v-else-if="el.direction === 'down'"
                  class="tableMain__rankIcon tableMain__rankIcon--down fill--redLight" />
              </div>
            </div>
            <div v-else-if="key === 'token_id'">
              <p>Buccaneer #_{{ col }} </p>
            </div>

            <div v-else class="flex justifyC--between">
              <p class="tableMain__mobileLabel ff--clash fs--14 fw--500 o--5 tt--capital">{{ key }}</p>
              <p>{{ col }} </p>
            </div>
          </div>
          <SvgBg class="tableMain__itemBg pos--abs inset z--0 o--7" />
        </div>
      </div>

      <p v-else class="tableMain__loader fs--20 ta--center">Loading data</p>
    </BasePanel>

    <BasePagination class="tableMain__pagination" :totalPages="pagenation.totalPages" :currentPage="pagenation.currentPage" @onPageChange="updatePage" />
  </section>
</template>

<script>
import IconDivider from '~/assets/svgs/interface/divider.svg'
import IconArrow from '~/assets/svgs/interface/arrow-head.svg'
import SvgBg from '~/assets/svgs/highlights/shape2.svg'
// import IconRow from '~/assets/svgs/interface/rowDark.svg'

export default {
  name: 'tableMain',
  components: {
    IconDivider,
    IconArrow,
    SvgBg
  },
  data() {
    return {
      options: [
        { label: 'Position (Ascending)', value: 1},
        { label: 'Position (Descending)', value: 2},
        { label: 'Level (Ascending)', value: 3},
        { label: 'Level (Descending)', value: 4},
        { label: 'Transactions (Ascending)', value: 5},
        { label: 'Transactions (Descending)', value: 6},
      ],
      data: [],
      labels: ['Rank', 'Buccaneer', 'Total Transactions', 'Battles Won', 'Battles Lost', 'Level'],
      listType: 0,
      items: null,
      pagenation: {
        currentPage: 1,
        perPage: 10,
        totalPages: 1,
      },
      filteredArr: [],
      gridCols: 6
    }
  },
  watch: {
    listType: {
      handler: function (val) {
        this.populateItems()
      }
    }
  },
  mounted() {
    this.populateItems()
  },
  methods: {
    sortBySelection(val) {
      switch (parseInt(val)) {
        case 1:
          this.filteredArr.sort((a, b) => a.rank-b.rank)
          break
        case 2:
          this.filteredArr.sort((a, b) => b.rank-a.rank)
          break
        case 3:
          this.filteredArr.sort((a, b) => b.level-a.level)
          break
        case 4:
          this.filteredArr.sort((a, b) => a.level-b.level)
          break
        case 5:
          this.filteredArr.sort((a, b) => b.total_transactions-a.total_transactions)
          break
        case 6:
          this.filteredArr.sort((a, b) => a.total_transactions-b.total_transactions)
          break
      }
      this.resetPageItem()
    },
    filterByTokenId(value) {
      this.filteredArr = this.data.filter(e => e.token_id.toString().includes(value))
      this.resetPageItem()
      this.setPageCount()
    },
    resetPageItem() {
      this.items = this.filteredArr.slice(0, this.pagenation.perPage)
      this.pagenation.currentPage = 1
    },
    updatePage(page) {
      this.pagenation.currentPage = page
      this.items = this.filteredArr.slice((this.pagenation.currentPage - 1) * this.pagenation.perPage , this.pagenation.currentPage * this.pagenation.perPage)
    },
    populateItems() {
      // timeout for demo purposes
      this.items = null

      setTimeout(() => {
        if (this.listType === 0) this.populatePirates()
        if (this.listType === 1) this.populateGangs()
      }, 1000)
    },
    async populatePirates() {
      this.gridCols = 6

      const res = await fetch('https://analysis-api-q7axzfehda-uc.a.run.app/leaderboard')
      const jsonData = await res.json();
      this.data = jsonData.leaderboard
      this.filteredArr = this.data
      console.log(this.filteredArr)
      this.items = this.filteredArr.slice(0, this.pagenation.perPage)
      this.setPageCount()
    },
    setPageCount() {
      this.pagenation.totalPages = Math.ceil(this.filteredArr.length / this.pagenation.perPage)
    },

    populateGangs() {
      // this.gridCols = 5

      // const data = [
      //   {
      //     rank: 1,
      //     direction: 'up',
      //     name: 'Ship Riders', 
      //     won: 65,
      //     lost: 1,
      //     level: 28
      //   },
      //   {
      //     rank: 2,
      //     direction: 'down',
      //     name: 'Black Hawks',
      //     won: 54,
      //     lost: 4,
      //     level: 27
      //   },
      //   {
      //     rank: 3,
      //     direction: 'up',
      //     name: 'Looters',
      //     won: 52,
      //     lost: 6,
      //     level: 27
      //   },
      //   {
      //     rank: 4,
      //     direction: 'down',
      //     name: 'Barrell Boys',
      //     won: 45,
      //     lost: 7,
      //     level: 26
      //   },
      //   {
      //     rank: 5,
      //     direction: 'none',
      //     name: 'Parrot Cove',
      //     won: 32,
      //     lost: 12,
      //     level: 25
      //   },
      //   {
      //     rank: 6,
      //     direction: 'up',
      //     name: 'Blood of My Blood',
      //     won: 28,
      //     lost: 8,
      //     level: 23
      //   },
      //   {
      //     rank: 7,
      //     direction: 'none',
      //     name: 'Legends of the Sea',
      //     won: 21,
      //     lost: 22,
      //     level: 23
      //   },
      //   {
      //     rank: 8,
      //     direction: 'up',
      //     name: 'Warriors',
      //     won: 17,
      //     lost: 20,
      //     level: 23
      //   },
      //   {
      //     rank: 9,
      //     direction: 'none',
      //     name: 'The Titans',
      //     won: 4,
      //     lost: 45,
      //     level: 22
      //   },
      //   {
      //     rank: 10,
      //     direction: 'down',
      //     name: 'The Shiver Boys',
      //     won: 2,
      //     lost: 15,
      //     level: 22
      //   }
      // ]

      // this.items = data
    }
  }
}
</script>

<style lang="scss">
.tableMain {
  margin-top: -24px;

  &__top {
    margin-bottom: 32px;
  }

  &__search {
    width: 300px;
  }

  &__order {
    width: 300px;
  }

  &__divider {
    margin: 8px 0 24px;
    display: block;
  }

  //
  &__labels,
  &__item {
    grid-template-columns: 48px 1fr repeat(3, 120px) 36px;

    &--5 {
      grid-template-columns: 48px 1fr repeat(2, 120px) 36px;
    }

    &--5 .tableMain__label:nth-child(3) {
      display: none;
    }
  }

  &__item {
    padding: 20px 0;

    &:nth-child(4n + 1) .tableMain__itemBg {
      transform: rotate(180deg);
    }

    &:nth-child(even) .tableMain__itemBg {
      display: none;
    }
  }

  &__mobileLabel {
    display: none;
  }

  &__rankHolder {
    width: 100%;

    div {
      width: 100%;
    }
  }

  &__rankIcon {
    display: inline-block;
    width: 12px;

    &--up {
      transform: rotate(180deg);
    }

    &--none {
      height: 2px;
      background: rgba($grey, 0.6);
    }
  }

  &__direction {
    display: none;
  }

  &__itemBg {
    left: -40px;
    right: -40px;
    width: calc(100% + 80px);
    height: 100%;
    fill: #1e212e;
  }

  //
  &__pagination {
    margin: 40px auto 0;
  }
}

/*----------------------------------------*/

// 1080
@include breakpoint(xl) {
  .tableMain {
    &__top {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 32px;
    }

    &__search {
      order: 2;
      justify-self: center;
    }

    &__toggle {
      order: 1;
      justify-self: center;
      grid-column: 1 / 3;
    }

    &__order {
      order: 3;
      justify-self: center;
    }

    //
    &__panel {
      width: calc(100% + 64px);
      margin: 0 -32px;
    }

    &__labels,
    &__item {
      grid-template-columns: 40px 1fr repeat(3, 104px) 32px;
      gap: 16px;
    }

    &__labels--5,
    &__item--5 {
      grid-template-columns: 40px 1fr repeat(2, 104px) 32px;
    }

    &__label {
      font-size: 12px;
    }

    &__rankNumber,
    &__item {
      font-size: 14px;
    }
  }
}

/*----------------------------------------*/

// 750
@include breakpoint(m) {
  .tableMain {
    margin: 0;

    &__top {
      grid-template-columns: 1fr;
      gap: 12px;
    }

    &__toggle {
      grid-column: auto;
      margin-bottom: 20px;
    }

    //
    &__panel {
      padding: 32px 24px;
    }

    &__labels,
    &__item {
      grid-template-columns: 40px 1fr 104px 72px 72px 32px;
      gap: 16px;
    }

    &__labels--5,
    &__item--5 {
      grid-template-columns: 40px 1fr 72px 72px 32px;
    }

    &__itemBg {
      left: -20px;
      right: -20px;
      width: calc(100% + 40px);
    }
  }
}

/*----------------------------------------*/

// 600
@include breakpoint(s) {
  .tableMain {
    &__panel {
      margin: 0 -20px;
      width: calc(100% + 40px);
    }

    &__labels,
    &__divider {
      display: none;
    }

    &__item {
      grid-template-columns: 1fr;
      gap: 8px;
    }

    &__mobileLabel {
      display: block;
    }

    &__rank {
      display: flex;
    }

    &__rankHolder div {
      width: auto;
    }

    &__rankIcon {
      margin-left: 4px;
    }
  }
}

/*----------------------------------------*/

// 400
@include breakpoint(xs) {
  .tableMain {

    &__search,
    &__order {
      width: 100%;
    }
  }
}
</style>
