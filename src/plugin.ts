import * as kebabCase from 'lodash/kebabCase';
import commands from "./api/commands";
import buttons from './ui/buttons';
import contextToolbar from './ui/context-toolbar';

const plugin = (editor: any, url: String) => {

    commands.register(editor);
    buttons.register(editor);
    contextToolbar.register(editor);
};

export default plugin;
