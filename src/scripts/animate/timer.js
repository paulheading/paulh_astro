import { length } from "~data/timings";
import { gsap } from "gsap";

const timer = gsap.timeline({ repeat: -1, repeatDelay: length });

export default timer;
