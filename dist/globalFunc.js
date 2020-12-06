export function resizeTextarea(target) {
  console.log("work");

  if (target.scrollHeight >= 400) {
    console.log("test area");
    target.style.cssText = `height: 400px; overflow: auto`;
    target.scrollTop = target.scrollHeight;
  } else {
    console.log("test 2");
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;
  }
}
