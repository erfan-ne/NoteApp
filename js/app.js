const CreateBtn = document.querySelector('.create-button')
const ModalScreen = document.querySelector('.modal-screen')
const ExitBtn = document.querySelector('.close-x-btn')
const CansleBtn = document.querySelector('.close')
const AddNoteBtn = document.querySelector('.continue')
const NoteTxt = document.querySelector('#editor')
const NoteSection = document.querySelector('.notes-container')
const ColorBoxes = document.querySelectorAll('.color-box')
const SearchBtn = document.querySelector('.search-btn')
const SearchInput = document.querySelector(".search-value")

let NotesList = []
let MainColor; // Note Color


function LoadPage() {
  const LocalNotes = JSON.parse(localStorage.getItem("Notes"))

  if(LocalNotes){
    NotesList = LocalNotes
  }
  ShowNotes()
}

function SendToLocal(){
  localStorage.setItem("Notes" , JSON.stringify(NotesList))
}

function Search() {
  const Notes = document.querySelectorAll(".note")
  const SearchValue = SearchInput.value
  
  Notes.forEach(function(Note){
    const NoteContent = Note.querySelector('.note-content')
    if (NoteContent.innerHTML.toLowerCase().includes(SearchValue.toLowerCase())){
      NoteContent.parentElement.style.display = "flex"
    } else {
      NoteContent.parentElement.style.display = "none"
    }
  })
}

function AddNote(){
  if (NoteTxt.value.length === 0){
    alert("فکر کنم یادت رفت یادداشت خودت رو بنویسی ;)")
  } else {
    const NewNote = {
      id: Date.now(),
      title: NoteTxt.value,
      color: MainColor || "#0891b2"
    }
    NotesList.push(NewNote)
    SendToLocal()
    ShowNotes()
  }
}

function ShowNotes(){
  NoteSection.innerHTML = ""
  
  if (NotesList.length){
    NoteSection.style.display = "grid"
    NotesList.forEach(function(note){
      NoteSection.insertAdjacentHTML("beforeend" , 
      `
      <article class="note" style="background-color:${note.color} " id="${note.id}">
        <p class="note-content">${note.title}</p>
        <div>
          <button class="fa-solid fa-trash delete" onclick="deleteNote(${note.id})"></button>
        </div>
      </article>
      `
      )
    NoteTxt.value = ""
    HideModal()
    })
  } else{
    NoteSection.style.display = "flex"
    NoteSection.innerHTML = `<p class="empty">موردی ثبت نشده است</p>`
  }
}


  function deleteNote(NoteID){
    const MainNoteIndex = NotesList.findIndex(function(Note){
      return Note.id === NoteID;
    })
    NotesList.splice(MainNoteIndex , 1);
    ShowNotes();
    SendToLocal();
    
  }

function ShowModal() {
  ModalScreen.classList.remove("hidden")
}

function HideModal() {
  ModalScreen.classList.add("hidden")
}

function EscBtn(event) {
  if(event.key === "Escape"){
    HideModal()}
}

// Choose Color
ColorBoxes.forEach(function(ColorBox){
  ColorBox.addEventListener('click' , function(event){
    MainColor = event.target.dataset.color
    const SelectedColor = document.querySelector(".selected")
    SelectedColor.classList.remove("selected")
    
    ColorBox.classList.add("selected")
  })
})



CreateBtn.addEventListener('click' , ShowModal)
ExitBtn.addEventListener('click' , HideModal)
CansleBtn.addEventListener('click' , HideModal)
AddNoteBtn.addEventListener('click' , AddNote)
document.addEventListener('keydown' , EscBtn)
SearchBtn.addEventListener('click' , Search)
SearchInput.addEventListener('keydown', function(event){
  if (event.key === 'Enter') Search()
});