export const htmlSubstring = (str: string, len: number) => {
  let temp = str.substr(0, len);
  if (temp.lastIndexOf("<") > temp.lastIndexOf(">")) {
    temp = str.substr(0, 1 + str.indexOf(">", temp.lastIndexOf("<")));
  }
  return temp;
};
