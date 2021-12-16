const stepPrices = {
  100: 40,
  300: 60,
  500: 80,
  1000: 120,
  1500: 150 
}

function calculateInShort(price, end, step){
  do {
    price += step;
  } while (price<end);
  return price;
}


function calcMinPrice(price, stepPrices, rivalryPrice){
  const keys = Object.keys(stepPrices);
  const values = Object.values(stepPrices);

  for (let i = 0; i < (keys.length-1); i++) {
    if(keys[i+1]<rivalryPrice){
      price = calculateInShort(price, keys[i+1], values[i]);
    }
    else{
      price = calculateInShort(price, rivalryPrice, values[i]);
    }
  }
  return price
}

console.log(calcMinPrice(210, stepPrices, 1200));