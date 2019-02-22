/**
 * Commands.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

import actions from '../core/actions';

declare var tinymce: any;

const register = function (editor) {
    tinymce.each({
        cksImageSmallSizing: actions.resizing(editor, 200),
        cksImageMiddleSizing: actions.resizing(editor, 320),
        cksImageLargeSizing: actions.resizing(editor, 400),
        cksImageOriginalSizing: actions.resizing(editor, 1600)
    }, function (fn, cmd) {
        editor.addCommand(cmd, fn);
    });
};

export default {
    register
};