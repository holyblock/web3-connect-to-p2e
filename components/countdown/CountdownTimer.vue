<template>
  <div class="countdown">
    <div v-if="countdown.over">Countdown over!</div>
    <div v-else>
      <span v-if="countdown.days > 0">{{ countdown.days }} days </span>
      <span v-if="countdown.hours > 0">{{ countdown.hours }} hours </span>
      <span v-if="countdown.minutes > 0 && !countdown.days || !countdown.hours">{{ countdown.minutes }} mins </span>
      <span v-if="countdown.seconds > 0 && !countdown.days && !countdown.hours">{{ countdown.seconds }} secs </span>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'CountdownTimer',
  props: {
    endDate: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      countdown: {
        over: false,
        days: '',
        hours: '',
        minutes: '',
        seconds: ''
      }
    }
  },
  mounted() {
    this.updateCountdown()
    setInterval(this.updateCountdown, 1000)
  },
  methods: {
    updateCountdown() {
      const now = moment()
      const target = moment(this.endDate) // change this to your target date/time
      const diff = target.diff(now)

      if (diff < 0) {
        this.countdown.over = true
      } else {
        const duration = moment.duration(diff)

        this.countdown.days = duration.days()
        this.countdown.hours = duration.hours()
        this.countdown.minutes = duration.minutes()
        this.countdown.seconds = duration.seconds()
      }
    }
  }
}
</script>

<style scoped>
.countdown {
  font-size: 1.2rem;
}
</style>
