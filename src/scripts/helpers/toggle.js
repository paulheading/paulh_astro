function folders(name, subfolder, folder) {
  if (folder.name == name) {
    if (!folder.group) {
      folder.open = !folder.open;
      folder.focus = folder.open;
    } else {
      folder.group.items.map(function (item) {
        if (item.name == subfolder) {
          item.open = !item.open;
        } else item.open = false;

        item.focus = item.open;

        return item;
      });
    }
  }

  if (folder.name != name) {
    if (!folder.group) {
      folder.focus = false;
    } else {
      folder.group.items.map(function (item) {
        item.focus = false;
        return item;
      });
    }
  }

  return folder;
}

export default { folders };
