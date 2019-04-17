const express = require('express')
const currency = require('./function')
const port = process.env.PORT || 8080;


const hbs = require('hbs')


var app = express()

var text = '';


app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'))

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('message', (text) => {
	return text.toUpperCase();
});

app.use('/currency', (request, response, next) => {
	currency.getInfo(20, 'USD', 'PLN', 'CAD').then((status) =>{
		text = status;
	}).catch((error) => {
		text = 'Unable to convert the currency';
	});
	next()
})

/*hbs.registerHelper('link', () => {
	var all_links = new Array('/', '/currency', '/info')
	var currenct_link = window.location.pathname
	var show_links = all_links.slice(currenct_link).map(() => {
		return `<a href=${value}>${value}</a>`
	})
	return show_lins;
});*/

//app.get('/', (request, response) => {
//	response.send('<a href="/info">About Me</a> <a href="/currency">Currency Convert</a>')

//})

app.get('/', (request, response) => {
	response.render('home.hbs', {
		title: 'Home Page',
		welcome: 'Hello!',
	})
})

app.get('/currency', (request, response) => {
	response.render('currency.hbs', {
		title: 'Currency Converter',
		//year: new Date().getFullYear(),
		welcome: 'Hello!',
		rate: text
	})
})

app.get('/info', (request, response) => {
	response.render('about.hbs', {
		title: 'About page',
		//year: new Date().getFullYear(),
		welcome: 'Hello!'
	})
})

app.get('/404', (request, response) => {
	response.send({
		error:'Page not found'
	})
})
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

