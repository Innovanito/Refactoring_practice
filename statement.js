import createStatementData from "./createStatementData.js"

const renderPlainText = (data) => {
  //함수들
  const usd = aNumber => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(aNumber / 100)
  
  //코드 시작
  let result = `청구 내역 (고객명: ${data.customer})\n`
  
  for (let perf of data.performances) {  
    result += `${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`
  }

  result += `총액: ${usd(data.totalAmount)}\n`
  result += `적립 포인트: ${data.totalVolumeCredits}점\n`
  return result
}

const statement = (invoice, plays) => {
  return renderPlainText(createStatementData(invoice, plays))
}

export default statement