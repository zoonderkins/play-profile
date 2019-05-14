module.exports = () => {

  const mount_url = new URL('./filesystem.html', location).href

  document.body.innerHTML = `<div>
    <h1>demo: ${location.pathname}</h1>
    <iframe></iframe>
    <div id="log"></div>
  </div>`

  const iframe = document.querySelector('iframe')
  const log = document.querySelector('#log')
  const parser = document.createElement('div')

  iframe.style = 'border: 2px red solid; width: 500px; height: 500px;'
  iframe.onload = send
  iframe.src = mount_url

  let message, channel
  let obj = { name: "Jack" }

  onmessage = ({ source, data }) => {
    if (source !== channel) return
    console.log('data', data)
    parser.innerHTML = `<pre>[filesystem] ${data}</pre>`
    log.appendChild(parser.children[0])
  }

  function send (e) {
    if (!channel) channel = iframe.contentWindow
    // Save object to subdomain / inner Iframe
    channel.postMessage(JSON.stringify({ key: 'storage', method: "set", data: obj }), "*")
  }

  setTimeout(() => {
    // console.log(channel.postMessage)
    channel.postMessage(JSON.stringify({ key: 'storage', method: 'get' }), "*")
  }, 2000)

  // Load previous saved iframe localstorage data
  // Load
  // setTimeout(() => {
  //   divData.innerHTML = ({ ...localStorage }) != null ? JSON.stringify({ ...localStorage }) : "No data"
  // }, 2000);
}
