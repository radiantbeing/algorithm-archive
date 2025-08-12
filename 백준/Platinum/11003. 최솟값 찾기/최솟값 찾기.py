import sys
from collections import deque

input = sys.stdin.readline
print = sys.stdout.write

number_nr, window_size = map(int, input().split())
numbers = list(map(int, input().split()))

slider = deque()

for i in range(number_nr):
    if len(slider) > 0 and slider[0][0] <= i - window_size:
        slider.popleft()
    while len(slider) > 0 and slider[-1][1] > numbers[i]:
        slider.pop()
    slider.append((i, numbers[i]))
    print(f"{slider[0][1]} ")
