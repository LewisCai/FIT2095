console.log('FIT2095');
console.log('Student Name');

var today = new Date();
var dd = today.getDate();

var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
console.log('the date is:'+dd+'/'+mm+'/'+yyyy);

console.log(today.toLocaleString());

/**
 * To count the number of occurences of a particular element in the array
 * @param {*} ar 
 * @param {*} elem 
 * @returns 
 */
function count(ar, elem){
    let counter=0;
    for(let i=0;i<ar.length;i++){
        if(ar[i]===elem)
            counter++;
    }
    return counter;
}
var array=[1,6,3,8,9,2,1,6,1];
console.log(count(array,1));    


/**
 * To count the number of occurences of each element in the array
 * @param {*} arr 
 */
function count(arr){
const counts = {};

for (const num of arr) {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
}
Object.keys(counts).forEach(key => console.log(key+"-->"+counts[key]))
}
const arr = [5, 5, 5, 2, 2, 2, 2, 2, 9, 4];
count(arr);