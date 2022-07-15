export const isHtmlStringEmpty = (quill: string) => {
  const cleanText = quill.replace(/<\/?[^>]+(>|$)/g, "");
  return !cleanText || cleanText.length === 0;
};
