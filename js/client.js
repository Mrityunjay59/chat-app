const socket = io('http://localhost:8000')

// get all DOM variable in respective Js variable
const form =document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer=document.querySelector(".container")

var audio=new Audio('ting.mp3');

//apend event info to the container

const append=(message,position)=>{
const messageElement=document.createElement('div');
messageElement.innerText=message;
messageElement.classList.add('message');
messageElement.classList.add(position);
messageContainer.append(messageElement);
if(position=='left'){
audio.play();
}
}

//if form is submitted ,send surver the message
form.addEventListener('submit',(e)=>{
e.preventDefault();
const message=messageInput.value;
append(`you:${message}`,'right');
socket.emit('send',message);
messageInput.value='';

})

//Ask new user for name,and let the server know
const name =prompt("enter your name to join");
socket.emit('new-user-joined',name);

//if new user joins receive name from server
socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right');
})

//if server sends a message receive the data 
socket.on('receive',data=>{
    append(`${data.name}: ${data.message} `,'left');
})

//if a user leaves ,append the info to the container
socket.on('left',data=>{
    append(`${name}: left the chat `,'right');
})