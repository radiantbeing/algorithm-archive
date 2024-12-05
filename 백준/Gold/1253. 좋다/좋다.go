package main

import (
	"bufio"
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

func readLine(reader *bufio.Reader) string {
	line, _ := reader.ReadString('\n')
	line = strings.TrimSpace(line)
	return line
}

func readInt(reader *bufio.Reader) int {
	num, _ := strconv.Atoi(readLine(reader))
	return num
}

func readIntArray(reader *bufio.Reader) []int {
	fields := strings.Fields(readLine(reader))
	numbers := make([]int, len(fields))
	for i, v := range fields {
		num, _ := strconv.Atoi(v)
		numbers[i] = num
	}
	return numbers
}

func main() {
	reader := bufio.NewReader(os.Stdin)
	writer := bufio.NewWriter(os.Stdout)
	defer writer.Flush()

	N := readInt(reader)
	numbers := readIntArray(reader)

	sort.Ints(numbers)

	count := 0

	for i := 0; i < N; i++ {
		target := numbers[i]
		left := 0
		right := N - 1

		for left < right {
			if i == left {
				left++
				continue
			}
			if i == right {
				right--
				continue
			}
			sum := numbers[left] + numbers[right]
			if sum < target {
				left++
			} else if sum > target {
				right--
			} else {
				count++
				break
			}
		}
	}

	fmt.Fprint(writer, count)
}
