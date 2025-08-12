import sys

input = sys.stdin.readline
print = sys.stdout.write

nr_numbers = int(input())
numbers = list(map(int, input().split()))
nr_queries = int(input())
queries = list(map(int, input().split()))

numbers.sort()

def bi_search(target_v):
    start_i = 0
    end_i = nr_numbers - 1

    while start_i <= end_i:
        median_i = (start_i + end_i) // 2
        median_v = numbers[median_i]
        if target_v < median_v:
            end_i = median_i - 1
        elif target_v > median_v:
            start_i = median_i + 1
        else:
            return True

    return False

for query in queries:
    found = bi_search(query)

    if found:
        print("1\n")
    else:
        print("0\n")
