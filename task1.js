const array = [1, 2, 5, 7, 7, 11, 12, 11, 1, 12];

function findUnique(arr) {
    return [... new Set(arr).values()];
}

function findUnique2(arr) {
    return arr.reduce((acc, item)=>{
        if (!acc.includes(item)) {
            acc.push(item)
        }
        return acc
    } ,[])
}

console.log(findUnique(array));
console.log(findUnique2(array));