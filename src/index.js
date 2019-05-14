const filesystem = require('./filesystem')
const demo = require('./demo')

if (location.pathname === '/') demo()
else if (location.pathname === '/filesystem.html') filesystem()
else console.error('unexpected pathname')
