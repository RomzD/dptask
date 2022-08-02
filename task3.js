var someList = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: {
                value: 4,
                next: null
            }
        }
    }
}

function reversePrint(linkedList) {
    const  extractLinkedListVal = (reversedValues, list) => {
        const currentList = [...reversedValues, list.value];
        return list.next ? extractLinkedListVal(currentList, list.next) : currentList;
    }

    const extractedValues = extractLinkedListVal([], linkedList);
    for (let i = extractedValues.length - 1; i >= 0; i--) {
        console.log(extractedValues[i]);
    }
}

reversePrint(someList);