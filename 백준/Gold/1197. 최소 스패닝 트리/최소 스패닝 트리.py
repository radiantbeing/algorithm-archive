import sys
import heapq

input = sys.stdin.readline
vertex_count, edge_count = map(int, input().split())

edges = []
parent = [i for i in range(vertex_count + 1)]

for _ in range(edge_count):
    s, e, w = map(int, input().split())
    heapq.heappush(edges, (w, s, e))

def find(a):
    if parent[a] == a:
        return a
    parent[a] = find(parent[a])
    return parent[a]

def union(a, b):
    parent[find(a)] = find(b)

used_edge_count = 0
weight_sum = 0

while used_edge_count < vertex_count - 1:
    weight, start, end = heapq.heappop(edges)
    if find(start) != find(end):
        union(find(start), find(end))
        weight_sum += weight
        used_edge_count += 1

print(weight_sum)
