const homeUserID = sessionStorage.getItem('homeUserID');
const otherUserId = sessionStorage.getItem('otherUserId');


const el = {};

async function getMessages() {
  const userIDs = [1, 3];
  const senderID = 3;
  const response = await fetch(`messages/${senderID}`);
  let messages;
  if (response.ok) {
    messages = await response.json();
  }
  showMessages(messages);
}

function setElemets() {
  el.mainView = document.querySelector('#mainView');
  el.messages = document.querySelector('#messageView');
  el.msgInput = document.querySelector('#msgInput');
  el.msgBtn = document.querySelector('#msgBtn');
}

function addEventListeners() {
  el.msgBtn.addEventListener('click', sendMessage);
}

function clearChat() {
  el.messages.textContent = '';
}

function showMessages(messages) {
  for (const message of messages) {
    let messageID;
    if (message.senderID === homeUserID) {
      messageID = 'homeUser';
    } else {
      messageID = 'otherUser';
    }

    const msg = document.createElement('p');
    msg.textContent = message.msg;
    msg.setAttribute('class', 'message ${messageID}');
    el.messages.appendChild(msg);
  }
}

function sendMessage() {
  const gotMessage = el.msgInput.value;
  const addToMessage = { userIDs: [homeUserID, otherUserId], senderID: homeUserID, msg: gotMessage };
  postMessage(addToMessage);
  clearChat();
  getMessages();
}

async function postMessage(message) {
  const response = await fetch('messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message),
  });
}

function loadedMessages() {
  getMessages();
  setElemets();
  addEventListeners();
  // showMessages();
}

window.addEventListener('load', loadedMessages);
