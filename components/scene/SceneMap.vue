<template>
  <section class="sceneMap pos--fix inset z--2">
    <!--  -->

    <div :class="{ 'sceneMap__hoveredPin--show': hoveredPin }" class="sceneMap__hoveredPin pos--abs z--4 o--0">
      <h6 class="sceneMap__hoveredPinLabel ff--slab fs--24">{{ hoveredPin }}</h6>
    </div>

    <img class="sceneMap__compass pos--abs z--3" src="/images/map/compass.png" />
    <canvas class="sceneMap__canvas pos--rel z--2" />

    <div class="sceneMap__container container">
      <img class="sceneMap__map" src="/images/map/treasure-map.png" />
      <div class="sceneMap__links grid gap--8 justifyC--start">
        <div v-for="(el, i) in links" :key="el + i">
          <NuxtLink
            v-if="el.type !== 'watering-hole'"
            :to="el.linkOverride || `/${el.type}/`"
            :target="el.linkOverride ? '_blank' : null"
            class="sceneMap__link flex flex--nowrap alignI--center"
            :class="{ 'sceneMap__link--disabled': el.disabled }">
            <BaseMapIcon :type="el.type" smaller invert class="sceneMap__icon" />
            <p class="sceneMap__label ff--slab fs--20 fw--600">{{ el.label }}</p>
          </NuxtLink>

          <button v-else class="sceneMap__link flex flex--nowrap alignI--center buttonReset" @click="joinDiscordModal">
            <BaseMapIcon :type="el.type" smaller invert class="sceneMap__icon" />
            <p class="sceneMap__label ff--slab fs--20 fw--600">{{ el.label }}</p>
          </button>
        </div>
      </div>
    </div>

    <div class="sceneMap__stats pos--fix z--2">
      <BaseStat :endDate="'March 21 2023 17:00 GMT+0:00'" header="Season Ending" icon="timer" />
      <BaseStat
        :label1="formatValue(100.8365826, 2) + ' ETH'"
        :label2="formatValue(1273813, 2) + ' USD'"
        icon="treasure"
        header="Total Treasure"
        class="sceneMap__stat" />
      <BaseStat
        :label1="formatValue(50.625384, 2) + ' ETH'"
        :label2="formatValue(12653645, 2) + ' USD'"
        icon="donations"
        header="Total Donations"
        class="sceneMap__stat" />
    </div>

    <!--  -->
  </section>
</template>

<script>
import * as THREE from 'three'
import gsap from 'gsap'
import debounce from 'lodash.debounce'

import * as BufferGeometryUtils from '~/node_modules/three/examples/jsm/utils/BufferGeometryUtils'

import IconCross from '~/assets/svgs/interface/cross.svg'

import { useGlobalStore } from '~/stores/global'

