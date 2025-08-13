import sys
import math
import heapq

input = sys.stdin.readline
print = sys.stdout.write

nr_vertices, nr_edges = map(int, input().split())
start_vertex = int(input())

graph = [[] for _ in range(nr_vertices + 1)]
visited = [False] * (nr_vertices + 1)
distance = [math.inf] * (nr_vertices + 1)

pq = []

distance[start_vertex] = 0
heapq.heappush(pq, (0, start_vertex))

for _ in range(nr_edges):
    u, v, w = map(int, input().split())
    graph[u].append((v, w))

while len(pq) > 0:
    curr_distance, curr_nr = heapq.heappop(pq)
    visited[curr_nr] = True
    for next_nr, next_weight in graph[curr_nr]:
        if not visited[next_nr] and distance[next_nr] > distance[curr_nr] + next_weight:
            distance[next_nr] = distance[curr_nr] + next_weight
            heapq.heappush(pq, (distance[next_nr], next_nr))

for i in range(1, nr_vertices + 1):
    if math.isinf(distance[i]):
        print("INF\n")
    else:
        print(f"{distance[i]}\n")
