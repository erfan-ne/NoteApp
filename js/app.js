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

let MainColor; // رنگ یادداشت ها

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

function AddNote(){
  const ArticleElem = document.createElement("article")
  ArticleElem.className = "note"
  ArticleElem.style.backgroundColor = MainColor
  NoteSection.append(ArticleElem)

  const NoteTxtElem = document.createElement("p")
  NoteTxtElem.className = "note-content"
  NoteTxtElem.textContent = NoteTxt.value
  ArticleElem.append(NoteTxtElem)

  const RemoveDivElem = document.createElement("div")
  ArticleElem.append(RemoveDivElem)

  const RemoveBtnElem = document.createElement("button")
  RemoveBtnElem.className = "fa-solid fa-trash delete"
  RemoveDivElem.append(RemoveBtnElem)
  
  NoteTxt.value = ""
  HideModal()

  RemoveBtnElem.addEventListener('click' , function(){
    RemoveBtnElem.parentElement.parentElement.remove()
  });
}

// انتخاب رنگ
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
})