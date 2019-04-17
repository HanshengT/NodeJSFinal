const axios = require('axios');

const getConvert = (base, symbol_1, symbol_2) => {
	return new Promise((resolve, reject) => {
		const data = axios.get(`https://api.exchangeratesapi.io/latest?base=${base}&symbols=${symbol_1},${symbol_2}`)
		.then((result) => result.data.rates)
		if (data) {
			resolve(data);
		} else {
			reject(`Unable to convert the currency for ${base}`)
		}
	})
}

const getCountries = async(base) => {
	const counties = await axios.get(`https://restcountries.eu/rest/v2/currency/${base}`)
	return new Promise((resolve, reject) => {
		resolve(counties.data);
	})
}

const getInfo = async(amount, base, symbol_1, symbol_2) => {
	const currency = await getConvert(base, symbol_1, symbol_2);
	const countrise = await getCountries(base);

	if (typeof amount != 'number'){
		return `Amount has to be a number`
	}
	let a_1 = Math.round(currency[symbol_1] * amount)
	let a_2 = Math.round(currency[symbol_2] * amount)
	let c = countrise.map((country) => country.name)
	.reduce((a, b) => a + b)

	return `	${amount} ${base} is worth ${a_1} ${symbol_1} / ${a_2} ${symbol_2}.\n You can spend it in the following countries: ${c}`
}

module.exports = {
	getInfo
}