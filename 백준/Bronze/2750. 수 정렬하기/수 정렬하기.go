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
	
	sort.Ints(numbers)

	for i := 0; i < N; i++{
		fmt.Fprintln(writer, numbers[i])
	}
}
