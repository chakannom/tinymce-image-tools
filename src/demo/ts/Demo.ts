import Plugin from '../../main/ts/Plugin';

declare let tinymce: any;

Plugin();

tinymce.init({
  selector: 'textarea.tinymce',
  plugins: 'image preview cks_imagetools',
  toolbar: 'image preview',
  height : '500px',
  object_resizing : false,
  cks_image_params: {
    imgproxy_url: 'http://localhost:9001',
    imgproxy_key: '3a8f347756fa5013430a1a3d0ebe2ad6',
    imgproxy_salt: '19b63d683008e7b88bb4427d9c0b45b3'
  }
});
