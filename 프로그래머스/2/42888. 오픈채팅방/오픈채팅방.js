const ENTER = 'Enter';
const LEAVE = 'Leave';
const CHANGE = 'Change';

function solution(record) {
    const answer = [];
    
    const history = [];
    const user = {};
    
    for (const operation of record) {
        const [opcode, uid, name] = operation.split(' ');
        if (opcode === ENTER) {
            history.push({
                opcode,
                uid,
            });
            user[uid] = name;  
        } else if (opcode === LEAVE) {
            history.push({
                opcode,
                uid,
            })
        } else if (opcode === CHANGE) {
            user[uid] = name;
        }
    }
    
    for (const { opcode, uid } of history) {
        if (opcode === 'Enter') {
            answer.push(`${user[uid]}님이 들어왔습니다.`);
        } else if (opcode === 'Leave') {
            answer.push(`${user[uid]}님이 나갔습니다.`);
        }
    }
    
    return answer;
}