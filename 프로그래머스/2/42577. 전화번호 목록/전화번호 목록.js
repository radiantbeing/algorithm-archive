function solution(phoneBook) {
    const phoneBookMap = {};
    
    for (const phone of phoneBook) {
        phoneBookMap[phone] = true;
    }
    
    for (let len = 1; len <= 20; len++) {
        for (const phone of phoneBook) {
            if (phone.length <= len)
                continue;
            
            const sliced = phone.slice(0, len);
            if (phoneBookMap[sliced] === true)
                return false;
        }
    }
    
    return true;
}