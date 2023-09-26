class person {
  constructor({ name, email, location, platforms }) {
    this.name = name;
    this.email = this.createEmail(email);
    this.location = location;
    this.platforms = platforms.map(this.createPlatform);
  }
  link(name, url, custom) {
    if (custom) url = custom + url;
    return `<a href="${url}">${name}</a>`;
  }
  createPlatform({ name, url }) {
    const { link } = person.prototype;
    return { name, url, link: link(name, url) };
  }
  createEmail(email) {
    const { link } = person.prototype;
    return { address: email, link: link(email, email, "mailto:") };
  }
}

function sections(content, element) {
  let sections = content.split(element);

  return sections.map(function (section, index) {
    if (section == "") return;
    if (index > 0) section = element + section;
    return section;
  });
}

function thumb({
  index = 0,
  src = "",
  title = "",
  width = 120,
  height = 90,
  type = "video",
  content = {
    width: 1280,
    height: 720,
  },
}) {
  return {
    index,
    src,
    title,
    width,
    height,
    type,
    content,
  };
}

export default { person, sections, thumb };
