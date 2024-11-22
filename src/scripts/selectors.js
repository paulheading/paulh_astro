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

$.canvas_container = document.querySelector(".canvas-container");

$.wrap_windows = $.canvas_container?.querySelector(".wrap-windows");
$.wrap_folders = $.canvas_container?.querySelector(".wrap-folders");

$.desktop_windows = $.wrap_windows?.querySelectorAll(".outer-window");
$.desktop_singlefolders = $.wrap_folders?.querySelectorAll(
  ".singlefolder-container"
);
$.desktop_groupfolders = $.wrap_folders?.querySelectorAll(
  ".groupfolder-container"
);

$.trello = document.querySelector(".outer-window[data-label=trello]");
$.trello_pages = $.trello?.querySelectorAll("main > a");
$.trello_footer = $.trello?.querySelector("footer");
$.trello_previous = $.trello_footer?.querySelector(".previous");
$.trello_status = $.trello_footer?.querySelector(".status");
$.trello_currentPage = $.trello_status?.querySelector(".currentPage");
$.trello_next = $.trello_footer?.querySelector(".next");

$.contact = document.getElementById("contact");
$.contact_form = $.contact?.querySelector("form");
$.contact_success = $.contact?.querySelector("#success");

$.success_group = $.contact_success?.querySelector(".group");
$.success_title = $.contact_success?.querySelector(".title");
$.success_svg = $.contact_success?.querySelector("svg");
$.success_colors = $.success_svg?.querySelector("[data-colors]");
$.success_ellipses = $.success_svg?.querySelectorAll("ellipse");
$.success_line = $.success_svg?.querySelector("[data-line]");
$.success_paths = $.success_line?.querySelectorAll("path");

$.projects_row = document.getElementById("projects_row");
$.roles_row = document.getElementById("roles_row");
$.learning_row = document.getElementById("learning_row");

$.page_back = document.getElementById("back");

$.gallery = document.getElementById("gallery");
$.thumbnails = $.gallery?.querySelectorAll(".thumbnail");
$.overlay = $.gallery?.querySelector(".overlay");

$.overlay_content = $.overlay?.querySelector(".content");
$.overlay_context = $.overlay?.querySelector(".context");
$.overlay_controls = $.overlay?.querySelector(".controls");

$.overlay_info = $.overlay?.querySelector(".info");
$.overlay_play = $.overlay?.querySelector(".play");
$.overlay_mute = $.overlay?.querySelector(".mute");
$.overlay_prev = $.overlay?.querySelector(".prev");
$.overlay_next = $.overlay?.querySelector(".next");
$.overlay_loader = $.overlay?.querySelector(".loader");

$.controls_close = $.overlay_controls?.querySelector(".close");

$.context_close = $.overlay_context?.querySelector(".close");
$.context_copy = $.overlay_context?.querySelector(".copy");

export default $;
