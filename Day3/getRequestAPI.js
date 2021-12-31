import https from 'https'
import axios from 'axios'
import {performance} from 'perf_hooks'
import XLSX from 'xlsx'
import fs from 'fs'

const link = 'https://api.coinstats.app/public/v1/coins?limit=30';

var timeForSaveCSV;
var timeForSaveImage;
var timeForGetRequest = performance.now();

async function main(){
	await axios.get(link)
		.then( saveDataToCSV )
		.then( saveCSV ) 
		.then( saveImage )
		.catch(error=>{console.log(error);});

	console.log(`Time to get request = ${timeForGetRequest}.`);
	console.log(`Time to save csv file = ${timeForSaveCSV}.`);
	console.log(`Time to save image = ${timeForSaveImage}.`);
	console.log(`Summary = ${timeForGetRequest+timeForSaveCSV+timeForSaveImage}`);
}
main();

function saveDataToCSV(response){
	timeForGetRequest = (performance.now() - timeForGetRequest) / 1000;

	let dataFromRequest = JSON.parse(JSON.stringify(response.data));
	const arrayOfCoins = dataFromRequest[Object.keys(dataFromRequest)[0]];

	return arrayOfCoins;
}

function saveCSV(arrayOfCoins){
	timeForSaveCSV = performance.now();

	// process whether value is array
	arrayOfCoins.forEach(element => {
		var arrKeyOfElement = Object.keys(element);
		arrKeyOfElement.forEach(el => {
			if(Array.isArray(element[el])){
				element[el] = element[el].join(', ');
			}
		});
	});
	let ws = XLSX.utils.json_to_sheet(arrayOfCoins);
	let stream = XLSX.stream.to_csv(ws);
	stream.pipe(fs.createWriteStream('output.csv'));

	timeForSaveCSV = (performance.now() - timeForSaveCSV) / 1000;

	return arrayOfCoins;
}

function saveImage(arrayOfCoins){
	timeForSaveImage = performance.now();

	if (!fs.existsSync('images')){
		fs.mkdirSync('images');
	}
	arrayOfCoins.forEach(async el=>{
		let url = el['icon'];
		let name = el['name'];

		https.get(url, (res) => {
			res.pipe(fs.createWriteStream(`images/${name}.jpg`));
		});
	});
	timeForSaveImage = (performance.now() - timeForSaveImage) / 1000;
}

