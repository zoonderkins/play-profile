const filesystem = require('./filesystem')
const demo = require('./demo')

if (location.pathname === '/' || location.pathname === '/index.html') demo()
else if (location.pathname === '/filesystem.html') filesystem()
else console.error('unexpected pathname')
