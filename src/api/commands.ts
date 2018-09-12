import actions from '../core/actions';

declare var tinymce: any;

const register = function (editor) {
    tinymce.each({
        cksImageSmallSizing: actions.resizing(editor, 200),
        cksImageMiddleSizing: actions.resizing(editor, 320),
        cksImageLargeSizing: actions.resizing(editor, 400),
        cksImageOriginalSizing: actions.resizing(editor, -1)
    }, function (fn, cmd) {
        editor.addCommand(cmd, fn);
    });
};

export default {
    register
};
/*
import Tools from 'tinymce/core/api/util/Tools';
import Actions from '../core/Actions';

const register = function (editor, imageUploadTimerState) {
    Tools.each({
        mceImageRotateLeft: Actions.rotate(editor, imageUploadTimerState, -90),
        mceImageRotateRight: Actions.rotate(editor, imageUploadTimerState, 90),
        mceImageFlipVertical: Actions.flip(editor, imageUploadTimerState, 'v'),
        mceImageFlipHorizontal: Actions.flip(editor, imageUploadTimerState, 'h'),
        mceEditImage: Actions.editImageDialog(editor, imageUploadTimerState)
    }, function (fn, cmd) {
        editor.addCommand(cmd, fn);
    });
};

export default {
    register
};
*/