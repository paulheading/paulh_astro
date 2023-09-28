function label(labels, check) {
  var result = false;
  labels.forEach(function ({ name }) {
    if (name == check) result = true;
  });
  return result;
}

export default { label };
