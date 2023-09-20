let $ = {};

$.body = document.querySelector("body");

$.menu = document.getElementById("menu");

$.hero = document.getElementById("hero");
$.hero_name = $.hero?.querySelector(".name");
$.hero_link = $.hero_name?.querySelector(".link");
$.hero_svgs = $.hero?.querySelectorAll("svg");

$.marquee = document.getElementById("marquee");
$.marquee_tab_link = $.marquee?.querySelector(".tab-link");
$.marquee_row_link = $.marquee?.querySelector(".row-link");
$.marquee_link_content = $.marquee?.querySelector(".link-content");

$.wifi = document.getElementById("wifi");
$.wifi_svg = $.wifi?.querySelector("svg");
$.wifi_paths = $.wifi_svg?.querySelectorAll("path");

$.time = document.getElementById("time");
$.time_hours = $.time?.querySelector(".hours");
$.time_separator = $.time?.querySelector(".separator");
$.time_minutes = $.time?.querySelector(".minutes");

$.desktop_windows = document.getElementById("desktop_windows");
$.desktop_folders = document.getElementById("desktop_folders");

$.folders = $.desktop_folders?.querySelectorAll(".folder");
$.windows = $.desktop_windows?.querySelectorAll(".window");

$.trello = document.getElementById("window_trello");
$.trello_pages = $.trello?.querySelectorAll(".page");
$.trello_footer = $.trello?.querySelector("footer");
$.trello_previous = $.trello_footer?.querySelector(".previous");
$.trello_status = $.trello_footer?.querySelector(".status");
$.trello_next = $.trello_footer?.querySelector(".next");

$.contact = document.getElementById("contact");
$.contact_form = $.contact?.querySelector("form");
$.contact_success = $.contact?.querySelector("#success");

$.success_group = $.contact_success?.querySelector(".group");
$.success_title = $.contact_success?.querySelector(".title");
$.success_svg = $.contact_success?.querySelector("svg");
$.success_ellipses = $.success_svg?.querySelectorAll("ellipse");
$.success_line = $.success_svg?.querySelector("#line");
$.success_paths = $.success_line?.querySelector("path");

$.projects_row = document.getElementById("projects_row");
$.roles_row = document.getElementById("roles_row");
$.learning_row = document.getElementById("learning_row");

$.page_back = document.getElementById("back");

$.gallery = document.getElementById("gallery");
$.thumbnails = $.gallery?.querySelectorAll(".thumbnail");
$.overlay = $.gallery?.querySelector(".overlay");

$.overlay_content = $.overlay?.querySelector(".content");
$.overlay_controls = $.overlay?.querySelector(".controls");
$.overlay_close = $.overlay?.querySelector(".close");
$.overlay_play = $.overlay?.querySelector(".play");
$.overlay_mute = $.overlay?.querySelector(".mute");
$.overlay_prev = $.overlay?.querySelector(".prev");
$.overlay_next = $.overlay?.querySelector(".next");
$.overlay_loader = $.overlay?.querySelector(".loader");

$.overlay_video_controls = [$.overlay_play, $.overlay_mute];

export default $;
