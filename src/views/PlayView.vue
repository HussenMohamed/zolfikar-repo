<script setup>
import { ref, onMounted } from "vue";

let hideChat = ref(false);
const toggleChat = () => {
  hideChat.value = !hideChat.value;
  let video = document.querySelector(".play .video-wrapper");
  let chat = document.querySelector(".play .chat-wrapper");
  if (hideChat.value) {
    video.style.width = "100%";
    video.style.marginRight = "unset";
    chat.style.display = "none";
  } else {
    video.style.width = "70%";
    video.style.marginRight = "20px";
    chat.style.width = "30%";
    chat.style.display = "flex";
  }
};

import { reactive } from "vue";
import { io } from "socket.io-client";

const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: [],
});

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

const socket = io(URL);

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});

const comments = ref([]);
// const comment = ref("");
socket.on("message", (data) => {
  // const li = document.createElement("li");
  // li.textContent = data;
  // document.querySelector("ul").appendChild(li);
  currentUserComment.value = data;
  // comments.value.push({
  //   id: Date.now(),
  //   text: `${data.substring(0, 5)}: ${data}`,
  // });
  let dataAgain = data.split(":");
  // let id = dataAgain[0];
  // let comment = dataAgain[0];

  let userData = {
    id: dataAgain[0],
    // comentBody: currentUserComment.value,
    comentBody: dataAgain[1],
  };
  // console.log(dataAgain);
  comments.value.push(userData);

  currentUserComment.value = "";
});

// socket.on("bar", (...args) => {
//   state.barEvents.push(args);
// });

// import { io } from "socket.io-client";
// const commentSocket = io("http://localhost:3000");

onMounted(() => {
  // console.log(socket);
  handleUserComment();
});

const currentUserComment = ref("");
const handleUserComment = () => {
  console.log(currentUserComment.value);
  // currentUserComment.value
  // let userData = {
  //   user
  // }
  socket.emit("message", currentUserComment.value);
};
</script>

<template>
  <div class="play">
    <div class="video-wrapper">
      <video src=""></video>
    </div>

    <div class="chat-wrapper">
      <div class="chat-header">
        <div class="online-users">
          <h4>
            Online Users:
            <span class="online-users-count">6</span>
          </h4>
        </div>
      </div>

      <div class="chat-content">
        <div class="comments">
          <div class="comment current-user-comment" v-for="comment in comments">
            <!-- <div class="user-avatar">
              <img src="" alt="">
            </div> -->

            <h6 class="user-name">User id {{ comment.id }}</h6>
            <br />
            <div class="user-comment">
              {{ comment.comentBody }}
            </div>
          </div>
        </div>
      </div>

      <div class="chat-footer">
        <form
          @submit.prevent="handleUserComment"
          action=""
          class="comment-form"
        >
          <textarea
            name="userComment"
            id=""
            class="user-coment-box"
            v-model="currentUserComment"
          ></textarea>
          <button type="submit" class="submit-comment">Comment</button>
        </form>
      </div>
    </div>

    <div class="hide-chat-btn" @click="toggleChat">
      {{ !hideChat ? "Hide Chat" : "Show Chat" }}
    </div>
  </div>
</template>

<style>
.play {
  position: relative !important;
  padding-top: 90px !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.play .chat-wrapper,
.play .video-wrapper {
  height: 560px;
}
.play .video-wrapper {
  background-color: gray;
  width: 70%;
  margin-right: 20px;
}
.play .chat-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  background-color: var(--white);
  width: 30%;
}
.play .chat-wrapper .chat-header {
  height: 30px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 40px;
}
.play .chat-wrapper .chat-header .online-users h4 {
  color: var(--dark);
}
.play .chat-wrapper .chat-content {
  overflow-y: scroll;
}
.play .chat-wrapper .chat-content .comments .comment {
  border: none;
  border-radius: var(--bor-rad);
  background-color: var(--light);
  padding: 10px;
  margin: 10px 0;
}
.play .chat-wrapper .chat-content .comments .comment.current-user-comment {
  background-color: var(--primary);
}
.play .chat-wrapper .chat-content .comments .comment .user-name {
  font-weight: bold;
  font-size: 12px;
  margin-bottom: 7px;
}
.play .chat-wrapper .chat-content .comments .comment .user-name,
.play .chat-wrapper .chat-content .comments .comment .user-comment {
  color: var(--text);
}
.play
  .chat-wrapper
  .chat-content
  .comments
  .comment.current-user-comment
  .user-name,
.play
  .chat-wrapper
  .chat-content
  .comments
  .comment.current-user-comment
  .user-comment {
  color: var(--white);
}
.play .chat-wrapper .chat-footer {
  height: 70px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding-top: 20px;
}
.play .chat-wrapper .chat-footer form {
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.play .chat-wrapper .chat-footer form .user-coment-box {
  width: 100%;
  height: 70px;
  margin-right: 10px;
  resize: none;
  border: none;
  border-radius: var(--bor-rad);
  background-color: var(--light);
  padding: 10px;
}
.play .chat-wrapper .chat-footer form .user-coment-box:focus {
  outline-color: var(--primary);
}
.play .chat-wrapper .chat-footer form .submit-comment {
  background-color: var(--primary);
  color: var(--white);
  width: 70px;
  height: 40px;
  border: none;
  border-radius: var(--bor-rad);
}
.play .chat-wrapper .chat-footer form .submit-comment:hover {
  cursor: pointer;
  opacity: 0.9;
}

.play .video-wrapper,
.play .chat-wrapper,
.play .hide-chat-btn {
  border-radius: var(--bor-rad);
}
.play .hide-chat-btn {
  position: absolute;
  right: 50px;
  bottom: 50px;
  height: 50px;
  width: 120px;
  line-height: 50px;
  text-align: center;
  font-size: 16px;
  background-color: var(--semi-dark);
  color: var(--white);
  box-shadow: var(--box-shadow);
}
.play .hide-chat-btn:hover {
  cursor: pointer;
}
</style>
