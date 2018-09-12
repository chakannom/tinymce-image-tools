/**
 * Buttons.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 *
 * Modification: It changed the buttons.
 */

const register = function (editor) {
    editor.addButton('small', {
        title: 'Small',
        text: 'Small',
        cmd: 'cksImageSmallSizing'
    });

    editor.addButton('middle', {
        title: 'Middle',
        text: 'Middle',
        cmd: 'cksImageMiddleSizing'
    });

    editor.addButton('large', {
        title: 'Large',
        text: 'Large',
        cmd: 'cksImageLargeSizing'
    });

    editor.addButton('original', {
        title: 'Original',
        text: 'Original',
        cmd: 'cksImageOriginalSizing'
    });
};

export default {
    register
};