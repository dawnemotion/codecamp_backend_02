import puppeteer from "puppeteer"
import mongoose from'mongoose'
import { Stock } from "./models/stock.model.js"

mongoose.connect("mongodb://localhost:27017/sejin")


async function statrCrawling(){
    const browser = await puppeteer.launch({ headless: false})
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 720})
    await page.goto("https://finance.naver.com/item/sise.naver?code=005930")
    await page.waitForTimeout(1000)
    const framePage = await page.frames().find(el => el.url().includes("https://finance.naver.com/item/sise.naver?code=005930"))
    
    for(let i=3; i<=7; i++){

        const date = await framePage.$eval(`body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(1) > span`, (el) => el.textContent)


        const price = await framePage.$eval(`body > table.type2 > tbody > tr:nth-child${i} > td:nth-child(2) > span`,(el) => el.textContent)
    
        // 새로 컬렉션하나를 만들어야한다
        // 가격은 스트링으로 애매하다. replace옵션은 왼쪽 , 를 오른쪽 " "으로 변경해준다.
        // 정보를 다 입력하고 변수에 담아준 뒤
        // 저장해준다. 새로운정보이기때문에.
        const stock = new Stock({
            name: "삼성전자",
            date: date,
            price: Number(price.replaceAll(",",""))
        }) 
        await stock.save()

        console.log(`날짜:${date}, 가격:${price}`)
    }
   
    

    
    
    await browser.close()
}

statrCrawling()

// await browser.close() 마지막에는 브라우저를 종료한다.
// 전과 같이 동일하게 주소를 복사해서 붙여준다.
// 바디 자식으로 테이블이 있는데 iframe은 바디자식으로 테이블이 존재하지 않는다.
// iframe 안에 html 새문서 안에 다른곳에 있다. 
// 찾는방법은? Iframe안에 들어가서 찾아온다.
// page.frames()을 입력하고 찾는다 .find((el) => el.url) -> .includes(iframe주소)
// 반복문을 이용해 지속적으로 크롤링을 할 수 있다.