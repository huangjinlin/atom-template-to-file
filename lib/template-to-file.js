'use babel';

import { CompositeDisposable } from 'atom';

let utils
function getUtils () {
  if (!utils) utils = require('./utils')
  return utils
}

function isTplFile (editor) {
  // console.log('getGrammar', editor.getGrammar())
  // console.log('scopeName', editor.getGrammar().scopeName)
  const URI = editor.getURI()
  // console.log("URI",URI)
  if(URI != undefined) {
    const ext = URI.substr(URI.lastIndexOf('.'))
    return ['.tpl'].includes(ext)
  }else {
    return false
  }
}

export default {

  subscriptions: null,

  activate(state) {
    console.log("template-to-file.activate")
    this.subscriptionByURL = new Map()
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'template-to-file:toggle': () => this.toggle()
    }));

    this.subscriptions.add(
      atom.workspace.observeTextEditors(editor => {
        if (!isTplFile(editor)) return
        editor.onDidSave(()=>{
          // console.log("onDidSave")
          getUtils().saveToFile(editor)
        })
      })
    );
  },

  deactivate() {
    // console.log("template-to-file.deactivate")
    this.subscriptions.dispose()
    this.subscriptionByURL.forEach(disposable => disposable.dispose())
    this.subscriptionByURL.clear()
  },

  toggle() {
  }

};
