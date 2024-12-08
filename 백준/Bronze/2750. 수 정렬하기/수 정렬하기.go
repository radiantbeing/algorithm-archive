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
	return strings.TrimSpace(line)
}

func readInt(reader *bufio.Reader) int {
	num, _ := strconv.Atoi(readLine(reader))
	return num
}

func main() {
	reader := bufio.NewReader(os.Stdin)
	writer := bufio.NewWriter(os.Stdout)
	defer writer.Flush()
	
	N := readInt(reader)
	numbers := make([]int, N)
	
	for i := 0; i < N; i++ {
		numbers[i] = readInt(reader)
	}
	
	for i := 0; i < N; i++ {
		for j:= 0; j < N - i - 1; j++ {
			if numbers[j] > numbers[j + 1] {
				numbers[j], numbers[j + 1] = numbers[j + 1], numbers[j]
			}
		}
	}

	for i := 0; i < N; i++{
		fmt.Fprintln(writer, numbers[i])
	}
}
