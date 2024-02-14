const moveDiv = document.querySelector(".head-slider");
let prevX = 0;
let prevY = 0;

document.addEventListener("mousemove", (event) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  const moveX = mouseX - prevX;
  const moveY = mouseY - prevY;

  moveDiv.style.transform = `translate(${moveX / 4}px, ${moveY / 4}px)`;

  prevX = mouseX;
  prevY = mouseY;
});

$(".header-content").slideDown(3000);

$(document).ready(function () {
  $(".feature-card").hover(
    function () {
      $(this).css("transform", "scale(1.1)");
    },
    function () {
      $(this).css("transform", "scale(1)");
    }
  );
});

$(document).ready(function () {
  $(window).scroll(function () {
    var windowHeight = $(window).height();
    var scrollPosition = $(window).scrollTop();

    $(".feature-section").each(function () {
      var offset = $(this).offset().top;

      if (scrollPosition > offset - windowHeight + 200) {
        $(this).addClass("show");
      }
    });
  });
});

$(document).ready(function () {
  AOS.init({
    duration: 1200,
    delay: 200,
    once: true,
  });
});

const btnAdd = document.querySelector(".btn-add");
const noteContainer = document.querySelector(".note-container");
const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((noteTxt) => addNote(noteTxt));
}

if (btnAdd) {
  btnAdd.addEventListener("click", () => addNote());
}

function addNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note-wrapper");
  note.innerHTML = `
    <div class="operations d-flex justify-content-end p-2">
      <button class="edit mx-1 mt-1" type="button" title="Edit">
        <i class="fas fa-edit"></i>
      </button>
      <button class="delete mx-1 mt-1" type="button" title="Delete">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div> 
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea title="Note content" class="${text ? "hidden" : ""}"></textarea>
  `;

  const editBtn = note.querySelector(".edit");
  const deleteBtn = note.querySelector(".delete");
  const mainEle = note.querySelector(".main");
  const textareaEle = note.querySelector("textarea");

  textareaEle.value = text;
  mainEle.innerHTML = text;

  deleteBtn.addEventListener("click", () => {
    note.remove();
    updates();
  });

  editBtn.addEventListener("click", () => {
    mainEle.classList.toggle("hidden");
    textareaEle.classList.toggle("hidden");
  });

  textareaEle.addEventListener("input", (e) => {
    const { value } = e.target;
    mainEle.innerHTML = value;
    updates();
  });
  noteContainer.appendChild(note);
}

function updates() {
  const noteText = document.querySelectorAll("textarea");
  const notes = [];
  noteText.forEach((note) => notes.push(note.value));
  localStorage.setItem("notes", JSON.stringify(notes));
}
