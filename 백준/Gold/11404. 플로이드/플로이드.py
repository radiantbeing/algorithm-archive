import sys

input = sys.stdin.readline
print = sys.stdout.write

nr_cities = int(input())
nr_routes = int(input())

distance = [[sys.maxsize for _ in range(nr_cities + 1)] for _ in range(nr_cities + 1)]

for i in range(1, nr_cities + 1):
    distance[i][i] = 0

for _ in range(nr_routes):
    s, e, w = map(int, input().split())
    if distance[s][e] > w:
        distance[s][e] = w

for k in range(1, nr_cities + 1):
    for s in range(1, nr_cities + 1):
        for e in range(1, nr_cities + 1):
            distance[s][e] = min(distance[s][e], distance[s][k] + distance[k][e])

for i in range(1, nr_cities + 1):
    for j in range(1, nr_cities + 1):
        if distance[i][j] == sys.maxsize:
            print("0 ")
        else:
            print(f"{distance[i][j]} ")
    print("\n")
