const pizzaForm = document.getElementById('pizzaForm')
const pizzaMenu = document.getElementById('pizzaMenu')
let pizzaFromStorage = localStorage.getItem('pizzaArr')
  ? JSON.parse(localStorage.getItem('pizzaArr'))
  : []

insertPizzaMenu(pizzaFromStorage, 0)

pizzaForm.onsubmit = addPizza

function addPizza(e) {
  e.preventDefault()
  const name =
    document.getElementById('heat') && document.getElementById('name').value
  const price =
    document.getElementById('price') &&
    parseFloat(document.getElementById('price').value).toFixed(2)
  const heat =
    document.getElementById('heat') &&
    parseInt(document.getElementById('heat').value)
  const toppingsString =
    document.getElementById('toppings') &&
    document.getElementById('toppings').value
  let toppings = []
  const photo =
    document.querySelector('input[name="radioPizza"]:checked') &&
    parseInt(document.querySelector('input[name="radioPizza"]:checked').value)

  validationResult = validate()
  validationResult && addPizzaToLocalStorage()

  function validate() {
    const nameArr = pizzaFromStorage.map((el) => el.name)
    if (
      !typeof name === 'string' ||
      name.length > 30 ||
      nameArr.includes(name)
    ) {
      return false
    }
    if (isNaN(price) || price < 0) {
      return false
    }
    if (heat) {
      if (isNaN(heat) || heat < 1 || heat > 3) {
        return false
      }
    }
    if (photo) {
      if (isNaN(photo) || photo < 1 || photo > 4) {
        return false
      }
    }

    if (!typeof toppingsString === 'string') {
      return false
    } else {
      toppings = toppingsString.split(' ')
      for (let index = 0; index < toppings.length; index++) {
        const element = toppings[index]
        if (!element) {
          toppings.splice(index, 1)
          index--
        }
      }
    }

    return true
  }

  function addPizzaToLocalStorage() {
    pizzaFromStorage.push({
      name,
      price,
      heat,
      toppings,
      photo: `images/pizza${photo}.png`,
    })
    localStorage.setItem('pizzaArr', JSON.stringify(pizzaFromStorage))
    insertPizzaMenu(pizzaFromStorage, pizzaFromStorage.length - 1)
  }
}

function insertPizzaMenu(arr, x) {
  for (let index = x; index < arr.length; index++) {
    const el = arr[index]
    let chili = ''
    for (let j = 0; j < el.heat; j++) {
      chili =
        chili + '<img src="images/chili.svg" alt="Pizza with cucumbers" />'
    }
    pizzaMenu.insertAdjacentHTML(
      'beforeend',
      `<li id='${el.name}'>
            <img src=${el.photo} alt='Pizza with cucumbers' />
            <div class='infoContainer'>
                <h4>${el.name}</h4>
                <p>
                    ${el.toppings.map((e) => ' ' + e)}
                </p>
                ${chili}
                <div class='priceContainer'>
                    <h5>${el.price} &euro;</h5>
                    <button onclick='removeElement("${
                      el.name
                    }")'>Remove pizza</button>
                </div>
            </div>
        </li>`
    )
  }
}

function removeElement(name) {
  console.log(name)
  if (window.confirm('Do you want to delete Pizza ?')) {
    const removeEl = document.getElementById(name)
    removeEl.remove()
    console.log(name)
    const index = pizzaFromStorage.findIndex((el) => el.name === name)
    pizzaFromStorage.splice(index, 1)
    localStorage.setItem('pizzaArr', JSON.stringify(pizzaFromStorage))
  }
}

function sortArray(i) {
  if (i === 1) {
    for (let index = 0; index < pizzaFromStorage.length; index++) {
      document.getElementById(pizzaFromStorage[index].name).remove()
    }
    pizzaFromStorage.sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1
      }
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1
      }
      return 0
    })
    insertPizzaMenu(pizzaFromStorage, 0)
  }

  if (i === 2) {
    for (let index = 0; index < pizzaFromStorage.length; index++) {
      document.getElementById(pizzaFromStorage[index].name).remove()
    }
    pizzaFromStorage.sort((a, b) => {
      if (parseFloat(a.price) > parseFloat(b.price)) {
        return 1
      }
      if (parseFloat(a.price) < parseFloat(b.price)) {
        return -1
      }
      return 0
    })
    insertPizzaMenu(pizzaFromStorage, 0)
  }

  if (i === 3) {
    for (let index = 0; index < pizzaFromStorage.length; index++) {
      document.getElementById(pizzaFromStorage[index].name).remove()
    }
    pizzaFromStorage.sort((a, b) => {
      if (a.heat > b.heat) {
        return 1
      }
      if (a.heat < b.heat) {
        return -1
      }
      return 0
    })
    insertPizzaMenu(pizzaFromStorage, 0)
  }
}
