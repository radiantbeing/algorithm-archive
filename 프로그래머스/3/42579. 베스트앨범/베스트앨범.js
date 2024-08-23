function solution(genres, plays) {
    const songs = plays
        .map((val, idx) => ({ id: idx, genre: genres[idx], plays: val }));
    
    const playsMap = songs.reduce((map, { genre, plays }) => {
        if (!map[genre]) {
            map[genre] = 0;
        }
        map[genre] += plays;
        return map;
    }, {});
    
    songs.sort((a, b) => playsMap[a.genre] !== playsMap[b.genre] 
        ? playsMap[b.genre] - playsMap[a.genre] 
        : a.plays !== b.plays 
        ? b.plays - a.plays 
        : a.id - b.id
    );
    
    const countMap = {};
    return songs.reduce((answer, { id, genre }) => {
        if (!countMap[genre]) {
            countMap[genre] = 0;
        }
        if (++countMap[genre] <= 2) {
            answer.push(id);
        }
        return answer;
    }, []);
}