export function capitalizeFirstLetter(string: string) {
  return string[0].toUpperCase() + string.slice(1);
}

export function clearWord(word: string) {
  return word.replace(/-/g, ' ');
}
