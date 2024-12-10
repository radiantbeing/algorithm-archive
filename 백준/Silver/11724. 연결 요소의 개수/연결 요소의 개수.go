package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func readLine(r *bufio.Reader) string {
	line, _ := r.ReadString('\n')
	return line
}

func readInts(r *bufio.Reader) []int {
	tokens := strings.Fields(readLine(r))
	ints := make([]int, len(tokens))
	for i, v := range tokens {
		ints[i], _ = strconv.Atoi(v)
	}
	return ints
}

func dfs(now int, graph *[][]int, visited *[]bool) {
	(*visited)[now] = true
	for _, next := range (*graph)[now] {
		if !(*visited)[next] {
			dfs(next, graph, visited)
		}
	}
}

func main() {
	r := bufio.NewReader(os.Stdin)
	w := bufio.NewWriter(os.Stdout)
	defer w.Flush()

	params := readInts(r)
	n, m := params[0], params[1]

	graph := make([][]int, n+1)
	visited := make([]bool, n+1)

	for i := 0; i < m; i++ {
		params = readInts(r)
		s, e := params[0], params[1]
		graph[s] = append(graph[s], e)
		graph[e] = append(graph[e], s)
	}
	
	count := 0

	for i := 1; i <= n; i++ {
		if (!visited[i]) {
			count++
			dfs(i, &graph, &visited)
		}
	}

	fmt.Fprintln(w, count)
}
