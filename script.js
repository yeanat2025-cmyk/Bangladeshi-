const socket = io();

let localStream;
let peer;
let recorder;

const video = document.getElementById("video");

/* USER JOIN CALL */

async function joinCall(){

socket.emit("user-call");

localStream = await navigator.mediaDevices.getUserMedia({
video:true,
audio:true
});

video.srcObject = localStream;

}

/* ADMIN RECEIVE CALL */

socket.on("incoming-call", ()=>{

let accept = confirm("User Calling... Accept?");

if(accept){

startPeer();

}

});

/* WEBRTC CONNECTION */

function startPeer(){

peer = new RTCPeerConnection();

localStream.getTracks().forEach(track=>{
peer.addTrack(track, localStream);
});

peer.ontrack = e=>{
video.srcObject = e.streams[0];
};

}

/* VIDEO RECORD */

function startRecord(){

recorder = new MediaRecorder(localStream);

recorder.start();

}

/* STOP RECORD */

function stopRecord(){

recorder.stop();

}

/* SNAPSHOT IMAGE */

function takePhoto(){

let canvas = document.createElement("canvas");

canvas.width = video.videoWidth;
canvas.height = video.videoHeight;

canvas.getContext("2d").drawImage(video,0,0);

let img = canvas.toDataURL("image/png");

let link = document.createElement("a");

link.href = img;
link.download = "snapshot.png";

link.click();

}
