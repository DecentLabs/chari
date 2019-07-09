const fs = require('fs')
const path = require('path')
const yargs = require('yargs')
const args = yargs.option('output', {
    alias: 'o',
    describe: `extracted abi's output`,
    default:'./'
  })
  .help()
  .argv

const {_:files, output} = args

if(!fs.existsSync(output)) {
  fs.mkdirSync(output,{recursive: true})
}


files.forEach(file => {
  try {
    const filename = path.basename(file)
    const fileContent = fs.readFileSync(file)
    const data = JSON.parse(fileContent)
    fs.writeFileSync(path.resolve(output,filename), JSON.stringify(data.abi))
  } catch ( error ) {
    console.error(error)
  }
})
