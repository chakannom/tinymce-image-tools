/**
 * ContextToolbar.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

import { Fun } from '@ephox/katamari';
import * as settings from '../api/settings';
import actions from '../core/actions';

const register = function (editor) {
    editor.addContextToolbar(
        Fun.curry(actions.isEditableImage, editor),
        settings.getToolbarItems(editor)
    );
};

export default {
    register
};