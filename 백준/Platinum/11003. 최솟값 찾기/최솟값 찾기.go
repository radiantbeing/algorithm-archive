package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func readLine(reader *bufio.Reader) string {
	line, _ := reader.ReadString('\n')
	return line
}

func readIntArray(reader *bufio.Reader) []int {
	tokens := strings.Fields(readLine(reader))
	ints := make([]int, len(tokens))
	for i, v := range tokens {
		num, _ := strconv.Atoi(v)
		ints[i] = num
	}
	return ints
}

func main() {
	reader := bufio.NewReader(os.Stdin)
	writer := bufio.NewWriter(os.Stdout)
	defer writer.Flush()

	params := readIntArray(reader)
	N, L := params[0], params[1]
	numbers := readIntArray(reader)

	queue := make([][2]int, 0)

	for i := 0; i < N; i++ {
		for len(queue) > 0 && queue[0][0] < i-L+1 {
			queue = queue[1:]
		}
		for len(queue) > 0 && queue[len(queue)-1][1] > numbers[i] {
			queue = queue[:len(queue)-1]
		}
		queue = append(queue, [2]int{i, numbers[i]})
		fmt.Fprintf(writer, "%d ", queue[0][1])

		if i % 1000 == 0 {
			writer.Flush()
		}
	}

}
