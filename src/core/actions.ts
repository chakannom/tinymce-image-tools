/**
 * Actions.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 *
 * Modification: It modified 'isEditableImage' function.
 */

const isEditableImage = function (editor, img) {
    const selectorMatched = editor.dom.is(img, 'img:not([data-mce-object],[data-mce-placeholder])');

    return selectorMatched;
};

export default {
    isEditableImage
};