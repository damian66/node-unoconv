# node-unoconv
NodeJS wrapper for unoconv.

## Usage

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
  
// or using await keyword

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