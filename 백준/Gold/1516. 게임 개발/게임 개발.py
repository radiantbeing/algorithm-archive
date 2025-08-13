import sys
from collections import deque

input = sys.stdin.readline

nr_buildings = int(input())

build_time = [0] * (nr_buildings + 1)
total_build_time = [0] * (nr_buildings + 1)
graph = [[] for _ in range(nr_buildings + 1)]
indegree = [0] * (nr_buildings + 1)

for i in range(1, nr_buildings + 1):
    input_list = list(map(int, input().split()))
    build_time[i] = input_list[0]
    for j in range(1, len(input_list) - 1):
        graph[input_list[j]].append(i)
        indegree[i] += 1

queue = deque()

for i in range(1, nr_buildings + 1):
    if indegree[i] == 0:
        queue.appendleft(i)

while len(queue) > 0:
    curr_node = queue.popleft()
    for next_node in graph[curr_node]:
        if indegree[next_node] > 0:
            indegree[next_node] -= 1
            if indegree[next_node] == 0:
                queue.append(next_node)
        total_build_time[next_node] = max(
            total_build_time[next_node],
            total_build_time[curr_node] + build_time[curr_node]
        )

for i in range(1, nr_buildings + 1):
    print(total_build_time[i] + build_time[i])
