M, N = map(int, input().split())


def sieve_of_eratosthenes(n):  # 에라토스테네스의 체
    sieve = [True] * (n + 1)
    sieve[0] = False
    sieve[1] = False

    for i in range(2, int(n ** 0.5) + 1):
        if sieve[i] == True:
            for j in range(i+i, n + 1, i):
                sieve[j] = False

    return [i for i in range(2, n + 1) if sieve[i] == True]


prime_nums = sieve_of_eratosthenes(N)

for n in prime_nums:
    if n < M:
        continue
    print(n)
