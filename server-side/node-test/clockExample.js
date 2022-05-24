const fs = require('fs')
const path = require('path')

/*匹配<style></style>标签内容的正则
  \s:表示空白字符
  \S:表示非空白字符
  *:表示匹配任意次
*/
const regStyle = /<style>[\s\S]*<\/style>/
//匹配<script></script>标签内容的正则
const regScript = /<script>[\s\S]*<\/script>/

fs.readFile(path.join(__dirname, 'assets/index.html'), 'utf8', function (err, res) {
  if (err) return console.log(err)
  resolveHTMLCSSJS(res)
})

let resolveHTMLCSSJS = function (content) {
  let cssContent = regStyle.exec(content)
  let jsContent = regScript.exec(content)
  let htmlContent = content
    .replace(cssContent, '<link rel="stylesheet" type="text/css" href="./clock.css">')
    .replace(jsContent, '<script type="text/javascript" src="./clock.js"></script>')
  cssContent = cssContent[0].replace('<style>', '').replace('</style>', '')
  jsContent = jsContent[0].replace('<script>', '').replace('</script>', '')
  writeFile('css', cssContent)
  writeFile('js', jsContent)
  writeFile('html', htmlContent)
}

let writeFile = function (ext, data) {
  fs.writeFile(path.join(__dirname, `assets/clock.${ext}`), data, 'utf8', function (err) {
    if (err) return console.log(err)
    console.log(`写入${ext}成功`)
  })
}

