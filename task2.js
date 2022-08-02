const array = [ 2, 1, 3, 5 ];

function findMissing(arr) {
    const arrClone = [...arr].sort();
    for (let i = 0; i< arrClone.length; i++) {
        const rightValue = i + 1;
        if (rightValue!== arrClone[i]) {
            return rightValue;
        }
    }
}

function findMissing2(arr) { //no sort used
    const arrClone = [...arr];
    arrClone.unshift(null);
    for (let i = 1; i < arrClone.length; i++) {
        if (!arrClone.includes(i)) {
            return i;
        }
    }
}

console.log(findMissing(array));
console.log(findMissing2(array));