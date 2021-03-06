/**
 * CaretContainerInput.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * This module shows the invisble block that the caret is currently in when contents is added to that block.
 */
define(
  'tinymce.core.caret.CaretContainerInput',
  [
    'ephox.katamari.api.Fun',
    'tinymce.core.caret.CaretContainer'
  ],
  function (Fun, CaretContainer) {
    var findBlockCaretContainer = function (editor) {
      return editor.dom.select('*[data-mce-caret]')[0];
    };

    var removeIeControlRect = function (editor) {
      editor.selection.setRng(editor.selection.getRng());
    };

    var showBlockCaretContainer = function (editor, blockCaretContainer) {
      if (blockCaretContainer.hasAttribute('data-mce-caret')) {
        CaretContainer.showCaretContainerBlock(blockCaretContainer);
        removeIeControlRect(editor);
        editor.selection.scrollIntoView(blockCaretContainer);
      }
    };

    var handleBlockContainer = function (editor, e) {
      var blockCaretContainer = findBlockCaretContainer(editor);

      if (!blockCaretContainer) {
        return;
      }

      if (e.type === 'compositionstart') {
        e.preventDefault();
        e.stopPropagation();
        showBlockCaretContainer(blockCaretContainer);
        return;
      }

      if (CaretContainer.hasContent(blockCaretContainer)) {
        showBlockCaretContainer(editor, blockCaretContainer);
      }
    };

    var setup = function (editor) {
      editor.on('keyup compositionstart', Fun.curry(handleBlockContainer, editor));
    };

    return {
      setup: setup
    };
  }
);