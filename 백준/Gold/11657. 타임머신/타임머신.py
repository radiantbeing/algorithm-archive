import sys

input = sys.stdin.readline
print = sys.stdout.write

nr_cities, nr_routes = map(int, input().split())
edges = []
distance = [sys.maxsize] * (nr_cities + 1)

distance[1] = 0

for _ in range(nr_routes):
    edges.append(list(map(int, input().split())))

for _ in range(nr_cities - 1):
    for start, end, weight in edges:
        if distance[start] != sys.maxsize and distance[end] > distance[start] + weight:
            distance[end] = distance[start] + weight

cycle = False

for start, end, weight in edges:
    if distance[start] != sys.maxsize and distance[end] > distance[start] + weight:
        cycle = True
        break

if cycle:
    print("-1")
else:
    for i in range(2, nr_cities + 1):
        if distance[i] == sys.maxsize:
            print("-1\n")
        else:
            print(f"{distance[i]}\n")
