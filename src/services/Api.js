const BASE_URL = 'https://v6.exchangerate-api.com/v6/5c48d0dfdb27217d767c31ce/latest';

export async function exchangeRateApi(fromCurrency) {
    try {
        const response = await fetch(`${BASE_URL}/${fromCurrency}`)
        const data = await response.json()
        return data
    } catch(err) {
        console.log(err)
    }
}


