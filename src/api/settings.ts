/**
 * Settings.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 *
 * Modification: It changed 'imagetools_toolbar' to 'cks_imagetools_toolbar'.
 */

const getToolbarItems = (editor): string => {
    return editor.getParam('cks_imagetools_toolbar', 'small middle large original');
};

export {
    getToolbarItems
};