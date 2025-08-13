import sys

input = sys.stdin.readline

number_count, update_count, sum_calc_count = map(int, input().split())
numbers = []

for _ in range(number_count):
    numbers.append(int(input()))

tree_height = 0

while True:
    if 2**tree_height < number_count:
        tree_height += 1
    else:
        break

def convert_nr(index):
    return index - 1 + 2**tree_height

def update(element_nr, value):
    diff = value - tree[element_nr]
    tree[element_nr] = value
    parent = element_nr // 2
    while parent > 0:
        tree[parent] += diff
        parent = parent // 2

def calc_sum(start_nr, end_nr):
    result = 0
    while start_nr <= end_nr:
        if start_nr % 2 == 1:
            result += tree[start_nr]
        if end_nr % 2 == 0:
            result += tree[end_nr]
        start_nr = (start_nr + 1) // 2
        end_nr = (end_nr - 1) // 2
    return result

tree = [0] * 2**(tree_height + 1)

for i in range(number_count):
    tree[2**tree_height + i] = numbers[i]

for i in range(2**tree_height):
    j = 2**tree_height - 1 - i
    tree[j] = tree[j * 2] + tree[j * 2 + 1]

for _ in range(update_count + sum_calc_count):
    opcode, operand_one, operand_two = map(int, input().split())
    if opcode == 1:
        update(convert_nr(operand_one), operand_two)
    if opcode == 2:
        print(calc_sum(convert_nr(operand_one), convert_nr(operand_two)))
