package main

import (
	"os"

	"github.com/rubrical-works/gh-pmu/cmd"
)

func main() {
	if err := cmd.Execute(); err != nil {
		os.Exit(1)
	}
}
