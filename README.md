# rollup-plugin-reference-module

Get module reference, a url to the find bundled module, so you can use it in iframe or worker.

## Usage

```javascript
import someModuleURL from 'REF:./path/to/someModule';

// use it in worker
const worker = new Worker(someModuleURL);

// inject is into iframe
const iframeDoc = document.getElementById('iframe').contentDocument;
const script = iframeDoc.createElement('script');
script.src = someModuleURL;
iframeDoc.body.append(script);
```
