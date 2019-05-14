module.exports = () => {

  document.body.innerHTML = `<div>
    <h1>filesystem: ${location.pathname}</h1>
    <div id="log"></div>
  </div>`

  const log = document.querySelector('#log')
  const parser = document.createElement('div')
  const channel = parent

  onmessage = ({ source, data }) => {
    if (source !== channel) return

    console.log('data', data)
    var payload = JSON.parse(data)
    console.log('payload', payload)

    parser.innerHTML = `<pre>[demo] ${data}</pre>`
    log.appendChild(parser.children[0])

    switch (payload.method) {
      case 'set':
        localStorage.setItem(payload.key, JSON.stringify(payload.data))
        console.log(`Method: ${payload.method} & data: ${JSON.stringify(payload.data)} & KEY: ${JSON.stringify(payload.key)}  `)
        break
      case 'get':
        let data = localStorage.getItem(payload.key)
        console.log(data)
        channel.postMessage(data, "*")
        break
      case 'remove':
        localStorage.removeItem(payload.key)
        console.log('3')
        break
    }
  }

}
