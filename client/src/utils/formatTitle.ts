export function formatTitle(title: string = "") {
    const words = title.trim().split(' ');
    
    if (words.length > 1) {
      const firstLetter = words[0][0].toUpperCase();
      const secondLetter = words[1][0].toUpperCase();
      return firstLetter + secondLetter;
    }
    
    if (words[0].length > 1) {
      return words[0].substring(0, 2).toUpperCase();
    }
    
    return words[0].toUpperCase();
  }