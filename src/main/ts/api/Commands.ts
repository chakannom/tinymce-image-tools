/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */

import Actions from '../core/Actions';

declare var tinymce: any;

const register = function (editor) {
  tinymce.each({
    cksImageSmallSizing: Actions.resizing(editor, 200),
    cksImageMiddleSizing: Actions.resizing(editor, 320),
    cksImageLargeSizing: Actions.resizing(editor, 400),
    cksImageOriginalSizing: Actions.resizing(editor, 1600)
  }, function (fn, cmd) {
    editor.addCommand(cmd, fn);
  });
};

export default {
  register
};