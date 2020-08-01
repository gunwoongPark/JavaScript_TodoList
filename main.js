// localStorage.clear();

if (localStorage.length == 0) {
    localStorage.isLogin = false;
    localStorage.current = 'none';
}

let clock = document.querySelector('#clock');
setInterval(getTime, 1000);

function getTime() {
    const time = new Date();
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    clock.innerHTML = `${hour < 10 ? `0${hour}` : hour}시 ${minutes < 10 ? `0${minutes}` : minutes}분 ${seconds < 10 ? `0${seconds}` : seconds}초`
}

if (localStorage.getItem('isLogin') === 'false') {
    let inputNickName = document.querySelector('#inputNickname');
    inputNickName.addEventListener('keyup', (e) => {
        if (e.keyCode === 13) {
            if (e.target.value.length > 0) {
                let inputText = e.target.value;
                e.target.value = "";
                if (localStorage.getItem(inputText) === null) {
                    var schedule = {
                        pending: [],
                        finished: []
                    }
                    localStorage[inputText] = JSON.stringify(schedule);
                }
                inputTodo.setAttribute('placeholder', 'Hi ' + inputText + ' please type your todo');
                localStorage.setItem('isLogin', 'true');
                localStorage.setItem('current', inputText);
                location.reload(true);
                loginPending();
                loginFinished()
            }
        }
    });
}

else {
    let divLogin = document.querySelector('.Login');
    let divMain = document.querySelector('.Main');
    divLogin.style.display = 'none';
    divMain.style.display = "";
    inputTodo.setAttribute('placeholder', 'Hi ' + localStorage.getItem('current') + ' please type your todo.    If you want to logout, then type in the logout');
    loginPending();
    loginFinished();
    inputTodo.addEventListener('keyup', (e) => {
        if (e.keyCode === 13) {
            if (e.target.value.length > 0) {
                if (e.target.value.toLowerCase() === "logout") {
                    localStorage.isLogin = false;
                    localStorage.current = 'none';
                    location.reload(true);
                }
                let inputText = e.target.value;
                e.target.value = "";
                let storageObject = localStorage[localStorage.getItem('current')];
                schedule = JSON.parse(storageObject);
                schedule.pending.push(inputText);
                localStorage[localStorage.getItem('current')] = JSON.stringify(schedule);
                addTodo();
                location.reload(true);
            }
        }
    });
    checkPend();
    deletePend();
    checkFinish();
    deleteFinish();
}

function loginPending() {
    let pending = document.querySelector('.pending');
    let storageObject = localStorage[localStorage.getItem('current')];
    schedule = JSON.parse(storageObject);
    schedule.pending.forEach((pend, index) => {
        let container = document.createElement('div');
        let divRow = document.createElement('div');
        let divCol1 = document.createElement('div');
        let input = document.createElement('input');
        let divCol2 = document.createElement('div');
        let divCol3 = document.createElement('div');
        let button = document.createElement('button');

        container.id = 'pendContainer';
        divRow.classList.add('row');
        divCol1.classList.add('col-md-1');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('name', 'pendCheckList');
        divCol2.classList.add('col-md-9');
        divCol2.id = "pendText";
        divCol3.classList.add('col-md-1');
        button.classList.add('pendBtn');
        button.classList.add('btn-danger');
        button.classList.add('btn-sm');
        button.setAttribute('name', "pendBtnList");
        button.innerHTML = "Delete";

        divCol3.appendChild(button);
        divCol1.appendChild(input);
        divRow.appendChild(divCol1);
        divRow.appendChild(divCol2);
        divRow.appendChild(divCol3);
        container.appendChild(divRow);
        container.appendChild(document.createElement('br'));

        pending.appendChild(container);
        divCol2.innerHTML = pend;
    });
}

function loginFinished() {
    let finished = document.querySelector('.finished');
    let storageObject = localStorage[localStorage.getItem('current')];
    schedule = JSON.parse(storageObject);
    schedule.finished.forEach((finish, index) => {

        let container = document.createElement('div');
        let divRow = document.createElement('div');
        let divCol1 = document.createElement('div');
        let input = document.createElement('input');
        let divCol2 = document.createElement('div');
        let divCol3 = document.createElement('div');
        let button = document.createElement('button');

        container.id = 'finishContainer';
        divRow.classList.add('row');
        divCol1.classList.add('col-md-1');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('name', 'finishCheckList');
        divCol2.classList.add('col-md-9');
        divCol2.id = "finishText";
        divCol3.classList.add('col-md-1');
        button.classList.add('finishBtn');
        button.classList.add('btn-danger');
        button.classList.add('btn-sm');
        button.setAttribute('name', "finishBtnList");
        button.innerHTML = "Delete";

        divCol3.appendChild(button);
        divCol1.appendChild(input);
        divRow.appendChild(divCol1);
        divRow.appendChild(divCol2);
        divRow.appendChild(divCol3);
        container.appendChild(divRow);
        container.appendChild(document.createElement('br'));

        finished.appendChild(container);
        divCol2.innerHTML = finish
    });
}

