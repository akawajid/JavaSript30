const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

getVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then( localMediaStream => {
        video.srcObject = localMediaStream;
        video.play();
    });
}

getVideo();

previewInCanvas = () => {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
    }, 16);

}

takePhoto = () => {
    snap.currentTime = 0;
    snap.play();

    const data = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.setAttribute('href', data);
    a.setAttribute('target', '_blank');
    a.setAttribute('download', 'webcam photo')
    a.innerHTML = `<img src="${data}" />`;
    strip.insertBefore(a, strip.firstChild);
}

video.addEventListener('canplay', previewInCanvas)
