<!-- not to html -->
# atom-template-to-file

a atom package use undescrore.tempalte transform template file to file when save

# features
- press "ctrl+s" to convert file in same path
- use `<%//extension:txt%>` to assign taragt file extension

## installation

``` bash
apm install markdown-to-html
```
## create
``` bash
# command palette
Ctrl+Shift+P
input "Generate Package"
```

## debug

``` bash
#open devtool
Ctrl+Shift+I
#reload
Ctrl+Shift+F5/window reload(in command pannel)/Ctrl+R(in devtool)
#clear console
Ctrl+L(in devtool)
```
## publish

``` bash
# first time
git tag -a v0.1.0 -m "release 0.1.0 version"
git push origin --tags
apm publish minor
# other time
apm publish minor
```

## resolve problem
1.how to active when init
remove activationCommands in package.json
``` json
"activationCommands": {
  "atom-workspace": "template-to-file:toggle"
},
```
2.`atom.notifications.addError`generate error
```diff
try{

}catch(e){
-  atom.notifications.addError('error', {detail: e.toString(), dismissable: true});
+  throw e
}
```

## refer to
- [atom-markdown-to-html](https://github.com/huangjinlin/atom-markdown-to-html)
