const MAX_ORDER = 26;

function solution(skill, skill_trees) {
    let answer = 0;
    
    for (const skillTree of skill_trees) {
        const order = {};
        
        for (let i = 0; i < skillTree.length; i++) {
            order[skillTree[i]] = i;
        }
        
        let lastOrder = -1;
        let isValidSkillTree = true;
        for (const s of skill) {
            if (order[s] === undefined) order[s] = MAX_ORDER;
            if (lastOrder > order[s]) {
                isValidSkillTree = false;
                break;
            }
            lastOrder = order[s];
        }
        
        if (isValidSkillTree) answer++;
    }
    
    return answer;
}