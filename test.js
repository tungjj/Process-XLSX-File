import XLSX from 'xlsx'

//read xlsx and convert to object
let workbook = XLSX.readFile('master.xlsx');
let copyXlsx = JSON.parse(JSON.stringify(workbook.Sheets.Trang_tính1));

//map values
let arrayValues = Object.entries(copyXlsx);
let arrayCell = arrayValues.map(element => element ) ;

arrayCell.shift();          // delete unknown element
arrayCell.pop();            // delete unknown element
let values = arrayCell.map(element => element[1].v);

//slice and show result
let size = 6; let finalResult = [];
for (let i=0; i<values.length; i+=size) {
     finalResult.push(values.slice(i,i+size));
}
finalResult.shift(); // delete unknown element
console.log(finalResult);