export default {
  name: 'SceneMap',
  data() {
    return {
      animsActive: null,
      hoveredPin: null,
      links: [
        { type: 'mint', label: 'Mint', disabled: null },
        { type: 'battle', label: 'Battle', disabled: null },
        { type: 'training', label: 'Training', disabled: null },
        { type: 'marketplace', label: 'Marketplace', linkOverride: 'https://opensea.io/', disabled: null },
        { type: 'leaderboard', label: 'Leaderboard', disabled: null },
        { type: 'watering-hole', label: 'Watering Hole', disabled: null },
        { type: 'donations', label: 'Donations', disabled: null },
        { type: 'gangs', label: 'Gangs', disabled: null },
        { type: 'oracle', label: 'Oracle', disabled: null }
      ]
    }
  },
  mounted() {
    // Should Animations Play?
    // if (window.innerWidth > 1080) this.animsActive = true
    // else this.animsActive = false
    // if (!this.animsActive) return

    this.links.forEach((link) => {
      link.disabled = useGlobalStore().disabledPages.includes(link.label.toLowerCase() || link.label)

      if (link.disabled) {
        link.label = link.label + ' (Coming Soon)'
      }
    })
    //
    this.createEverything()
  },
  unmounted() {
    this.destroyEverything()
    window.removeEventListener('resize', this.handleResizeListener)
  },
  methods: {
    createEverything() {
      this.createScene()
      this.createMap()
      this.createPins()
      this.createClouds()
      this.handleTick()
    },

    createScene() {
      // Initial Setup
      this.canvas = this.$el.querySelector('.sceneMap__canvas')
      this.sizes = {
        width: window.innerWidth,
        height: window.innerHeight
      }

      // Map Scene
      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color(0xb9c5c8)

      // Cloud Scene
      this.cloudScene = new THREE.Scene()
      this.cloudScene.background = null

      // Camera
      this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 50)
      this.camera.position.set(0, 0, 1.03)

      // Texture Loader
      this.textures = new THREE.TextureLoader()

      // Raycaster
      this.raycaster = new THREE.Raycaster()

      // Mouse
      this.mouse = new THREE.Vector2()

      // Renderer
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: true,
        autoClear: false
      })
      this.renderer.setSize(this.sizes.width, this.sizes.height)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      // Events
      this.handleResizeListener = debounce(this.handleResize.bind(this), 500)
      this.handleMouseMoveListener = this.handleMouseMove.bind(this)
      this.handleClickListener = this.handleClick.bind(this)

      window.addEventListener('resize', this.handleResizeListener)
      window.addEventListener('mousemove', this.handleMouseMoveListener)
      this.$el.addEventListener('click', this.handleClickListener)
      this.$el.addEventListener('touch', this.handleClickListener)
    },

    createMap() {
      // create map
      this.mapGeo = new THREE.PlaneGeometry(3, 3)
      this.mapMat = new THREE.MeshBasicMaterial({ map: this.textures.load('/images/map/map.jpg') })
      this.map = new THREE.Mesh(this.mapGeo, this.mapMat)
      this.map.name = 'map'

      this.scene.add(this.map)
    },

    createPins() {
      // default pin settings
      this.scenePins = []
      this.disabledPins = []
      this.crossIcons = []
      const total = 9
      this.pinGeo = new THREE.PlaneGeometry(0.14, 0.14)

      // create pins
      for (let i = 0; i < total; i++) {
        this.pinMat = new THREE.MeshBasicMaterial({ transparent: true })
        const pin = new THREE.Mesh(this.pinGeo, this.pinMat)
        pin.position.z = 0.01

        // position pins
        switch (i) {
          case 0:
            pin.name = 'Mint'
            pin.slug = 'mint'
            pin.position.x = -0.55
            pin.position.y = 0.4
            pin.material.map = this.textures.load('/images/pins/mint.png')
            break
          case 1:
            pin.name = 'Leaderboard'
            pin.slug = 'leaderboard'
            pin.position.x = 0.49
            pin.position.y = 0.4
            pin.material.map = this.textures.load('/images/pins/leaderboard.png')
            break
          case 2:
            pin.name = 'Battle'
            pin.slug = 'battle'
            pin.position.x = 1.05
            pin.position.y = 0.29
            pin.material.map = this.textures.load('/images/pins/battle.png')
            break
          case 3:
            pin.name = 'Marketplace'
            pin.slug = 'marketplace'
            pin.position.x = -0.2
            pin.position.y = 0.17
            pin.material.map = this.textures.load('/images/pins/marketplace.png')
            break
          case 4:
            pin.name = 'Watering Hole'
            pin.slug = 'watering-hole'
            pin.position.x = -0.52
            pin.position.y = -0.06
            pin.material.map = this.textures.load('/images/pins/watering-hole.png')
            break
          case 5:
            pin.name = 'Training'
            pin.slug = 'training'
            pin.position.x = 0.18
            pin.position.y = -0.01
            pin.material.map = this.textures.load('/images/pins/training.png')
            break
          case 6:
            pin.name = 'Donations'
            pin.slug = 'donations'
            pin.position.x = -0.93
            pin.position.y = -0.22
            pin.material.map = this.textures.load('/images/pins/donations.png')
            break
          case 7:
            pin.name = 'Oracle'
            pin.slug = 'oracle'
            pin.position.x = -0.28
            pin.position.y = -0.48
            pin.material.map = this.textures.load('/images/pins/oracle.png')
            break
          case 8:
            pin.name = 'Gangs'
            pin.slug = 'gangs'
            pin.position.x = 0.67
            pin.position.y = -0.54
            pin.material.map = this.textures.load('/images/pins/gangs.png')
            break
        }

        // Disabled pins pushed to separate array
        const disabled = useGlobalStore().disabledPages.includes(pin.slug || pin.name)
        if (disabled) {
          pin.disabled = true
          this.disabledPins.push(pin)
        } else {
          pin.disabled = false
          this.scenePins.push(pin)
        }

        this.disabledPins.forEach((pin) => {
          pin.material.opacity = 0.5
        })
      }

      // Cross SVGs for disabled pins
      for (let i = 0; i < this.disabledPins.length; i++) {
        this.pinMat = new THREE.MeshBasicMaterial({ transparent: true })
        const cross = new THREE.Mesh(this.pinGeo, this.pinMat)
        cross.position.z = 0.01

        cross.position.x = this.disabledPins[i].position.x
        cross.position.y = this.disabledPins[i].position.y
        cross.material.map = this.textures.load('/images/map/IconCross.png')

        this.crossIcons.push(cross)
      }

      this.scene.add(...this.scenePins, ...this.disabledPins, ...this.crossIcons)
    },

    createClouds() {
      this.clouds = []

      let props = {
        width: 1,
        height: 1,
        posX: 0,
        posY: 0,
        posZ: 0.02,
        rotation: 0
      }

      // one material for all
      this.cloudMat = new THREE.MeshLambertMaterial({
        map: this.textures.load('/images/map/smoke.png'),
        transparent: true,
        opacity: 0.6
      })

      // manually position clouds
      for (let i = 0; i < 4; i++) {
        switch (i) {
          case 0:
            props.height = 1.8
            props.posX = 1.2
            props.posY = 0.7
            props.rotation = 1.2
            break
          case 1:
            props.width = 1.2
            props.height = 1.2
            props.posX = -0.9
            props.posY = 0.5
            props.rotation = -0.7
            break
          case 2:
            props.height = 1.5
            props.posX = -1
            props.posY = -0.5
            props.rotation = 0.5
            break
          case 3:
            props.width = 4
            props.height = 1
            props.posX = 0.6
            props.posY = -0.8
            props.rotation = 0.1
            break
        }

        const cloudGeo = new THREE.PlaneGeometry(props.width, props.height)
        cloudGeo.rotateZ(props.rotation)
        cloudGeo.translate(props.posX, props.posY, props.posZ)
        this.clouds.push(cloudGeo)
      }

      // merge all clouds into one group (better for performance)
      this.cloudGeos = BufferGeometryUtils.mergeBufferGeometries(this.clouds)
      this.cloudGeosGroup = new THREE.Mesh(this.cloudGeos, this.cloudMat)

      // clone and move to the right so we can animate in a loop
      this.clonedCloudGeosGroup = this.cloudGeosGroup.clone()
      this.clonedCloudGeosGroup.position.x = 3.2

      this.cloudScene.add(this.cloudGeosGroup, this.clonedCloudGeosGroup)

      // cloud animation
      this.cloudAnim = gsap.to([this.cloudGeosGroup.position, this.clonedCloudGeosGroup.position], {
        duration: 20,
        x: '-=3.2',
        repeat: -1,
        ease: 'none'
      })
    },

    // events
    handleResize() {
      // Scene is already running, so update as normal
      if (this.scene && window.innerWidth > 1080) {
        this.updateScene()
      }

      // Scene is running and width is now tablet/mobile size, destroy scene
      else if (this.scene && window.innerWidth <= 1080) {
        this.destroyEverything()
      }

      // Scene isn't running and width is now desktop size, create scene
      else if (this.scene === null && window.innerWidth > 1080) {
        this.createEverything()
      }
    },

    handleMouseMove(e) {
      // this.hoveredPin = null

      // if intersects is null then do nothing here
      if (!this.intersects) return

      // store mouse position relative to the canvas
      this.mouse.x = (e.clientX / this.sizes.width) * 2 - 1
      this.mouse.y = -(e.clientY / this.sizes.height) * 2 + 1

      // if pin is hovered
      const pin = this.intersects[0]

      if (pin) {
        // change cursor to default pointer
        document.body.style.cursor = pin.object.disabled ? '' : 'pointer'

        // set hover title - depending on disabled status
        this.hoveredPin = pin.object.disabled ? pin.object.name + ' (Coming Soon)' : pin.object.name

        // lower opacity of pins that arent hovered
        this.scenePins.forEach((el) => {
          if (el.name === pin.object.name) return
          gsap.to(el.material, { duration: 0.3, opacity: 0.3 })
        })

        // scale hovered pin
        gsap.to(pin.object.scale, { duration: 0.5, x: 1.1, y: 1.1, z: 1.1 })
      } else {
        // reset cursor
        document.body.style.cursor = ''

        // reset hover title
        this.hoveredPin = null

        // reset all pins
        this.scenePins.forEach((el) => {
          gsap.to(el.scale, { duration: 0.5, x: 1, y: 1, z: 1 })
          gsap.to(el.material, { duration: 0.3, opacity: 1 })
        })
        this.disabledPins.forEach((el) => {
          gsap.to(el.scale, { duration: 0.5, x: 1, y: 1, z: 1 })
        })
      }
    },

    handleClick() {
      // pin being clicked
      const pin = this.intersects[0]

      // if clicking anything but a pin, do nothing
      if (!pin || pin.object.disabled) return

      // if marketplace, only open in a new tab
      const pinName = pin.object.name
      const pinSlug = pin.object.slug

      if (pinName === 'Marketplace') {
        window.open('https://opensea.io/', '_blank').focus()
        return
      } else if (pinName === 'Watering Hole') {
        this.joinDiscordModal()
        return
      }

      // else, run animations
      // camera zoom out then redirect to correct page
      gsap.to(this.camera.position, {
        duration: 1,
        z: 2,
        ease: 'power1.inOut',
        onComplete: () => {
          navigateTo(`/${pinSlug}/`)
        }
      })

      // zoom out clouds
      gsap.to([this.cloudGeosGroup.position, this.clonedCloudGeosGroup.position], {
        duration: 1,
        z: 1,
        ease: 'power1.inOut'
      })

      // fade out entire component
      gsap.to(this.$el, {
        duration: 1,
        autoAlpha: 0,
        ease: 'power1.inOut'
      })

      // update store so SceneStorm can activate
      useGlobalStore().updatePlayStormAnim(true)
    },

    handleTick() {
      // move camera with mouse
      if (this.camera) {
        gsap.to(this.camera.position, {
          duration: 0.4,
          x: this.mouse.x / 2,
          y: this.mouse.y / 2,
          ease: 'power1.inOut'
        })

        this.camera.updateProjectionMatrix()
      }

      // combine the scene pins and disabled pins into a single array
      const pins = [...this.scenePins, ...this.disabledPins]

      // Cast a ray from the mouse and handle events
      this.raycaster.setFromCamera(this.mouse, this.camera)
      if (this.scenePins !== null) this.intersects = this.raycaster.intersectObjects(pins)

      // loop
      if (this.renderer) {
        this.renderer.autoClear = true
        this.renderer.render(this.scene, this.camera)
        this.renderer.autoClear = false
        this.renderer.render(this.cloudScene, this.camera)
      }

      this.animation = requestAnimationFrame(this.handleTick)
    },

    //
    updateScene() {
      // Update sizes
      this.sizes.width = window.innerWidth
      this.sizes.height = window.innerHeight

      // Update camera
      this.camera.aspect = this.sizes.width / this.sizes.height
      this.camera.updateProjectionMatrix()

      // Update renderer
      this.renderer.setSize(this.sizes.width, this.sizes.height)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    },

    destroyEverything() {
      // Stop animation
      cancelAnimationFrame(this.animation)

      // Dump THREE.js
      this.mapGeo.dispose()
      this.mapMat.dispose()
      this.scene.remove(this.map)

      this.cloudMat.dispose()

      this.scene = null
      this.cloudScene = null
      this.camera = null
      this.textures = null
      this.raycaster = null
      this.mouse = null
      this.renderer = null

      // Reset cursor
      document.body.style.cursor = ''

      // Remove events
      window.removeEventListener('mousemove', this.handleMouseMoveListener)
      this.$el.removeEventListener('click', this.handleClickListener)
      this.$el.removeEventListener('touch', this.handleClickListener)
    },

    joinDiscordModal() {
      const data = {
        type: 'default',
        header: 'Join the Discord',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
        upgradeLevelTo: null,
        totalFee: null,
        breakdown: null,
        btns: [
          {
            color: 'white',
            icon: 'discord',
            label: 'Join Discord Community',
            function: 'joinDiscord'
          }
          // {
          //   color: 'green',
          //   icon: null,
          //   label: 'Go to Gangs',
          //   function: 'toGangs'
          // }
        ]
      }
      useGlobalStore().updateModal(data)
    }
  }
}
</script>

