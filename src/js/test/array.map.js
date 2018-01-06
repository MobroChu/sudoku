const array = Array.from({ length: 9 }, () => { 
    const array = new Array(9); 
    array.fill(0); return array; 
});
array.map(row => row.map((v, i) => i))
    .map(row => {
        const endIndex = row.length - 2;
        for (let i = 0; i <= endIndex; i++) {
            const j = i + Math.floor(Math.random() * (row.length - i));
            [row[i], row[j]] = [row[j], row[i]];
        }
        return row;
    });

console.log(array);


////////////////////////////////////////////////////////////////

const array1 = (Array.from({ length: 9 }, () => { 
    const array = new Array(9); 
    array.fill(0); return array; 
})).map(row => row.map((v, i) => i))
    .map(row => {
        const endIndex = row.length - 2;
        for (let i = 0; i <= endIndex; i++) {
            const j = i + Math.floor(Math.random() * (row.length - i));
            [row[i], row[j]] = [row[j], row[i]];
        }
        return row;
    });

console.log(array1);