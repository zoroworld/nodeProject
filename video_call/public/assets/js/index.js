const socket = io('/');
const peer = new Peer();
let myVideoStream; 

peer.on('open', (id) => {
  socket.emit("newUser", id);
});


function incomingCall(){
    peer.on('call', (call) => {
    call.answer(myVideoStream);
    const vid = document.createElement('video');

    call.on('stream', (userStream) => {
      addVideo(vid, userStream);
    });

    call.on('error', (err) => {
      alert(err);
    });
  });
}

function userJoined(){
  socket.on('userJoined', (id) => {
    console.log("New user joined:", id);

    const call = peer.call(id, myVideoStream);
    const vid = createElement('video');

    call.on('stream', (userStream) => {
      addVideo(vid, userStream);
    });

    call.on('error', (err) => {
      alert(err);
    });
  });
}

// Function to add video streams to the DOM
function addVideo(videoEl, stream, isSelf = false) {
  videoEl.srcObject = stream;
  videoEl.addEventListener('loadedmetadata', () => {
    videoEl.play();
  });

  if (isSelf) {
    let main = document.getElementById("main-video");
    videoEl.style.width = "80%";
    videoEl.style.maxHeight = "90vh";
    main.appendChild(videoEl);
  } else {
    let sidebar = document.getElementById("videoshow");
    videoEl.style.width = "100%";
    videoEl.style.marginBottom = "10px";
    sidebar.appendChild(videoEl);
  }
}



function navigatorMediaDevice() {
  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
  }).then((stream) => {
    myVideoStream = stream;

    const myVideo = document.createElement('video');
    myVideo.muted = true; // Mute self to avoid feedback
    addVideo(myVideo, myVideoStream, true); // 'true' for main video

    incomingCall();
    userJoined();
  }).catch((err) => {
    alert(err.message);
  });
}




//start the stream
navigatorMediaDevice();