<style lang="scss">
.sceneMap {
  width: 100%;
  background: #b9c5c8;

  &__hoveredPin {
    bottom: 0;
    left: 0;
    right: 0;
    padding: 56px 0;
    background: linear-gradient(to bottom, rgba($black, 0), rgba($black, 1));
    text-align: center;
    transition: opacity 0.5s ease;
    pointer-events: none;
  }

  &__hoveredPin--show {
    opacity: 1;
  }

  &__compass {
    left: 24px;
    bottom: 24px;
    width: 160px;
    height: 160px;
    pointer-events: none;
  }

  &__container {
    display: none;
  }

  &__stats {
    right: -8px;
    bottom: 32px;
  }
}
/*----------------------------------------*/

// 1080
@include breakpoint(xl) {
  .sceneMap {
    position: relative;
    background: transparent;

    &__hoveredPin,
    &__compass,
    &__canvas {
      display: none;
    }

    &__container {
      display: block;
      max-width: 700px;
    }

    &__map {
      width: 100%;
      margin: 0 auto;
      display: block;
      transform: rotate(-2deg);
      margin-bottom: 32px;
    }

    &__links {
      grid-template-columns: 1fr 1fr;
      padding: 0 64px;
    }

    &__link--disabled {
      opacity: 0.5;
      pointer-events: none;
      position: relative;

      &::before {
        position: absolute;
        content: '';
        left: 0;
        top: 0;
        background: url('/images/map/IconCross.png');
        background-size: contain;
        background-repeat: no-repeat;
        height: 50px;
        width: 50px;
      }
    }

    &__link:hover .sceneMap__icon {
      transform: scale(1.1);
    }

    &__link:hover .sceneMap__label {
      transform: translateX(4px);
    }

    &__icon {
      transition: transform 0.8s $easeCubic;
    }

    &__label {
      margin: -4px 0 0 8px;
      transition: transform 0.8s $easeCubic;
    }

    &__stats {
      position: relative;
      display: grid;
      grid-template-columns: 1fr 1fr;
      right: auto;
      bottom: auto;
      max-width: 540px;
      margin: 24px auto 0;
      gap: 8px;
    }
  }
}
/*----------------------------------------*/

// 600
@include breakpoint(s) {
  .sceneMap {
    &__container {
      padding: 0;
    }

    &__map {
      width: calc(100% + 80px);
      margin-left: -40px;
    }

    &__links {
      padding: 0 32px;
    }

    &__stats {
      width: calc(100% - 40px);
    }
  }
}
/*----------------------------------------*/

// 500
@include breakpoint(xs) {
  .sceneMap {
    &__label {
      font-size: 16px;
    }
  }
}
/*----------------------------------------*/

// 400
@include breakpoint(xxs) {
  .sceneMap {
    &__links {
      padding: 0 24px;
    }

    &__label {
      font-size: 15px;
    }

    &__stats {
      width: calc(100% - 16px);
    }
  }
}
/*----------------------------------------*/

// 350
@include breakpoint(t) {
  .sceneMap {
    &__links {
      padding: 0 12px;
    }
  }
}
</style>
