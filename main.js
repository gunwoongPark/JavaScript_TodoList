function storageInit() {
    localStorage.clear();
}
// storageInit();

//로그인 확인 여부 변수
var isLogin = false;
// 입력된 닉네임 정보 변수
var inputNickName = ""
// 입력 바 객체
let inputTodo = document.querySelector("#inputTodo");

console.log(localStorage);

inputTodo.addEventListener('keyup', (e) => {

    // 로그인이 안 된 상태 -> 회원가입 후 로그인 or 로그인
    if (!isLogin) {
        if (e.keyCode === 13) {
            // 1문자 이상은 입력하도록 예외처리
            if (e.target.value.length > 0) {

                inputNickName = e.target.value;
                e.target.value = "";

                // 회원이 아닌 상태 -> 회원가입
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

                updatePending();

                isLogin = true;
            }
        }
    }

    // 로그인이 된 상태 -> todo 기입
    else {
        if (e.keyCode === 13) {
            // 1문자 이상은 입력하도록 예외처리
            if (e.target.value.length > 0) {
                let inputText = e.target.value;
                e.target.value = "";

                // localstorage에서 데이터를 객체로 가져옴
                let storageObject = localStorage[inputNickName];
                schedule = JSON.parse(storageObject);

                // localstorage에 데이터를 객체로 삽입
                schedule.pending.push(inputText);
                localStorage[inputNickName] = JSON.stringify(schedule);

                updatePending();
            }
        }
    }
});

function updatePending() {
    let pending = document.querySelector('.pending');

    let storageObject = localStorage[inputNickName];
    schedule = JSON.parse(storageObject);
    console.log(schedule.pending.length);

    for (let idx = 0; idx < schedule.pending.length; ++idx) {

    }
}