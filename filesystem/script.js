const messageStatus = {
  SET: 'set',
  GET: 'get',
  REMOVE: 'remove'
}

class Message {
  constructor (payload) {
    this.payload = payload
    data = JSON.parse(this.payload.data)
  }
  // TODO
  /*
  Filter by key, path[0]
  Type: Done --> Todo, Fail --> Todo
  Dynamic from '/' and
  */

  receive () {
    switch (receiveMessage.data) {
      case messageStatus.SET:
        if (receiveMessage.data.path[0].includes('storage')) {
          let d = payload.data
          console.log('d', d)
        }
        localStorage.setItem(payload.key, JSON.stringify(payload.data))
        console.log(
          `Method: ${payload.method} & data: ${JSON.stringify(
            payload.data
          )} & KEY: ${JSON.stringify(payload.key)}  `
        )
        break
      case messageStatus.GET:
        let parent = e.source
        let data = localStorage.getItem(payload.key)
        console.log(data)
        parent.postMessage(data, '*')
        break
      case messageStatus.remove:
        localStorage.removeItem(payload.key)
        console.log('3')
        break
    }
  }
}

export default Message
