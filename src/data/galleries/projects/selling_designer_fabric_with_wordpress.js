import { create } from "~scripts/helpers";

const trailer = (value = "") => "/trailers/" + value;

const content = [];

content.push(
  create.content({
    src: trailer("bourne_street_chrome"),
    title: "Brand & Website build",
    info: `It was interesting to develop this brand over time from scratch. I worked with an artist whose sketches I would scan, trace and edit into digital vector artwork. Leather and fabric can also be very technical products to market, so it was interesting to see how <a href="https://en-gb.wordpress.org/">Wordpress</a>  could adapt to the needs of the business.`,
  })
);

export default content;
