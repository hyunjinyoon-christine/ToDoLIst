//새로운 트윗 작성 버튼 이벤트

let postBtn = document.querySelector('#post')
let readingArea = document.querySelector('#list')
let postInput = document.querySelector('#postInput')

//엘리먼트들로 만들어진 li 엘리먼트를 ul에 붙인다. 
function showNewPost() {
    console.log('post')
    let postElement = makeElement()
    readingArea.appendChild(postElement)
}


function makeElement() {
    let liElement = document.createElement('div');
    liElement.classList.add('item', 'd-flex', 'justify-content-between','mb-4')

    let divFlex1 = document.createElement('div')
    divFlex1.classList.add('d-flex')
    

    let checkBoxDiv = document.createElement('div')
    checkBoxDiv.classList.add('mr-3')

    let checkBox = document.createElement('input')
    checkBox.setAttribute('type','checkbox')
    checkBox.classList.add('checkBox')
    checkBoxDiv.appendChild(checkBox)
    divFlex1.appendChild(checkBoxDiv)
    
    let textBox = document.createElement('div')
    let text = document.createElement('div')
    text.textContent = postInput.value
    text.classList.add('font-weight-bold')
    textBox.appendChild(text)

    let date = document.createElement('div')
    date.textContent = moment().format('YYYY.MM.DD. HH:mm');
    textBox.appendChild(text)
    textBox.appendChild(date)
    divFlex1.appendChild(textBox)

    let divFlex2 = document.createElement('div')
    divFlex2.classList.add('d-flex')

    let editBtn = document.createElement('div')
    editBtn.textContent = 'Edit'
    editBtn.classList.add('mr-4')
    divFlex2.appendChild(editBtn)

    let delBtn = document.createElement('div')
    delBtn.textContent = 'Delete'
    delBtn.addEventListener('click', delPost)

    divFlex2.appendChild(delBtn)
    
    

    liElement.appendChild(divFlex1)
    liElement.appendChild(divFlex2)

    return liElement

}

postBtn.addEventListener('click', showNewPost)

function delPost(event){
    console.dir(event.target)
    readingArea.removeChild(event.target.parentElement.parentElement)    
}