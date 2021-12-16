const calendar = [
    false, // tương đương với ngày 0
    false, // tương đương với ngày 1
    true,  // tương đương với ngày 2
    true,  // tương đương với ngày 3
    false, // tương đương với ngày 4
    false, // tương đương với ngày 5
    true,  // tương đương với ngày 6
    false, // tương đương với ngày 7
    true,  // tương đương với ngày 8
    true   // tương đương với ngày 9
];

function calcDeadline(manday, calendar){
    let check = calendar.map((element, index)=>{
        if(element==true){
            return index;
        }
        }).filter(element => element!=undefined);
    console.log(check);

    if(manday <= check.length){
        return check[manday-1];
    }else{
        return false;
    }
}

let manday = 4;
let checkDeadline = calcDeadline(manday, calendar);
console.log(checkDeadline);