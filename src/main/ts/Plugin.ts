import Buttons from './ui/Buttons';
import Commands from './api/Commands';
import ContextToolbar from './ui/ContextToolbar';

declare const tinymce: any;

const setup = (editor, url) => {
  Commands.register(editor);
  Buttons.register(editor);
  ContextToolbar.register(editor);
};

tinymce.PluginManager.add('cks_imagetools', setup);

// tslint:disable-next-line:no-empty
export default () => {};
