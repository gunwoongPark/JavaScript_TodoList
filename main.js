// localStorage.clear();

let clock = document.querySelector('#clock');

setInterval(getTime, 1000);

function getTime() {
    const time = new Date();
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    clock.innerHTML = `${hour < 10 ? `0${hour}` : hour}시 ${minutes < 10 ? `0${minutes}` : minutes}분 ${seconds < 10 ? `0${seconds}` : seconds}초`
}

console.log(localStorage);

if (localStorage.getItem('isLogin') === 'false') {
    let inputTodo = document.querySelector('#inputTodo');

    inputTodo.addEventListener('keyup', (e) => {

        if (e.keyCode === 13) {
            // 1문자 이상은 입력하도록 예외처리
            if (e.target.value.length > 0) {

                let inputNickName = e.target.value;
                e.target.value = "";

                // 회원이 아닌 상태 -> 회원가입?
                if (localStorage.getItem(inputNickName) === null) {
                    // 저장소에 들어갈 객체
                    var schedule = {
                        pending: [],
                        finished: []
                    }
                    localStorage[inputNickName] = JSON.stringify(schedule);
                }

                // 로그인
                inputTodo.setAttribute('placeholder', 'Hi ' + inputNickName + ' please type your todo');
                localStorage.setItem('isLogin', 'true');
                localStorage.setItem('current', inputNickName);

                location.reload(true);

                loginPending();
                loginFinished()
            }
        }
    });
}

else {

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

    checkTodo();
    deleteTodo();

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

        container.id = "pendContainer";
        divRow.classList.add('row');
        divCol1.classList.add('col-md-1');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('name', 'checkList');
        divCol2.classList.add('col')
        divCol2.id = 'todoText'

        divCol1.appendChild(input);
        divRow.appendChild(divCol1);
        divRow.appendChild(divCol2);
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
        let divCol2 = document.createElement('div');
        let button = document.createElement('button');

        container.id = "finishContainer";
        divRow.classList.add('row');
        divCol1.classList.add('col');
        divCol2.classList.add('col-md-1');
        button.classList.add('btn');
        button.classList.add('btn-danger');
        button.classList.add('btn-sm');
        button.id = "delBtn"
        button.innerHTML = "Delete";
        button.setAttribute('name', 'delBtnList');

        divCol2.appendChild(button);
        divRow.appendChild(divCol1);
        divRow.appendChild(divCol2);
        container.appendChild(divRow);
        container.appendChild(document.createElement('br'));

        finished.appendChild(container);
        divCol1.innerHTML = finish
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

    container.id = "pendContainer";
    divRow.classList.add('row');
    divCol1.classList.add('col-md-1');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('name', 'checkList');
    divCol2.classList.add('col')
    divCol2.id = 'todoText'

    divCol1.appendChild(input);
    divRow.appendChild(divCol1);
    divRow.appendChild(divCol2);
    container.appendChild(divRow);
    container.appendChild(document.createElement('br'));

    pending.appendChild(container);
    divCol2.innerHTML = schedule.pending[schedule.pending.length - 1];
}

function checkTodo() {
    let checkList = document.getElementsByName('checkList');

    checkList.forEach((pend, index) => {
        pend.addEventListener('click', (e) => {
            let delDiv = pend.parentElement.parentElement.parentElement;
            let delText = delDiv.querySelector('#todoText');

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

function deleteTodo() {
    let btnList = document.getElementsByName('delBtnList');
    console.log(btnList);

    btnList.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            let delDiv = btn.parentElement.parentElement.parentElement;
            let delText = delDiv.querySelector('#delBtn');

            let storageObject = localStorage[localStorage.getItem('current')];
            schedule = JSON.parse(storageObject);

            let delIndex = schedule.finished.indexOf(delText.innerHTML);

            schedule.finished.splice(delIndex, 1);

            localStorage[localStorage.getItem('current')] = JSON.stringify(schedule);

            location.reload(true);
        });
    });
}