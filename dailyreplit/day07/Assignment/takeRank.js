//assignment
function takeRank(arr){
    // 아래에 코드를 작성해주세요.  
    let answer=Array.from({length:arr.length},()=>1);
    for (let i = 0; i < arr.length; i++){
      for (let j = 0; j < arr.length; j++){
        if(arr[i]>arr[j]){
          answers[i]++
        }
      }
    }
  
    
    return answer;
}

// 아래의 코드는 절대로 수정하거나 삭제하지 마세요.
module.exports = takeRank;