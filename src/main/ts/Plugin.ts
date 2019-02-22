import commands from './api/commands';
import buttons from './ui/buttons';
import contextToolbar from './ui/context-toolbar';

declare const tinymce: any;

const setup = (editor, url) => {
    commands.register(editor);
    buttons.register(editor);
    contextToolbar.register(editor);
};

tinymce.PluginManager.add('cks_imagetools', setup);

// tslint:disable-next-line:no-empty
export default () => {};