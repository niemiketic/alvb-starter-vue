<template>
  <v-app>
    <v-content>
      <v-container
        :style="`background-color: ${$COLOR.primary};`"
        fluid
        fill-height
        class="-x-relative">
        <transition name="fade">
          <!-- <router-view/> -->
          <v-layout
            class="-x-view -x-view-content"
            align-center
            justify-center
            column
            fill-height>
            <img src="../assets/logo.png">
            <router-view/>
          </v-layout>
        </transition>
      </v-container>
    </v-content>

  </v-app>
</template>

<script src="./Entrance.js">
</script>
