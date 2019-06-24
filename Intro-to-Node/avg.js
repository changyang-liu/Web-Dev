function avg(arr){
    return arr.reduce((total, num) => total + num, 0)/arr.length;
}

console.log(avg([1,2,3,4,6,6]));