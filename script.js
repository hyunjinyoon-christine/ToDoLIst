//새로운 트윗 작성 버튼 이벤트

let postBtn = document.querySelector('#post')
let readingArea = document.querySelector('#list')
let postInput = document.querySelector('#postInput')
let filterBtn = document.querySelector('#filter')

//처음 접속시 인풋에 포커싱
postInput.focus()


//로컬스토리지에 저장
if (!localStorage.data) {
    localStorage.setItem('data', JSON.stringify(DATA));
} else {
    DATA = JSON.parse(localStorage.getItem('data'));
    for (el of DATA) {
        el.date = new Date(el.date)
    }
}

//데이터를 함수에 넘겨서 출력
function printPosts() {
    for (let post of DATA) {
        printPost(post)
    }
}

//엘리먼트들로 만들어진 li 엘리먼트를 ul에 붙인다. 
function printPost(post) {
    let postElement = makeElement(post)
    readingArea.appendChild(postElement)
}


function makeElement(post) {
    let liElement = document.createElement('div');
    liElement.classList.add('item', 'd-flex', 'justify-content-between','mb-4')
    liElement.id = post.id

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
    text.textContent = post.contents
    text.classList.add('font-weight-bold')
    textBox.appendChild(text)

    let date = document.createElement('div')
    // date.textContent = post.date
    date.textContent = moment(post.date).format('YYYY.MM.DD. HH:mm')
    textBox.appendChild(text)
    textBox.appendChild(date)
    divFlex1.appendChild(textBox)

    let divFlex2 = document.createElement('div')
    divFlex2.classList.add('d-flex')

    let editBtn = document.createElement('div')
    editBtn.textContent = 'Edit'
    editBtn.classList.add('mr-4')    
    divFlex2.appendChild(editBtn)
    editBtn.addEventListener('click', editPost)

    let delBtn = document.createElement('div')
    delBtn.textContent = 'Delete'
    delBtn.addEventListener('click', delPost)

    divFlex2.appendChild(delBtn)        

    liElement.appendChild(divFlex1)
    liElement.appendChild(divFlex2)

    return liElement

}

postBtn.addEventListener('click', displayNewPost)

function displayNewPost(){
    if (postInput.value){
        let object = {
            contents: postInput.value,
            date: new Date(),
            id : getId()
        }
        DATA.unshift(object)
        postInput.value = ''
        removePosts()
        printPosts()
        localStorage.setItem('data', JSON.stringify(DATA));
    } else {
        alert('내용을 입력해 주세요')
    }

}

function getId() {
    if(DATA.length > 0 ){
        let arr = DATA.map(el => el.id)
        var maxNum = arr.reduce(function (a, b) {
            return Math.max(a, b);
        });
        return maxNum + 1
    } else {
        return 0
    }
}




//li엘리먼트들 지우는 함수
function removePosts() {
    let posts = document.querySelectorAll('.item')
    for (let post of posts) {
        post.remove()
    }
}


function delPost(event){
    readingArea.removeChild(event.target.parentElement.parentElement)
    for(el of DATA){
        if (el.id == event.target.parentElement.parentElement.id) {
            console.log(el.id)
            let index = DATA.indexOf(el)            
            DATA.splice(index,1)          
        }        
    }
    localStorage.setItem('data', JSON.stringify(DATA));

}

function editPost(event){    
        
    let textBox = document.createElement('div');
    textBox.classList.add('todoInputBox')
    let input = document.createElement('input');
    input.setAttribute('type', 'text')
    input.classList.add('todoInput')
    input.value = event.target.parentElement.parentElement.children[0].children[1].children[0].textContent

    event.target.parentElement.parentElement.children[0].children[1].children[0].remove()
    textBox.appendChild(input)
    let parentDiv = event.target.parentElement.parentElement.children[0].children[1]
    parentDiv.insertBefore(textBox, event.target.parentElement.parentElement.children[0].children[1].children[0])
    
    
    let editbtnEl = event.target
    editbtnEl.style.display = 'none'
    let delbtnEl = event.target.parentElement.children[1]
    delbtnEl.style.display = 'none'
    
    let okbtnPosition = event.target.parentElement
    let okBtn = document.createElement('div');
    okBtn.classList.add('okBtn')
    okBtn.textContent = 'Ok'
    okbtnPosition.appendChild(okBtn)
    okBtn.addEventListener('click', completeEdit)

}

function completeEdit(event){
    let okBtn = event.target
    okBtn.style.display = 'none'
    
    let delbtnEl = event.target.parentElement.children[1]
    delbtnEl.style.display = 'block'
    let editbtnEl = event.target.parentElement.children[0]
    editbtnEl.style.display = 'block'

    let text = document.createElement('div')
    text.textContent = event.target.parentElement.parentElement.children[0].children[1].children[0].children[0].value
    text.classList.add('font-weight-bold')
    
    event.target.parentElement.parentElement.children[0].children[1].children[0].remove()
    let parentDiv = event.target.parentElement.parentElement.children[0].children[1]
    parentDiv.insertBefore(text, event.target.parentElement.parentElement.children[0].children[1].children[0])

    let parentEl = event.target.parentElement.parentElement
    for(el of DATA){   
        if (parentEl.id == el.id){
            el.contents = text.textContent
        }
        
    }

    localStorage.setItem('data', JSON.stringify(DATA));


}

//필터
filterBtn.addEventListener('click', getFilter)

let toggleVal = false

function getFilter() {
    if (!toggleVal){
        DATA.sort(function (a, b) {
            return a.date.getTime() - b.date.getTime()
        })
        toggleVal = true
    } else {
        DATA.sort(function (a, b) {
            return b.date.getTime() - a.date.getTime()
        })
        toggleVal = false
    }    
    removePosts()
    printPosts()
}



printPosts()
