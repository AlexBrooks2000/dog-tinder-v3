const el = {};

const sender = 1;
const receiver = window.location.hash.substring(1);

function setElements() {
  el.msgs = document.querySelector('#msgs');
  el.inputMsg = document.querySelector('#inputMsg');
  el.sendMsg = document.querySelector('#sendMsg');
}

function clearChat() {
  el.msgs.textContent = '';
}

async function loadMessages() {
  const response = await fetch(`/msgs/${sender}/${receiver}`);
  const messages = await response.json();
  displayMsgs(messages);
}

function displayMsgs(messages) {
  clearChat();
  for (const message of messages) {
    const list = document.createElement('li');
    if (message.sender === sender) {
      list.textContent = `you: ${message.msg}`;
    } else {
      list.textContent = `them: ${message.msg}`;
    }
    el.msgs.appendChild(list);
  }
}

async function sendMessage() {
  const payload = {
    sender: sender,
    receiver: receiver,
    msg: el.inputMsg.value,
  };

  const response = await fetch('/msgs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  loadMessages();
}

function addEventListeners() {
  el.sendMsg.addEventListener('click', sendMessage);
}
function loadedMsgs() {
  setElements();
  loadMessages();
  addEventListeners();
}

window.addEventListener('load', loadedMsgs);

setInterval(loadMessages, 1000);
