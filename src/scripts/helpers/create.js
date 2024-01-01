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

function content({
  src = "",
  title = "",
  info = "",
  width = 120,
  height = 90,
  type = "video",
  content = {
    width: 1280,
    height: 720,
  },
}) {
  return {
    src,
    title,
    width,
    height,
    type,
    content,
    info,
  };
}

const ad = (value = "") => "/ads/" + value;

function billboard({ src = "", info = "" }) {
  return content({
    src: ad(src + "/billboard"),
    title: "Billboard",
    height: 50,
    type: "ad",
    info,
    content: {
      width: 970,
      height: 250,
    },
  });
}

function mpu({ src = "", info = "" }) {
  return content({
    src: ad(src + "/mpu"),
    title: "MPU",
    width: 85,
    type: "ad",
    info,
    content: {
      width: 300,
      height: 250,
    },
  });
}

function hpu({ src = "", info = "" }) {
  return content({
    src: ad(src + "/hpu"),
    title: "HPU",
    type: "ad",
    width: 70,
    info,
    content: {
      width: 300,
      height: 600,
    },
  });
}

export default {
  person,
  content,
  billboard,
  mpu,
  hpu,
};
