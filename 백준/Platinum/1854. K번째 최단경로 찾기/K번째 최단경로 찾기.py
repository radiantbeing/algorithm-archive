import sys
import heapq

input = sys.stdin.readline
print = sys.stdout.write

nr_vertices, nr_edges, k = map(int, input().split())

graph = [[] for _ in range(nr_vertices + 1)]
distance = [[sys.maxsize] * k for _ in range(nr_vertices + 1)]

pq = []

distance[1][0] = 0
heapq.heappush(pq, (0, 1))

for _ in range(nr_edges):
    u, v, w = map(int, input().split())
    graph[u].append((v, w))

while len(pq) > 0:
    curr_distance, curr_nr = heapq.heappop(pq)
    for next_nr, next_weight in graph[curr_nr]:
        if distance[next_nr][k - 1] > curr_distance + next_weight:
            distance[next_nr][k - 1] = curr_distance + next_weight
            distance[next_nr].sort()
            heapq.heappush(pq, (curr_distance + next_weight, next_nr))

for i in range(1, nr_vertices + 1):
    if distance[i][k - 1] == sys.maxsize:
        print("-1\n")
    else:
        print(f"{distance[i][k - 1]}\n")
