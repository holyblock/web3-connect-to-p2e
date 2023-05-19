<template>
  <section class="sceneStorm pos--fix inset z--1">
    <canvas class="sceneStorm__canvas pos--rel z--2" />
    <img class="sceneStorm__texture pos--abs inset z--1" src="/images/map/texture.jpg" />
  </section>
</template>

<script>
import { useGlobalStore } from '~/stores/global'
import * as THREE from 'three'
import gsap from 'gsap'

import * as BufferGeometryUtils from '~/node_modules/three/examples/jsm/utils/BufferGeometryUtils'

function genRand(min, max) {
  const rand = Math.random() * (max - min) + min
  const power = Math.pow(10, 2)
  return Math.floor(rand * power) / power
}

export default {
  name: 'SceneStorm',
  data() {
    return {
      playStormAnim: computed(() => useGlobalStore().playStormAnim)
    }
  },
  mounted() {
    this.createScene()
    this.createStorm()

    // only play animation on anything but homepage
    if (this.playStormAnim) this.handleTick()
  },
  watch: {
    playStormAnim: {
      handler: function (val, oldVal) {
        if (val) this.handleTick()
        else {
          setTimeout(() => {
            cancelAnimationFrame(this.animation)
          }, 1000)
        }
      }
    }
  },
  methods: {
    createScene() {
      // Initial Setup
      this.canvas = this.$el.querySelector('.sceneStorm__canvas')
      this.sizes = {
        width: window.innerWidth,
        height: window.innerHeight
      }

      // Map Scene
      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color(0x535d63)

      // Camera
      this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 50)
      this.camera.position.set(0, 0, 2)

      // Texture Loader
      this.textures = new THREE.TextureLoader()

      // Renderer
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true
      })
      this.renderer.setSize(this.sizes.width, this.sizes.height)
      this.renderer.setPixelRatio(1)

      // Events
      this.handleResizeListener = this.handleResize.bind(this)
      window.addEventListener('resize', this.handleResizeListener)

      // Should Animations Play?
      this.animsActive = true
      // if (window.innerWidth > 960) this.animsActive = true
      // else this.animsActive = false
    },

    createStorm() {
      // one material for all
      const mat = new THREE.MeshLambertMaterial({
        map: this.textures.load('/images/map/smoke.png'),
        transparent: true,
        depthWrite: false,
        opacity: 0.4
      })

      //
      const layers = []
      const count = 10

      // split clouds into three layers so we can animate speed seperatly
      for (let layer = 0; layer < 3; layer++) {
        const geometries = []

        for (let i = 0; i < count; i++) {
          const geo = new THREE.PlaneGeometry(1, 1)
          geo.scale(genRand(1, 2), genRand(1, 3), 1)
          geo.rotateZ(genRand(-2, 2))
          geo.translate(genRand(-1.5, 1.5), genRand(-1, 1), layer / 10)
          geometries.push(geo)
        }

        const group = BufferGeometryUtils.mergeBufferGeometries(geometries)
        const stormLayer = new THREE.Mesh(group, mat)

        layers.push(stormLayer)
      }

      this.scene.add(...layers)

      // if anims are active, clone cloud layers and animate
      if (this.animsActive) {
        const clones = []

        for (let i = 0; i < 3; i++) {
          const clone = layers[i].clone()
          clone.position.x = 3
          clones.push(clone)

          gsap.to([layers[i].position, clones[i].position], {
            duration: 15 + i * 2,
            x: '-=3',
            repeat: -1,
            ease: 'none'
          })
        }

        this.scene.add(...clones)

        // setup lightning animation
        this.count = 0
        this.flash = new THREE.PointLight(0x007f7f, 1, 0.1, 0)
        this.scene.add(this.flash)

        this.lightningLoop = setInterval(this.animLightning, 50)
      }
    },

    // animations
    animLightning() {
      if (this.count < 5) {
        this.flash.power = Math.random() * 100
        this.flash.position.set(genRand(-3, 3), genRand(-3, 3), 1)
      } else {
        this.count = 0
        this.flash.power = 0
        clearInterval(this.lightningLoop)
        setTimeout(() => {
          this.lightningLoop = setInterval(this.animLightning, 50)
        }, genRand(3000, 5000))
      }

      //
      this.count++
    },

    // events
    handleResize() {
      // Update sizes
      this.sizes.width = window.innerWidth
      this.sizes.height = window.innerHeight

      // Update camera
      this.camera.aspect = this.sizes.width / this.sizes.height
      this.camera.updateProjectionMatrix()

      // Update renderer
      this.renderer.setSize(this.sizes.width, this.sizes.height)
      this.renderer.setPixelRatio(1)
    },

    handleTick() {
      // loop
      if (this.camera) this.camera.updateProjectionMatrix()
      if (this.renderer) this.renderer.render(this.scene, this.camera)
      this.animation = requestAnimationFrame(this.handleTick)
    }
  }
}
</script>

<style lang="scss">
.sceneStorm {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #535d63;
  // opacity: 0.98;

  &__texture {
    object-fit: cover;
    object-position: center;
    opacity: 0.04;
    mix-blend-mode: luminosity;
    width: 100%;
    height: 100%;
  }

  &__canvas {
    mix-blend-mode: soft-light;
  }
}
</style>
