export function resizeTextarea(target) {
  console.log("work");
  target.style.height = "1px";
  if (target.scrollHeight >= 400) {
    target.style.cssText = `height: 400px; overflow: auto;`;
    target.scrollTop = 400;
  } else {
    target.style.height = `${target.scrollHeight}px`;
  }
}
