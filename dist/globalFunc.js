export function resizeTextarea(target) {
  if (target.scrollHeight >= 400) {
    target.style.cssText = `height: 400px; overflow: auto`;
    target.scrollTop = target.scrollHeight;
  } else {
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;
  }
}
