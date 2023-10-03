export function truncateText(text:string, maxLength:number) {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.substring(0, maxLength - 3) + '...';
  }
}

export default truncateText