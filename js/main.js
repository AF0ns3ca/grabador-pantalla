const $button = document.querySelector("button");
// Obtener la fecha actual
var fechaActual = new Date();

// Crear una cadena con la fecha y hora formateadas
var fechaFormateada =
  fechaActual.getFullYear() +
  ("0" + (fechaActual.getMonth() + 1)).slice(-2) +
  ("0" + fechaActual.getDate()).slice(-2) +
  "_" +
  ("0" + fechaActual.getHours()).slice(-2) +
  ("0" + fechaActual.getMinutes()).slice(-2) +
  ("0" + fechaActual.getSeconds()).slice(-2);

$button.addEventListener("click", async () => {
  const media = await navigator.mediaDevices.getDisplayMedia({
    video: { frameRate: { ideal: 30 } },
  });

  const mediaRecorder = new MediaRecorder(media, {
    mimeType: "video/webm; codecs=vp9",
  });

  mediaRecorder.start();

  const [video] = media.getVideoTracks();
  video.addEventListener("ended", () => {
    mediaRecorder.stop();
  });

  //Añadimos un boton para detener y guardar la grabacion
  const $stopButton = document.getElementById("stop");
  $stopButton.addEventListener("click", () => {
    mediaRecorder.stop();
    media.getVideoTracks()[0].stop();
  });

  mediaRecorder.addEventListener("dataavailable", (event) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(event.data);
    link.download = "video-" + fechaActual + ".mp4";
    link.click();
  });
});
