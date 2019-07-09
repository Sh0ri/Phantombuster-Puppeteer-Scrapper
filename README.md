# Scrapping script (Phantom!)

Phantom capable of gathering various datas on all the restaurants of the result page of [TheFork.com](https://www.lafourchette.com/restaurant+paris). It is all written in TypeScript.

Disclaimer : does not work with the Phantombuster platform yet since theFork protects its pages with a reCaptcha and I wasn't able to solve it yet :).

## Quickstart

### Requirements
- Phantombuster account [(sign up there)](https://phantombuster.com)
  - API Key (```create a phantombuster.cson file to the project root```)
  - phantombuster-sdk (available [here](https://www.npmjs.com/package/phantombuster-sdk))
- NodeJS, downloadable [here](https://nodejs.org/en/)
- NPM, downloadable [here](https://www.npmjs.com/)
- TypeScript compiler ```npm install -g typescript```

### Installation
Once these requirements are met, you can clone the repository and start your own project !

```bash
git git@github.com:stressGC/Phantombuster-Puppeteer-Scrapper.git <localName>
cd <localName>
npm install
```

## Roadmap
I would like to pass the reCaptcha protection in order to put this project live on the Phantombuster platform ! For the moment, the scrapping script works just fine :)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

If you have any question regarding this repository, please contact me on [LinkedIn](https://www.linkedin.com/in/georges-cosson/).

## Author
**Georges Cosson** : [LinkedIn](https://www.linkedin.com/in/georges-cosson/) - [GitHub](https://github.com/stressGC)

## Licence

MIT License, Copyright (c) 2019 G. Cosson

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
