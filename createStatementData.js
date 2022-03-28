class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance
    this.play = aPlay
  }

  get volumeCredits () {
    return Math.max(this.performance.audience - 30, 0)
  }

  get amount() {
    throw new Error('서브클래스 전용 메서드입니다.')
  }
}

class TradegyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000
    if (this.performance.audience > 30) result += 1000 * (this.performance.audience - 30)
    return result
  }
}
class ComedyCalculator extends PerformanceCalculator {
  //여기서부터 get volumnCredits() {}
  get amount() {
    let result = 30000
    if (this.performance.audience > 20) result += 10000 + 500 * (this.performance.audience - 20)
    result += 300 * this.performance.audience
    return result
  }
}

const createPerformanceCalculator = (aPerformance, aPlay) => {
  switch (aPlay.type) {
    case 'tragedy': return new TradegyCalculator(aPerformance, aPlay)
    case 'comedy': return new ComedyCalculator(aPerformance, aPlay)
    default: return PerformanceCalculator(aPerformance, aPlay)
  }
}

const createStatementData = (invoice, plays) => {
  const playFor = aPerformance => plays[aPerformance.playID]

  const enrichPerformance = aPerformance => {
    const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance))
    const result = {...aPerformance}
    result.play = calculator.play 
    result.amount = calculator.amount
    result.volumeCredits = calculator.volumeCredits 
    return result
  }
  const totalAmount = performances => performances.reduce((total,p) => total + p.amount,0)

  const totalVolumeCredits = performances=> performances.reduce((total,p) => total + p.volumeCredits,0)

  const enrichedPerformances = invoice.performances.map(enrichPerformance)
  return {
    customer: invoice.customer,
    performances: enrichedPerformances,
    totalAmount: totalAmount(enrichedPerformances),
    totalVolumeCredits : totalVolumeCredits(enrichedPerformances)
  }
}

export default createStatementData