// blocking
 const fs = require('fs/promises')
 const path = require("path")


 const read = async () => {
    result = fs.readFile(path.join(__dirname, 'Package.json'), 'utf8')
    console.log(result)
    return result
 }

 read().then(f => console.log(f))
console.log('hi')
