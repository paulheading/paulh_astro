const limit = 100;

const needed = (content) => content.length > limit;

function content(clicked, content) {
  if (!needed(content)) return content;

  if (clicked) return (content += " ");

  var words = content.split(" ");
  var limit;
  var result = "";
  var finished = false;

  words.forEach((word) => {
    if (limit < word.length) finished = true;

    if (finished) return;

    if (!result == "") result += " ";

    result += word;

    limit -= word.length;
  });

  return (result += " ");
}

const results = (items, max, page) =>
  items.filter((_, index) => {
    if (index >= max - page) {
      if (index < max) return true;
    }
    return false;
  });

export default { limit, needed, content, results };
