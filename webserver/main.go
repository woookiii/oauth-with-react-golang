package main

import (
	"flag"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

var cfgPath = flag.String("cfg")

func main() {
	r := gin.Default()

	r.Use(cors.Default())

	r.Run()
}
