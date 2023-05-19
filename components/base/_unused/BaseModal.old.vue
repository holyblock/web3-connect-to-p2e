<template>
	<div class="baseModal grid placeI--center pos--fix z--max inset">
		<div class="baseModal__modal grid placeI--center pos--rel">
			<img class="baseModal__bg" src="/images/modal.png">
			<img class="baseModal__close pos--abs" src="/images/close.png" @click="$emit('close')">
			<div class="baseModal__content">
				<div class="baseModal__tabs flex justifyC--center">
					<p class="baseModal__tab fs--16 fw--600 ff--slab pos--rel" @click="tab = 0">
						Join Whitelist
						<img class="baseModal__tabUnderline pos--abs" :class="{'baseModal__tabUnderline--inactive' : tab !== 0}" src="/images/tab-underline.png">
					</p>
					<p class="baseModal__tab fs--16 fw--600 ff--slab pos--rel" @click="tab = 1">
						How It Works
						<img class="baseModal__tabUnderline pos--abs" :class="{'baseModal__tabUnderline--inactive' : tab !== 1}" src="/images/tab-underline.png">
					</p>
				</div>
				<div v-if="tab === 0" class="baseModal__tabContent">
					<div class="baseModal__wallet">
						<p class="baseModal__walletText fs--16 fw--600 o--7">Connected wallet:</p>
						<p class="baseModal__walletAddress ff--slab fs--20 fw--600 o--5">{{formattedAddress}}</p>
					</div>
				</div>
				<div v-if="tab === 1" class="baseModal__tabContent grid justifyC--center">
					<img class="baseModal__dav justifyS--center" src="/images/dav.png" />
					<h2 class="baseModal__header ff--slab">How does it work?</h2>
					<p class="baseModal__text fs--16 lh--180 o--7">
						Lorem ipsum dolor sit amet. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.
					</p>
					<h2 class="baseModal__header ff--slab">What is required of you?</h2>
					<p class="baseModal__text fs--16 lh--180 o--7">
						Lorem ipsum dolor sit amet. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.
					</p>
					<BaseBtn class="baseModal__button">
						Whitelist Requirements
					</BaseBtn>
					<BaseBtn class="baseModal__button" transparent>
						<IconDiscord />
						Join Discord Community
					</BaseBtn>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import IconDiscord from '~/assets/svgs/socials/discord.svg'

export default {
	name: 'BaseModal',
	components: {
		IconDiscord
	},
	computed: {
		formattedAddress() {
			const first = this.address.substring(0, 28)
			const last = this.address.substring(this.address.length-4, this.address.length)
			return `${first}...${last}`
		}
	},
	data() {
		return {
			tab: 0
		}
	},
	props: {
		address: {
			type: String,
			default: ''
		}
	}
}
</script>

<style lang="scss">
.baseModal {
	background: rgba($black, .8);

	&__bg,
	&__content {
		width: 100%;
		height: 100%;
		grid-area: 1 / -1;
	}

	&__bg {
		width: 100%;
	}

	&__close {
		top: 16px;
		right: 32px;
		cursor: pointer;
	}

	&__content {
		padding: 15% 20%;
	}

	&__tabs {
		margin: 0 0 24px;
	}

	&__tab {
		margin: 0 16px;
		cursor: pointer;
	}

	&__tabUnderline {
		top: 100%;
		left: 0;
		width: 100%;

		&--inactive {
			filter: grayscale(1);
		}
	}

	&__walletText {
		margin: 0 0 12px;
	}

	&__text {
		margin: 8px 0 16px;
		max-width: 380px;
	}

	&__button.baseBtn {
		padding: 0 4px;
	}
}
</style>