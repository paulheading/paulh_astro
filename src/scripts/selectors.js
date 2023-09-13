let $ = {};

$.menu = document.getElementById("menu");

$.hero = document.getElementById("hero");
$.hero_name = $.hero?.querySelector(".name");
$.hero_link = $.hero_name?.querySelector(".link");
$.hero_svgs = $.hero?.getElementsByTagName("svg");

$.marquee = document.getElementById("marquee");
$.marquee_tab_link = $.marquee?.querySelector(".tab-link");
$.marquee_row_link = $.marquee?.querySelector(".row-link");
$.marquee_link_content = $.marquee?.querySelector(".link-content");

$.wifi = document.getElementById("wifi");
$.wifi_svg = $.wifi?.getElementsByTagName("svg")[0];
$.wifi_paths = $.wifi_svg?.getElementsByTagName("path");

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
$.trello_footer = $.trello?.getElementsByTagName("footer")[0];
$.trello_previous = $.trello_footer?.querySelector(".previous");
$.trello_status = $.trello_footer?.querySelector(".status");
$.trello_next = $.trello_footer?.querySelector(".next");

$.contact = document.getElementById("contact");
$.contact_form = $.contact?.getElementsByTagName("form")[0];
$.contact_success = $.contact?.querySelector("#success");

$.success_group = $.contact_success?.querySelector(".group");
$.success_title = $.contact_success?.querySelector(".title");
$.success_svg = $.contact_success?.getElementsByTagName("svg")[0];
$.success_ellipses = $.success_svg?.getElementsByTagName("ellipse");
$.success_line = $.success_svg?.querySelector("#line");
$.success_paths = $.success_line?.getElementsByTagName("path");

$.projects_row = document.getElementById("projects_row");
$.roles_row = document.getElementById("roles_row");
$.learning_row = document.getElementById("learning_row");

$.page_back = document.getElementById("back");

$.gallery = document.getElementById("gallery");

export default $;
