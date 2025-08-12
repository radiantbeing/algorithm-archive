def sum(numbers):
    result = 0
    for number in numbers:
        result += int(number)
    return result

chunks = list(map(lambda x: sum(x.split("+")),input().split("-")))

result = chunks[0]

for i in range(1, len(chunks)):
    result -= chunks[i]

print(result)
