// helper function to strip '&amp;' from urls and replace them with '&'

export function cleanUrl(url) {
  if (!url) return null;
  return url.replace(/&amp;/g, "&");
}