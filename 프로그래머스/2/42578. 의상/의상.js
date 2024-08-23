function solution(clothes) {
    const clothesMap = {};

    clothes.forEach(([name, category]) => {
        if (!clothesMap[category]) {
            clothesMap[category] = [];
        }
        clothesMap[category].push(name);
    })
    
    const cases = Object
        .entries(clothesMap)
        .reduce((cases, [category, clothes]) => cases * (clothes.length + 1), 1);
    return cases - 1; // 어떠한 옷을 고르지 않은 경우의 수 제거
}