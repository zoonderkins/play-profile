(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
const filesystem = require('./filesystem')
const demo = require('./demo')

if (location.pathname === '/' || location.pathname === '/index.html') demo()
else if (location.pathname === '/filesystem.html') filesystem()
else console.error('unexpected pathname')

},{"./demo":1,"./filesystem":2}]},{},[3]);