function addTodo() {
    let pending = document.querySelector('.pending');
    let storageObject = localStorage[localStorage.getItem('current')];
    schedule = JSON.parse(storageObject);

    let container = document.createElement('div');
    let divRow = document.createElement('div');
    let divCol1 = document.createElement('div');
    let input = document.createElement('input');
    let divCol2 = document.createElement('div');
    let divCol3 = document.createElement('div');
    let button = document.createElement('button');

    container.id = 'pendContainer';
    divRow.classList.add('row');
    divCol1.classList.add('col-md-1');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('name', 'pendCheckList');
    divCol2.classList.add('col-md-9');
    divCol2.id = "pendText";
    divCol3.classList.add('col-md-1');
    button.classList.add('pendBtn');
    button.classList.add('btn-danger');
    button.classList.add('btn-sm');
    button.setAttribute('name', "pendBtnList");
    button.innerHTML = "Delete";

    divCol3.appendChild(button);
    divCol1.appendChild(input);
    divRow.appendChild(divCol1);
    divRow.appendChild(divCol2);
    divRow.appendChild(divCol3);
    container.appendChild(divRow);
    container.appendChild(document.createElement('br'));

    pending.appendChild(container);
    divCol2.innerHTML = schedule.pending[schedule.pending.length - 1];
}

function checkPend() {
    let checkList = document.getElementsByName('pendCheckList');
    checkList.forEach((pend, index) => {
        pend.addEventListener('click', (e) => {
            let delDiv = pend.parentElement.parentElement.parentElement;
            let delText = delDiv.querySelector('#pendText');
            let storageObject = localStorage[localStorage.getItem('current')];
            schedule = JSON.parse(storageObject);
            let delIndex = schedule.pending.indexOf(delText.innerHTML);
            schedule.pending.splice(delIndex, 1);
            schedule.finished.push(delText.innerHTML);
            localStorage[localStorage.getItem('current')] = JSON.stringify(schedule);
            location.reload(true);
        });
    });
}

function deletePend() {
    let btnList = document.getElementsByName('pendBtnList');
    btnList.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            let delDiv = btn.parentElement.parentElement.parentElement;
            let delText = delDiv.querySelector('#pendText');
            let storageObject = localStorage[localStorage.getItem('current')];
            schedule = JSON.parse(storageObject);
            let delIndex = schedule.pending.indexOf(delText.innerHTML);
            schedule.pending.splice(delIndex, 1);
            localStorage[localStorage.getItem('current')] = JSON.stringify(schedule);
            location.reload(true);
        })
    })
}

function checkFinish() {
    let checkList = document.getElementsByName('finishCheckList');
    checkList.forEach((finish, index) => {
        finish.addEventListener('click', (e) => {
            let delDiv = finish.parentElement.parentElement.parentElement;
            let delText = delDiv.querySelector('#finishText');
            let storageObject = localStorage[localStorage.getItem('current')];
            schedule = JSON.parse(storageObject);
            let delIndex = schedule.finished.indexOf(delText.innerHTML);
            schedule.finished.splice(delIndex, 1);
            schedule.pending.push(delText.innerHTML);
            localStorage[localStorage.getItem('current')] = JSON.stringify(schedule);
            location.reload(true);
        })
    })
}

function deleteFinish() {
    let btnList = document.getElementsByName('finishBtnList');
    btnList.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            let delDiv = btn.parentElement.parentElement.parentElement;
            let delText = delDiv.querySelector('#finishText');
            let storageObject = localStorage[localStorage.getItem('current')];
            schedule = JSON.parse(storageObject);
            let delIndex = schedule.finished.indexOf(delText.innerHTML);
            schedule.finished.splice(delIndex, 1);
            localStorage[localStorage.getItem('current')] = JSON.stringify(schedule);
            location.reload(true);
        });
    });
}