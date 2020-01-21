# chronometric
[![codecov](https://codecov.io/gh/yukipastelcat/chronometric/branch/master/graph/badge.svg)](https://codecov.io/gh/yukipastelcat/chronometric)
![GitHub Workflow Status (master)](https://img.shields.io/github/workflow/status/yukipastelcat/chronometric/CI/master?label=CI%20%28master%29)
![GitHub Workflow Status (develop)](https://img.shields.io/github/workflow/status/yukipastelcat/chronometric/CI/develop?label=CI%20%28beta%29)
![npm](https://img.shields.io/npm/l/chronometric)
![npm](https://img.shields.io/npm/dm/chronometric)

JavaScript library for working with time durations in "1mo 1w 1d" format.

## Install

```shell
$ npm install --save chronometric
```

## CodeSandbox

You can find CodeSandbox template [here](https://codesandbox.io/s/chronometric-basic-sandbox-l5sho)

## Basic usage

### Recommended

```js
import { Chronometric } from 'chronometric';

const chronoA = new Chronometric(2200);
const chronoB = Chronometric.fromString('1w 1d');
const chronoC = new Chronometric({ d: 1, h: 1 });
```

### Via [Node.js](https://nodejs.org/) require()

```js
const { Chronometric } = require('chronometric');

const chronoA = new Chronometric(2200);
const chronoB = Chronometric.fromString('1w 1d');
const chronoC = new Chronometric({ d: 1, h: 1 });
```

### Via [UNPKG](unpkg.com)

```html
<script src="https://unpkg.com/chronometric@latest"></script>
<script>
  const { Chronometric } = window.chronometric;

  const chronoA = new Chronometric(2200);
  const chronoB = Chronometric.fromString('1w 1d');
  const chronoC = new Chronometric({ d: 1, h: 1 });
</script>
```

## Features

### Custom global and instance unit configuration

```js
import { Chronometric } from 'chronometric';

// global configuration
Chronometric.defaultConversionRatios = {
  ms: 1,
  d: 24 * 60 * 60 * 1000
};
console.log(Chronometric.fromString("1d") + 0); // will output 86400000

// instance configuration
const chronoB = new Chrono(
  2200,
  {
    ms: 1,
    s: 1000
  }
);
console.log(chronoB.toString()); // will output "2s 200ms"
```

### Works with JavaScript [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) objects

```js
import { Chronometric } from 'chronometric';

const dateFrom = new Date();
const dateTo = new Date(0);

const chrono = new Chronometric(dateFrom - dateTo); // will contain timespan between dateFrom and dateTo
```

```js
import { Chronometric } from 'chronometric';

const now = Date.now();
const tomorrow = new Date(now + Chronometric.fromString("1d"));
const inAWeek = new Date(now + Chronometric.fromString("1w"));
```

### Worktime units

```js
import {
  Chronometric,
  HOUR_TO_MS_CONVERSION_RATIO,
  MINUTE_TO_MS_CONVERSION_RATIO
} from 'chronometric';

Chronometric.defaultConversionRatios = {
	ms: 1,
  m: MINUTE_TO_MS_CONVERSION_RATIO,
  h: HOUR_TO_MS_CONVERSION_RATIO,
  d: 8 * HOUR_TO_MS_CONVERSION_RATIO, // 8 hour work day
  w: 5 * 8 * HOUR_TO_MS_CONVERSION_RATIO // 5 day work week
};

const spentTime = ["9h 30m", "12h 22m"];
const totalSpentTime = new Chronometric(
  spentTime
  	.reduce((acc, item) => acc + Chronometric.fromString(item), 0)
).toString(); // "2d 5h 52m"
```

## Known issues

+ When using big and small conversion ratios simultaniously (i.e. 1 year and 1 nanosecond to milliseconds) small ones can be lost due to JavaScript number type precision (see [Number.MAX_SAFE_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER))
