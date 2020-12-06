export function resizeTextarea(target) {
  console.log(target.scrollHeight);
  console.log(target.value === "");
  if (target.scrollHeight > 400) {
    console.log("first");
    target.style.cssText = `height: 400px; overflow: auto`;
    // target.scrollTop = target.scrollHeight;
  } else if (target.value === "" || target.scrollHeight <= 400) {
    console.log("second");
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;
  }
}
