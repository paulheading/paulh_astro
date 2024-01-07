import $ from "~scripts/selectors";
import {
  handleGroupFolderClicks,
  handleSingleFolderClicks,
} from "~scripts/components/desktop/folders";

$.desktop_groupfolders.forEach(handleGroupFolderClicks);
$.desktop_singlefolders.forEach(handleSingleFolderClicks);
