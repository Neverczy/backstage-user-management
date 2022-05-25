//methods
//e.g. > to &gt;
/**
 * 将html文本普通字符转换成字符实体
 * @param espaceHTMLText {string} HTML文本字符串
 * @returns {string} 转换成字符实体后的HTML文本字符串
 */
function htmlTextEspace(espaceHTMLText) {
  return espaceHTMLText.replace(/<|>|"|&/g, match => {
    switch (match) {
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '"':
        return '&quot;'
      case '&':
        return '&amp;'
    }
  })
}

/**
 * 将html文本字符实体转换成普通字符
 * @param unespaceHTMLText {string} HTML文本字符串
 * @returns {string} 转换成普通字符后的HTML文本字符串
 */
function htmlTextUnespace(unespaceHTMLText) {
  return unespaceHTMLText.replace(/&lt;|&gt;|&quot;|&amp;/g, match => {
    switch (match) {
      case '&lt;':
        return '<'
      case '&gt;':
        return '>'
      case '&quot;':
        return '"'
      case '&amp;':
        return '&'
    }
  })
}

const _html_ = {
  htmlTextEspace,
  htmlTextUnespace
}

export {_html_};
