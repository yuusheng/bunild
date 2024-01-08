const ROUTE_REG = /https?:\/\/[^:\/]*(:[0-9]*)?\/(?<route>.*)/


const res = 'http://localhost:5001/'.match(ROUTE_REG)

console.log(res)