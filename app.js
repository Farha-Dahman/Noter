const moveDiv = document.querySelector(".head-slider");
let prevX = 0;
let prevY = 0;

document.addEventListener("mousemove", (event) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  const moveX = mouseX - prevX;
  const moveY = mouseY - prevY;

  moveDiv.style.transform = `translate(${moveX / 2}px, ${moveY / 4}px)`;

  prevX = mouseX;
  prevY = mouseY;
});
