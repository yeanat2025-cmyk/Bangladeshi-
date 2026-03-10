const socket = io();

let localStream;
let peer;

const video = document.getElementById("video");

/* USER JOIN CALL */

async function joinCall(){

localStream = await navigator.mediaDevices.getUserMedia({
video:true,
audio:true
});

video.srcObject = localStream;

socket.emit("user-call");

}

/* ADMIN RECEIVE CALL */

socket.on("incoming-call", ()=>{

let accept = confirm("User is calling. Accept?");

if(accept){

startCall();

}

});

/* START CALL */

function startCall(){

peer = new RTCPeerConnection();

localStream.getTracks().forEach(track=>{
peer.addTrack(track, localStream);
});

peer.ontrack = e=>{
video.srcObject = e.streams[0];
};

}

/* SNAPSHOT */

function takePhoto(){

let canvas = document.createElement("canvas");

canvas.width = video.videoWidth;
canvas.height = video.videoHeight;

canvas.getContext("2d").drawImage(video,0,0);

let img = canvas.toDataURL("image/png");

let link = document.createElement("a");

link.href = img;
link.download = "photo.png";

link.click();

}
