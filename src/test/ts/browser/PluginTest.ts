import { Pipeline } from '@ephox/agar';
import { TinyLoader } from '@ephox/mcagar';
import { UnitTest } from '@ephox/bedrock';
import Plugin from '../../../main/ts/Plugin';

// This an example of a browser test of the editor.
UnitTest.asynctest('browser.PluginTest', (success, failure) => {
  Plugin();

  TinyLoader.setup((editor, onSuccess, onFailure) => {

    Pipeline.async({}, [
    ], onSuccess, onFailure);
  }, {
    plugins: 'cks_imagetools',
    toolbar: ''
  }, success, failure);
});
