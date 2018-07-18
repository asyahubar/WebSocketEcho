<template>
  <div id="app">
    <div class="echo">
      <p class="one-message">Echo start</p>
      <!--eslint-disable-next-line-->
      <p class="one-message list" v-for="mes in chat">{{ mes }}</p>

      <form action="#" method="post" @submit.prevent="sendMessage">
        <input type="text" v-model="newMessage" autofocus>
        <button>SEND</button>
      </form>

      <div class="buttons">
        <button @click="connect">Connect</button>
        <button @click="disconnect">Disconnect</button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
    // HelloWorld
  },
    data() {
      return {
          newMessage: "",
          chat: [],
          socket: ""
      }
    },
    mounted: function() {
        this.$nextTick(function () {
            this.connect();
        })
    },
    methods: {
      sendMessage() {
              this.socket.send(this.newMessage);
              this.chat.push("send: " + this.newMessage);
              this.newMessage = "";
              return false;
      },
      connect() {
          this.socket = new WebSocket('wss://echo.websocket.org/');
          // this.socket.onerror = function(error) {
          //     console.log('WebSocket Error: ' + error);
          // };
          this.socket.addEventListener('open', () => {
              this.chat.push("Connected to server");
          });
          this.socket.addEventListener('message', (event) => {
              this.chat.push("returned: " + event.data);
          });
          this.socket.addEventListener('close', () => {
              this.chat.push("Disconnected from the server");
          });
      },
      disconnect() {
        this.socket.close();
      },
    }
    
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  .echo {
    margin: auto;
    padding: 70px 35px;
    width: 500px;
    background-color: #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.8);

    .list {
      border-top: 1px #333 solid;
      padding-top: 10px;
    }

    form {

      input {
        padding: 10px 25px;
        width: 360px;
        margin-right: 2px;
        border: none;
        border-radius: 4px;
        outline: none;
        background-color: #eee;

        &:focus {
          background-color: white;
        }
      }

      button {
        background-color: #86b32d;
      }
    }

    button {
      margin-right: 1px;
      padding: 10px 25px;
      border: none;
      color: white;
      border-bottom: 1px solid #777;
      border-radius: 4px;
    }

    .buttons {
      margin-top: 10px;

      button:nth-of-type(1) {
        background-color: #6F9FD8;
      }

      button:nth-of-type(2) {
        background-color: #bababa;
      }
    }
  }
}
</style>
