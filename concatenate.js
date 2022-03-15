const fs = require('fs-extra');
const concat = require('concat');

concatenate = async () =>{
    const files = [
        './dist/digitale-rapport-editor/runtime.js',
        './dist/digitale-rapport-editor/polyfills.js',
        './dist/digitale-rapport-editor/scripts.js',
        './dist/digitale-rapport-editor/main.js'
    ];

    await fs.ensureDir('output');
    await concat(files, 'output/rapport-element.js');
}
concatenate();
