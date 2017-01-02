<template>
  <div id="app">
    <h1> Hello Vuejs 2 </h1>
    <input type="text" v-model="text" @keyup.enter="sendText">
    <hr> <br>
    <div v-for="show in message">
      <li> {{ show.text }}</li>
    </div>
  </div>
</template>

<script>
/* global io */
 var socket = io()
 console.log(socket)
 export default {
   name: 'app',
   data () {
     return {
       text: '',
       message: []
     }
   },
   components: {},
   methods: {
     sendText () {
       // การส่งข้อมูลไปยัง server ผ่านทาง chat message
       socket.emit('chat message', this.text)
       this.text = ''
     }
   },
   mounted () {
     // การรับข้อมูลจาก event chat message
     let vm = this
     socket.on('chat message', function (msg) {
       console.log(msg)
       vm.message.push({text: msg})
     })
   }
 }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
