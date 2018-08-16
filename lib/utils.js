var fs = require('fs');
var path = require('path');
var atom = require('atom');
var _ = require('underscore');
function getExtension(s) {
  let b = s.substr(s.indexOf('<%//extension:') + '<%//extension:'.length)
  return `.${b.substr(0, b.indexOf('%>'))}`
}
function saveToFile(editor) {
  const URI = editor.getURI();
  const basename = path.basename(URI, '.tpl');
  const dirname = path.dirname(URI);
  // console.log("basename",basename)
  // console.log("dirname",dirname)
  // console.log("filePath",filePath)
  // console.log("editor",editor)
  fs.readFile(URI,'utf-8',function(err1,data1){
    const ext = getExtension(data1)
    const filePath = `${dirname}\\${basename}${ext}`;
    if(err1){
      throw err1
      // atom.notifications.addError('error', {detail: err1, dismissable: true});
    }else{
      if(data1){
        try {
          let templateFn = _.template(data1)
          const content = templateFn({})
          // console.log("content",content);
          fs.writeFile(filePath,content,function(err2){
            if (err2) {
              // atom.notifications.addError('error', {detail: err2, dismissable: true});
              throw err2
              return
            }
          })
        } catch (e) {
          console.error(e)
          throw e
          // debugger
          // atom.notifications.addError('error', {detail: e.toString(), dismissable: true});
        }
      }
    }
  });
}
module.exports = {
  saveToFile
}
