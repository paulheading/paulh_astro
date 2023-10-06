function label(labels, check) {
  var result = false;
  labels.forEach(function ({ name }) {
    if (name == check) result = true;
  });
  return result;
}

let audio = (video) =>
  video.mozHasAudio ||
  Boolean(video.webkitAudioDecodedByteCount) ||
  Boolean(video.audioTracks && video.audioTracks.length);

export default { label, audio };
