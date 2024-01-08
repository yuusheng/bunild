#!/usr/bin/env bun

import getPort, { portNumbers } from 'get-port'

export async function main() {
  const port = await getPort({ port: portNumbers(5000, 6000) })

  const base = process.cwd()
  const ROUTE_REG = /https?:\/\/[^:\/]*(:[0-9]*)?\/(?<route>.*)/
  const server = Bun.serve({
    port,
    async fetch(request) {
      console.log(request.url)
      const route = request.url.match(ROUTE_REG)?.groups?.route

      switch (route) {
        case 'index.html': {
          const html = await Bun.file('index.html').text()
          return new Response(html, { headers: { 'content-type': 'text/html' } })
        }
        case 'index.tsx': {
          const jsx = await Bun.build({ entrypoints: ['index.tsx'] })

          return new Response(jsx.outputs[0])
        }
        default:
          return new Response('Bun!')
      }
    },
  })

  console.log(`Listening on http://localhost:${server.port} ...`)
}

main()
