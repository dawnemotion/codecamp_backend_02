export const checkValidationPhone = () => {
    // 1. 휴대폰번호 자릿수 맞는지 확인하기.
    if(myphone.length !== 10 && myphone.length !== 11){
        console.log("에러 발생!! 핸드폰번호를 제대로 입력해주세요!!!")
        return false
    } else {
        return true
    }
    
}

export const getToken = () => {
    // 2. 핸드폰 토큰 6자리 만들기
    const mycount = 6;
    if(mycount === undefined){
        console.log("에러 발생!! 갯수를 제대로 입력해주세요!!!")
        return
    } else if(mycount <= 0){
        console.log("에러 발생!! 갯수가 너무 적습니다!!!")
        return
    }else if(mycount > 10){
        console.log("에러 발생!! 갯수가 너무 많습니다!!!")
        return
    }
    const result = String(Math.floor(Math.random() * 10**mycount)).padStart(mycount,"0")
    console.log(result)
}

export const sendTokenToSMS = () => {
    // 3. 핸드폰 번호에 토큰 전송하기
    console.log(myphone + "번호로 인증번호" + result + "를 전송합니다.")
}



 