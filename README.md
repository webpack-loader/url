[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][test]][test-url]
[![coverage][cover]][cover-url]
[![code style][style]][style-url]
[![chat][chat]][chat-url]

<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
  <h1>URL/File Loader</h1>
  <p>Emits/Inlines the imported file and to return its (public) URL</p>
</div>

<h2 align="center">Install</h2>

```bash
npm i -D @webpack-loader/url
```

<h2 align="center"><a href="https://webpack.js.org/concepts/loaders">Usage</a></h2>

By default the filename of the resulting file is the MD4 hash of the file's contents with the original extension of the required resource.

```js
import img from './file.png'
```

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: '@webpack-loader/url',
            options: {}  
          }
        ]
      }
    ]
  }
}
```

Emits `file.png` as file in the output directory and returns the public URL

```
"/public/path/0dcbbaa7.png"
```

<h2 align="center">Options</h2>

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**[`name`](#name)**|`{String\|Function}`|`[hash].[ext]`|Configure a custom filename template for your file|
|**[`regExp`](#regexp)**|`{RegExp}`|`undefined`|Extract some parts of the file path to reuse them in the `name` property|
|**[`limit`](#limit)**|`{String\|Number}`|`undefined`|Byte limit to inline files as Data URL|
|**[`context`](#context)**|`{String}`|`this.rootContext`|Configure a custom file context, defaults to `webpack.config.js` [context](https://webpack.js.org/configuration/entry-context/#context)|
|**[`publicPath`](#publicpath)**|`{String\|Function}`|[`__webpack_public_path__ `](https://webpack.js.org/api/module-variables/#__webpack_public_path__-webpack-specific-)|Configure a custom `public` path for your file|
|**[`outputPath`](#outputpath)**|`{String\|Function}`|`undefined`|Configure a custom `output` path for your file|

### `name`

You can configure a custom filename template for your file using the query parameter `name`. For instance, to copy a file from your `context` directory into the output directory retaining the full directory structure, you might use

#### `{String}`

**webpack.config.js**
```js
{
  loader: '@webpack-loader/url',
  options: {
    name: '[path][name].[ext]'
  }  
}
```

#### `{Function}`

**webpack.config.js**
```js
{
  loader: '@webpack-loader/url',
  options: {
    name (file) {
      if (env === 'development') {
        return '[path][name].[ext]'
      }

      return '[hash].[ext]'
    }
  }  
}
```

### `regExp`

Defines a `regExp` to match some parts of the file path. These capture groups can be reused in the `name` property using `[N]` placeholder. Note that `[0]` will be replaced by the entire tested string, whereas `[1]` will contain the first capturing parenthesis of your regex and so on...

```js
import img from './customer01/file.png'
```

**webpack.config.js**
```js
{
  loader: '@webpack-loaders/url',
  options: {
    regExp: /\/([a-z0-9]+)\/[a-z0-9]+\.png$/,
    name: '[1]-[name].[ext]'
  }  
}
```

```
customer01-file.png
```

#### `placeholders`

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`[ext]`**|`{String}`|`file.extname`|The extension of the resource|
|**`[name]`**|`{String}`|`file.basename`|The basename of the resource|
|**`[path]`**|`{String}`|`file.dirname`|The path of the resource relative to the `context`|
|**`[hash]`**|`{String}`|`md4`|The hash of the content, hashes below for more info|
|**`[N]`**|`{String}`|`undefined`|The `n-th` match obtained from matching the current file name against the `regExp`|

#### `hashes`

`[<type>:hash:<digest>:<length>]` optionally you can configure

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`type`**|`{String}`|`md4`|`md4`, `md5`, `sha1`, `sha256`, `sha512`|
|**`digest`**|`{String}`|`hex`|`hex`, `base64`|
|**`length`**|`{Number}`|`8`|The length in chars|

By default, the path and name you specify will output the file in that same directory and will also use that same URL path to access the file

### `limit`

If the file size is greater than the specified `limit` (in bytes) the file is added as an asset to the `module` (`module.assets`) and emitted as a separate file (`compilation.assets`). The `limit` can be specified via loader options and defaults to no `limit`. If the file size is smaller then the `limit` the file contents are exported as a `base64` encoded Data URL (e.g `"export default "data:image/png;base64,iVBORw0KGgoAAAA..."`)

**webpack.config.js**
```js
{
  loader: '@webpack-loader/url',
  options: {
    limit: 10000
  }  
}
```

### `context`

**webpack.config.js**
```js
{
  loader: '@webpack-loader/url',
  options: {
    name: '[path][name].[ext]',
    context: ''
  }  
}
```

You can specify custom `output` and `public` paths by using `outputPath`, `publicPath` and `useRelativePath`

### `publicPath`

**webpack.config.js**
```js
{
  loader: '@webpack-loader/url',
  options: {
    name: '[path][name].[ext]',
    publicPath: 'assets/'
  }  
}
```

### `outputPath`

**webpack.config.js**
```js
{
  loader: '@webpack-loader/url',
  options: {
    name: '[path][name].[ext]',
    outputPath: 'images/'
  }  
}
```

<h2 align="center">Examples</h2>


```js
import png from 'image.png'
```

**webpack.config.js**
```js
{
  loader: '@webpack-loader/url',
  options: {
    name: 'dirname/[hash].[ext]'
  }  
}
```

```
dirname/0dcbbaa7.png
```

**webpack.config.js**
```js
{
  loader: '@webpack-loader/url',
  options: {
    name: '[sha512:hash:base64:7].[ext]'
  }  
}
```

```
gdyb21L.png
```

```js
import png from 'path/to/file.png'
```

**webpack.config.js**
```js
{
  loader: '@webpack-loader/url',
  options: {
    name: '[path][name].[ext]?[hash]'
  }  
}
```

```
path/to/file.png?e43b20c0
```


[npm]: https://img.shields.io/npm/v/@webpack-loader/url.svg
[npm-url]: https://npmjs.com/package/@webpack-loader/url

[node]: https://img.shields.io/node/v/@webpack-loader/url.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack-loader/url.svg
[deps-url]: https://david-dm.org/webpack-loader/url

[test]: http://img.shields.io/travis/webpack-loader/url.svg
[test-url]: https://travis-ci.org/webpack-loader/url

[cover]: https://img.shields.io/coveralls/github/webpack-loader/url.svg
[cover-url]: https://coveralls.io/github/webpack-loader/url

[style]: https://img.shields.io/badge/code%20style-standard-yellow.svg
[style-url]: http://standardjs.com/

[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
