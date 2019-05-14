module.exports = () => {

  const filesystem = new URL('./filesystem.html', location).href
  document.body.innerHTML = `<div>
    <h1>demo2</h1>
    <iframe src=${filesystem}></iframe>
  </div>`

}
