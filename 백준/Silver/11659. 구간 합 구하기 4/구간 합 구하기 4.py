import sys

input = sys.stdin.readline

number_nr, query_nr = map(int, input().split())
numbers = [0] + list(map(int, input().split()))

prefix_sum = [0] * (number_nr + 1)

for i in range(1, number_nr + 1):
    prefix_sum[i] = prefix_sum[i - 1] + numbers[i]

for i in range(0, query_nr):
    start, end = map(int, input().split())
    print(prefix_sum[end] - prefix_sum[start - 1])
