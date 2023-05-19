<template>
	<div class="baseCard grid">
		<img class="baseCard__bg" src="/images/card.png">
		<div class="baseCard__content grid gap--8 alignI--center">
			<IconTreasure v-if="type === 'Treasure'" class="baseCard__icon" />
			<IconDonations v-if="type === 'Donations'" class="baseCard__icon" />
			<h3 class="baseCard__header fc--black ff--slab fs--14 fw--300 lh--140 o--6">Total {{type}}</h3>
			<p class="baseCard__eth fc--black fs--20 fw--600 lh--100 alignS--end">{{formatNumber(eth)}} ETH</p>
			<p class="baseCard__usd fc--black fs--11 o--5 alignS--end">({{formatNumber(usd)}} USD)</p>
		</div>
	</div>
</template>

<script>
import IconTreasure from '~/assets/svgs/interface/treasure.svg'
import IconDonations from '~/assets/svgs/interface/donations.svg'

export default {
	name: 'BaseCard',
	components: {
		IconTreasure,
		IconDonations
	},
	props: {
		type: {
			type: String,
			default: ''
		},
		eth: {
			type: String,
			default: ''
		},
		usd: {
			type: String,
			default: ''
		}
	},
	methods: {
		formatNumber(n) {
			return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		}
	}
}
</script>

<style lang="scss">
.baseCard {
	&__bg,
	&__content {
		grid-area: 1 / -1;
	}

	&__bg {
		width: 100%;
	}

	&__content {
		grid-template:
			'icon header header'
			'eth eth usd' / auto auto 1fr;
		padding: 24px;
	}

	&__icon {
		grid-area: icon;
	}

	&__header {
		grid-area: header;
	}

	&__eth {
		grid-area: eth;
	}

	&__usd {
		grid-area: usd;
	}
}
</style>