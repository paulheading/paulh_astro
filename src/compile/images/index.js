import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";
import { deleteAsync } from "del";

let root = "../../../../public";

let thumbnails = root + "/thumbnails";

let ads = root + "/ads";

async function formatAndClean({ path, format = "jpg" }) {
  let filepath = path + "/*." + format;

  await imagemin([filepath], {
    destination: path,
    plugins: [imageminWebp({ quality: 80 })],
  });

  await deleteAsync([filepath], { force: true });
}

let paths = [
  { path: thumbnails + "/spotify" },
  { path: thumbnails + "/ads/play" },
  { path: thumbnails + "/ads/pussy_riot" },
  { path: thumbnails + "/trailers" },
  { path: thumbnails + "/trailers/life_rewired" },
  { path: ads + "/play/billboard", format: "png" },
  { path: ads + "/play/hpu", format: "png" },
  { path: ads + "/play/mpu", format: "png" },
  { path: ads + "/pussy_riot/billboard", format: "png" },
  { path: ads + "/pussy_riot/hpu", format: "png" },
  { path: ads + "/pussy_riot/mpu", format: "png" },
];

paths.forEach((path) => formatAndClean(path));

console.log("images compiled!");
