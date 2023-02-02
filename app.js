// console.log("Welcome to notes app. This is app.js");
showNotes();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title: addTitle.value,
    text: addTxt.value,
  };
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
  //   console.log(notesObj);
  showNotes();
});

// Implement the validate function
Display.prototype.validate = function (element) {
  let addTitle = document.getElementById("addTitle");
  let addTxt = document.getElementById("addTxt");
  if (addTitle.value.length < 2 || addTxt.value.length < 2) {
    return false
    console.log('not2 validete')
  }
  else {
    return true;
    console.log('validete')
  }

}
// Implement the show function
Display.prototype.show = function (type, displayMessage) {
  let message = document.getElementById("message");
                notesObj.innerHTML = `
                <div class="alert alert-warning alert-${type} fade show" role="alert">
                    <strong>Messge: </strong>  ${displayMessage}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                `; 
  setTimeout(function () {
    notesObj.innerHTML = ""; 
  }, 4000);
};

// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let html = "";
  notesObj.forEach(function (element, index) {
    html +=  `
    <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text"> ${element.text}</p>
                <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
        </div>`;
  });

  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

// Display Constructor
function Display() {

}
// Implement the clear function
// Display.prototype.clear = function () {
//   let libraryForm = document.getElementById('libraryForm');
//   libraryForm.reset();
// }

// Function to delete a note
function deleteNote(index) {
  //   console.log("I am deleting", index);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  // console.log('Input event fired!', inputVal);
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
    // console.log(cardTxt);
  });
});
let display = new Display();
if (display.validate()) {
  showNotes();
  // display.clear();
  display.show("success", "Your book has been successfully added");
} 
else {
  // Show error to the user
  display.show("danger", "Sorry you cannot add this book");
}

/*
Further Features:
1. Add Title
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server 
*/
