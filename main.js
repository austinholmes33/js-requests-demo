console.log('connected')

const getAllBtn = document.querySelector('#all')
const charBtns = document.querySelectorAll('.char-btns')
const ageForm = document.querySelector('#age-form')
const ageInput = document.querySelector('#age-input')
const createForm = document.querySelector('#create-form')
const newFirstInput = document.querySelector('#first')
const newLastInput = document.querySelector('#last')
const newGenderDropDown = document.querySelector('select')
const newAgeInput = document.querySelector('#age')
const newLikesText = document.querySelector('textarea')
const charContainer = document.querySelector('section')

const baseURL = 'http://localhost:4000'

function getAllChars() {
  clearCharacters()

  axios.get(baseURL + '/characters')
  .then((response) => {
    for (let i = 0;i < response.data.length; i++) {
      createCharacterCard(response.data[i])
    }
  })
  .catch((error) => {
    console.log(error)
  })
}

function getOneChar (event) {
  clearCharacters()

  let theCharID = event.target.id

  axios.get(baseURL + '/character/' + theCharID)
  .then((response) => {
    createCharacterCard(response.data)
  })
  .catch((error) => {
    console.log(error)
  })
}

function getOldChars (event) {
  event.preventDefault()
  clearCharacters()
  const age = ageInput.value

  axios.get(baseURL + '/character/' + '?age=' + age)
  .then((response) =>  {
    for (let i = 0;i < response.data.length; i++) {
      createCharacterCard(response.data[i])
    }
  })
  .catch((error) => {
    console.log(error)
  })
}

function createNewChar() {
  event.preventDefault()
  clearCharacters()
  let newLikes = newLikesText.value.split(',')
  let body = {
    firstName: newFirstInput.value,
    lastName: newLastInput.value,
    age: newAgeInput.value,
    likes: newLikes
  }
  axios.post(baseURL + '/character', body)
  .then((response) => {
    for (let i = 0;i < response.data.length; i++) {
      createCharacterCard(response.data[i])
    }
  })
  .catch((error) => {
    console.log(error)
  })
}

function createCharacterCard(char) {
  let charCard = document.createElement('div')
  charCard.innerHTML = `<h3>${char.firstName} ${char.lastName}</h3>
  <p>gender: ${char.gender} | age: ${char.age}</p>
  <h4>Likes</h4>
  <ul>
    <li>${char.likes[0]}</li>
    <li>${char.likes[1]}</li>
    <li>${char.likes[2]}</li>
  </ul>`

  charContainer.appendChild(charCard)
}

function clearCharacters() {
  charContainer.innerHTML = ``
}

getAllBtn.addEventListener('click', getAllChars)
ageForm.addEventListener('submit', getOldChars)
createForm.addEventListener('submit', createNewChar)

for (let i = 0; i < charBtns.length; i++) {
  charBtns[i].addEventListener('click', getOneChar)
}
getAllChars()