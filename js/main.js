document.querySelector("#pwdCheck").onblur = isEqualPwd; 

document.memberFrm.onsubmit = function () {
  const userId = document.getElementById("userId");
  const pwd = document.getElementById("pwd");
  const pwdCheck = document.getElementById("pwdCheck");
  const userName = document.getElementById("userName");
  const email = document.getElementById("email");
  const ssn1 = document.getElementById("ssn1");
  const ssn2 = document.getElementById("ssn2");
  const tel1 = document.getElementById("tel1");
  const tel2 = document.getElementById("tel2");
  const tel3 = document.getElementById("tel3");

  

  
  const regExp1 = /^[a-z][a-z\d]{3,11}$/;
  const regExp2 = /[0-9]/;
  if(!regExpTest(regExp1
                ,userId
                ,"아이디는 영소문자로 시작하는 4~12글자입니다."))
      return false;
  if(!regExpTest(regExp2
                ,userId
                ,"아이디는 숫자를 하나이상 포함하세요."))
      return false;

  const regExpArr = [/^.{8,15}$/, /\d/, /[a-zA-Z]/, /[\\*!&]/];

  for (let i = 0; i < regExpArr.length; i++) {
    if (
      !regExpTest(
        regExpArr[i],
        pwd,
        "비밀번호는 8~15자리 숫자/문자/특수문자를 포함해야합니다."
      )
    ) {
      return false;
    }
  }

 
  if (!isEqualPwd()) {
    return false;
  }

  const regExp3 = /^[가-힣]{2,}$/;
  if (!regExpTest(regExp3, userName, "한글2글자이상 입력하세요."))
    return false;

  const regExp4 = /^\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[01])$/;
  const regExp5 = /^[1234]\d{6}$/;
  if (!regExpTest(regExp4, ssn1, "숫자만 입력하세요.")) return false;
  if (!regExpTest(regExp5, ssn2, "숫자만 입력하세요.")) return false;

  if (!ssnCheck(ssn1.value, ssn2.value)) {
    alert("올바른 주민번호가 아닙니다.");
    return false;
}

if (
    !regExpTest(
        /^[\w]{4,}@[\w]+(\.[\w]+){1,3}$/,
        email,
        "이메일 형식에 어긋납니다."
    )
  )
  return false;
  
  if (!regExpTest(/^0\d{1,2}$/, tel1, "번호 2자리 이상 입력")) 
  return false;
  if (!regExpTest(/^[0-9]{3,4}$/, tel2, "번호 3자리 이상 입력"))
  return false;
  if (!regExpTest(/^[0-9]{4}$/, tel3, "4자리 번호 입력"))
  return false;
  
  return true;
  
  
};

function ssnCheck(ssn1, ssn2) {
    const ssn = ssn1 + ssn2;
    
    let total = 0;
    for (let i = 0; i < 12; i++) {
        if (i < 8) {
            total += parseInt(ssn.substr(i, 1)) * (i + 2);
        } else {
            total += parseInt(ssn.substr(i, 1)) * (i - 6);
    }
}

const result = (11 - (total % 11)) % 10;
const num13 = parseInt(ssn.substr(12, 1));
if (result === num13) return true;
else return false;
}

function isEqualPwd() {
    if (pwd.value === pwdCheck.value) {
        return true;
    } else {
        alert("비밀번호가 일치하지 않습니다.");
        pwd.select();
        return false;
    }
}

function regExpTest(regExp, el, msg) {
    if (regExp.test(el.value)) return true;
    alert(msg);
    el.value = "";
    el.focus();
    return false;
}




userName.value = '';
userId.value = '';
pwd.value = '';
tel1.value = '';
tel2.value = '';
tel3.value = '';
ssn1.value = '';
ssn2.value = '';
email.value = '';

loadGuestbook();


(()=>{
  const frm = document.guestbookFrm;
  const userId = frm.userId.value;
  const pwd = frm.pwd;
  const userName = frm.userName.value;
  const tel1 = frm.tel1.value;
  const tel2 = frm.tel2.value;
  const tel3 = frm.tel3.value;
  const tel = tel1+tel2+thl3;
  const ssn1 = frm.ssn1.value;
  const ssn2 = frm.ssn2.value;
  const ssn = ssn1+'_'+ssn2;
  const email = frm.email.value;
  
//   const guestbook = new Guestbook(userName.value,userId.value,pwd,tel,ssn,email.value);
//   console.log(guestbook);
  
//   const guestbooks = JSON.parse(localStorage.getItem('userId')) || [];
//   if(JSON.parse(localStorage.getItem(userId))){
//       alert('존재하는 회원입니다.');
//       return;
//   }
//   guestbooks.push(guestbook);
//   const jsonStr = JSON.stringify(guestbooks);
//   localStorage.setItem(userId, jsonStr);

const guestbook = new Guestbook(userName.value, userId.value, pwd, tel, ssn, email.value);
console.log(guestbook);

const guestbooks = JSON.parse(localStorage.getItem('guestbooks')) || [];
if (JSON.parse(localStorage.getItem(userId))) {
    alert('존재하는 회원입니다.');
    return;
}
guestbooks.push(guestbook);
const jsonStr = JSON.stringify(guestbooks);
localStorage.setItem('guestbooks', jsonStr);

})();

class Guestbook {
    constructor (userName,userId,pwd,tel,ssn,email) {
      this.userName = userName;
      this.userId = userId;
      this.pwd = pwd;
      this.tel = tel;
      this.ssn = ssn;
      this.email = email;
    }
}
