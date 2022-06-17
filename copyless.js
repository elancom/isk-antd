const fs = require("fs");

async function run() {
  let src = __dirname + `/src/layouts/Home.module.less`;
  let dest = __dirname + `/lib/layouts/Home.module.less`;
  fs.copyFileSync(src, dest)
  console.log('copy less ok')
}

;(async () => run())()
