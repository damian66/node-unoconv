# node-unoconv
Lightweight NodeJS wrapper for unoconv, a Universal Office Converter.

![npm](https://img.shields.io/npm/v/node-unoconv)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/node-unoconv)
![npm](https://img.shields.io/npm/dm/node-unoconv)

## 📦 Installation

### ⚙️ Required dependencies

The node-unoconv package requires [unoconv](https://github.com/unoconv/unoconv) and its dependencies to be installed. 

#### Installing LibreOffice or OpenOffice software

Office software is required to run [unoconv](https://github.com/unoconv/unoconv). LibreOffice is recommended but OpenOffice is still supported.

- ##### LibreOffice installation

  Please see official installation instructions on the LibreOffice website.  
  https://www.libreoffice.org/get-help/install-howto/

  Use command below to install LibreOffice inside Docker container:
  ```
  RUN apt-get -y install libreoffice
  ```
  
- ##### OpenOffice installation

  Please see official installation instructions on the OpenOffice website.  
  https://www.openoffice.org/download/common/instructions.html

### ⚙️ Installing node-unoconv package

After you install required dependencies, the node-unoconv package can be installed using commands below:
```bash
npm install node-unoconv

# or using yarn

yarn add node-unoconv
```

## 📃 Usage

There are few ways to import node-unoconv package to your NodeJS project:

#### ES6
```js
// ES6 import
import unoconv from 'node-unoconv';

unoconv.convert(input, options?); // Converting a file
unoconv.listen(options?); // Starting a conversion listener
```
```js
// Using named exports
import { convert, listen } from 'node-unoconv';

convert(input, options?); // Converting a file
listen(options?); // Starting a conversion listener
```

#### Require
```js
// Using Require
const unoconv = require('node-unoconv');

unoconv.convert(input, options?); // Converting a file
unoconv.listen(options?); // Starting a conversion listener
```
```js
// Alternative way to require convert or listen methods
const { convert, listen } = require('node-unoconv');

convert(input, options?); // Converting a file
listen(options?); // Starting a conversion listener
```

### Converting files

Converts an input file to a format specified in options object (defaults to pdf). By default, a promise is returned that resolves with a buffer or rejects with an error message. A callback function is also supported.  
  
```javascript
// Convert a file using a promise
unoconv.convert('file.doc')
  .then((buffer) => {
    console.log(buffer.length);
  }.catch((err) => {
    console.error(err);
  });
  
// or with async/await

const buffer = await unoconv.convert('file.doc');
```

Conversion with an output path and a callback
```javascript
const callback = (path, error) => {
  if (error) {
    console.error('Error', error);
    return;
  }
  
  console.log('Path:', path);
};

const options = {
  callback,
  output: 'file.pdf'
};
unoconv.convert(path);
```

### Starting a listener

Starts a standalone LibreOffice or OpenOffice listener.  
If **server** or **port** options are not specified, it uses defaults values *127.0.0.1* and *2002*.

```javascript
unoconv.listen();
```  

#### Starting a listener on a different address and port
```javascript
const options = {
  port: 2003,
  server: '127.0.0.1'
};

unoconv.listen(options);
```

## 🛠 Options

| Option                     | Type   | Default     | Description |
| -------------------------- | ------ | ----------- | ----------- |
| **connection**             | string |             | UNO connection string to be used by the client to connect to an LibreOffice instance, or used by the listener to make LibreOffice listen.
| **output**                 | string | `output`    | Output basename, filename or directory.
| **doctype**                | string | `document`  | Specify the LibreOffice document type of the backend format. Possible document types are: document, graphics, presentation, spreadsheet.
| **password**               | string |             | Provide a password to decrypt the document.
| **server**                 | string | `127.0.0.1` | Server (address) to listen on (as listener) or to connect to (as client).
| **port**                   | number | `2002`      | Port to listen on (as listener) or to connect to (as client).
| **pipe**                   |        |             | Use a pipe as an alternative connection mechanism to talk to LibreOffice.
| **export**                 | string |             | Set specific export filter options (related to the used LibreOffice filter).
| **field**                  | string |             | Replace user-defined text field with value.
| **format**                 | string | `pdf`       | Specify the output format for the document. You can get a list of possible output formats per document type by using the --show option. Default document type is 'pdf'.
| **import**                 | string | `utf-8`     | Set specific import filters options (related to the used LibreOffice import filter based on the input filename).
| **importFilterName**       | string | `xml`       | Set import filter name, useful when converting stdin or files without an extension).
| **listener**               | bool   | `false`     | Start unoconv as listener for unoconv clients to connect to. It's recommended to start the listener with `listen()` method.
| **disableHtmlUpdateLinks** | bool   | `false`     | Disables the recheck for updating links missed by libreoffice
| **noLaunch**               | bool   | `false`     | By default if no listener is running, unoconv will launch its own (temporary) listener to make sure the conversion works. This option will abort the conversion if no listener is found, rather than starting our own listener.
| **preserve**               | bool   | `false`     | Keep timestamp and permissions of the original document.
| **printer**                | string |             | Printer options<br/> - PaperFormat: specify printer paper format, eg. `PaperFormat=A3`<br/>- PaperOrientation: specify printer paper orientation, eg. `PaperOrientation=landscape`<br/>- PapserSize: specify printer paper size, paper format should set to USER, size=widthxheight, e.g. eg. `PaperSize=130x200` means width=130, height=200

#### List of available options with its arguments passed to [unoconv](https://github.com/unoconv/unoconv).
```js
{
  connection: '-c',
  disableHtmlUpdateLinks: '--disable-html-update-links',
  doctype: '-d',
  export: '-e',
  field: '-F',
  format: '-f',
  import: '-i',
  importFilterName: '-I',
  listener: '-l',
  noLaunch: '-n',
  output: '-o',
  password: '--password',
  pipe: '--pipe',
  port: '-p',
  preserve: '--preserve',
  printer: '--printer',
  server: '--server',
  show: '--show',
  stdin: '--stdin',
  stdout: '--stdout',
  template: '-t',
  timeout: '-T',
  unsafeQuietUpdate: '--unsafe-quiet-update',
  userProfile: '--user-profile',
  verbose: '--verbose',
};
```
