import sys

input = sys.stdin.readline

number_nr = int(input())
numbers = list(map(int, input().split()))

numbers.sort()

good_num_nr = 0

for target_i in range(0, number_nr):
    target_v = numbers[target_i]
    start_i = 0
    end_i = number_nr - 1
    while start_i < end_i:
        start_v = numbers[start_i]
        end_v = numbers[end_i]
        sum = start_v + end_v
        if start_i == target_i or sum < target_v:
            start_i += 1
            continue
        elif end_i == target_i or sum > target_v:
            end_i -= 1
            continue
        else:
            good_num_nr += 1
            break

print(good_num_nr)
