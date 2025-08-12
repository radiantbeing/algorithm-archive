import sys
from collections import deque

input = sys.stdin.readline
print = sys.stdout.write

nr_vertices, nr_edges, entry_vertex = map(int, input().split())

visited = [False] * (nr_vertices + 1)
graph = [[] for _ in range(nr_vertices + 1)]

for _ in range(nr_edges):
    u, v = map(int, input().split())
    graph[u].append(v)
    graph[v].append(u)

for i in range(1, nr_vertices + 1):
    graph[i].sort()

def dfs(curr_vertex):
    for next_vertex in graph[curr_vertex]:
        if not visited[next_vertex]:
            visited[next_vertex] = True
            print(f"{next_vertex} ")
            dfs(next_vertex)

visited[entry_vertex] = True
print(f"{entry_vertex} ")
dfs(entry_vertex)

print("\n")
visited = [False] * (nr_vertices + 1)

def bfs():
    queue = deque()
    queue.append(entry_vertex)
    visited[entry_vertex] = True

    while len(queue) > 0:
        curr_vertex = queue.popleft()
        print(f"{curr_vertex} ")

        for next_vertex in graph[curr_vertex]:
            if not visited[next_vertex]:
                visited[next_vertex] = True
                queue.append(next_vertex)

bfs()
