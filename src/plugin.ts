import * as kebabCase from 'lodash/kebabCase';
import buttons from './ui/buttons';
import contextToolbar from './ui/context-toolbar';

const plugin = (editor: any, url: String) => {

    buttons.register(editor);
    contextToolbar.register(editor);
};

export default plugin;
