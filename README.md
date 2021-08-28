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
