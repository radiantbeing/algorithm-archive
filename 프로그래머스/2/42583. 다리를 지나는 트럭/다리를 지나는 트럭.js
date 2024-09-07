function solution(bridgeLength, bridgeWeight, truckWeights) {
    const bridge = [];
    
    let totalLength = 0;
    let totalWeight = 0;
    let tick = 0;
    
    while (bridge.length > 0 || truckWeights.length > 0) {
        const isCrossed = 
              bridge.length > 0 && 
              tick - bridge[0].tick >= bridgeLength;
        if (isCrossed) {
            const { weight } = bridge.shift();
            totalLength--;
            totalWeight -= weight;
        }
        
        const isCrossing = 
              totalLength + 1 <= bridgeLength && 
              totalWeight + truckWeights[0] <= bridgeWeight;
        if (isCrossing) {
            const weight = truckWeights.shift();
            totalWeight += weight;
            totalLength++;
            bridge.push({ weight, tick });
        }
        
        tick++;
    }
    
    return tick;
}