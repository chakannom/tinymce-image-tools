/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */

import * as Settings from '../api/Settings';
import Actions from '../core/Actions';

const register = function (editor) {
  editor.ui.registry.addContextToolbar('cks_imagetools', {
    items: Settings.getToolbarItems(editor),
    predicate: (elem) => Actions.getEditableImage(editor, elem).isSome(),
    position: 'node',
    scope: 'node'
  });
};

export default {
  register
};