package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	writer := bufio.NewWriter(os.Stdout)

	line, _ := reader.ReadString('\n')
	line = strings.TrimSpace(line)
	words := strings.Fields(line)

	N, _ := strconv.Atoi(words[0])
	M, _ := strconv.Atoi(words[1])

	line, _ = reader.ReadString('\n')
	line = strings.TrimSpace(line)
	words = strings.Fields(line)

	numbers := make([]int, N)

	for i, v := range words {
		numbers[i], _ = strconv.Atoi(v)
	}

	prefixSum := make([]int, N)
	prefixSum[0] = numbers[0]

	for i := 1; i < N; i++ {
		prefixSum[i] = prefixSum[i-1] + numbers[i]
	}
	
	for i := 0; i < M; i++ {
		line, _ = reader.ReadString('\n')
		line = strings.TrimSpace(line)
		words = strings.Fields(line)

		s, _ := strconv.Atoi(words[0])
		e, _ := strconv.Atoi(words[1])
		s = s - 1
		e = e - 1
		
		if s-1 < 0 {
			fmt.Fprintln(writer, prefixSum[e])
		} else {
			fmt.Fprintln(writer, prefixSum[e]-prefixSum[s-1])
		}
	}

	writer.Flush()
}
