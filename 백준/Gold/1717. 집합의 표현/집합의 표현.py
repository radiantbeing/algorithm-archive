import sys

input = sys.stdin.readline
print = sys.stdout.write

N, M = map(int, input().split())
A = [x for x in range(N + 1)]

def find(v):
    if A[v] == v:
        return v
    대표노드 = find(A[v])
    A[v] = 대표노드
    return 대표노드

def union(u, v):
    대표노드1 = find(u)
    대표노드2 = find(v)
    A[대표노드2] = 대표노드1

for _ in range(M):
    명령, 노드1, 노드2 = map(int, input().split())

    if 명령 == 0: # union
        union(노드1, 노드2)
    elif 명령 == 1: # find
        if find(노드1) == find(노드2):
            print("YES\n")
        else:
            print("NO\n")
        

