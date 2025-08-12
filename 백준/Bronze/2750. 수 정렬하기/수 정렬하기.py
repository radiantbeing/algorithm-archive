import sys
input = sys.stdin.readline


def selection_sort(A, N):
    for i in range(N - 1):
        min_index = i
        for j in range(i + 1, N):
            if A[j] < A[min_index]:
                min_index = j
        A[i], A[min_index] = A[min_index], A[i]
    return A


N = int(input())
A = [0] * N
for i in range(N):
    A[i] = int(input())
result = selection_sort(A, N)
for i in result:
    print(i)
