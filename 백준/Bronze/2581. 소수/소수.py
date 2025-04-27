import math

M = int(input())
N = int(input())


def isPrimeNum(num):
    if num == 1:
        return False
    for i in range(2, int(math.sqrt(num)) + 1):
        if num % i == 0:
            return False
    return True


sum = 0
min = math.inf

for i in range(M, N + 1):
    if isPrimeNum(i):
        sum += i
        if i < min:
            min = i

if sum == 0:  # 소수가 없으면
    print(-1)
else:
    print(f"{sum}\n{min}")
