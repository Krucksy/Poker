# FNIF

*Functional if*

Simple functional if statement also known as branch


## Examples

__Simple__

```javascript
const $if = require("fnif")

const i = 10

$if(i > 5, () =>
{
    console.log("It is greater than 5 !")
})
```


__Complete__

```javascript
const $if = require("fnif")

const i = 10

$if(i > 5, () =>
{
    console.log("It is greater than 5 !")
}, () =>
{
    console.error("Oh no ! it isn't greater than 5")
})
```


__Actual use case__

```javascript
const $if = require("fnif")

const age = 16

const denomination = $if(age >= 18, () => "major", () => "minor")
```


__Nesting__

```javascript
const $if = require("fnif")

const age = 16

const denomination = $if(age >= 18,
    () => "major",
    () => $if(age >= 16,
        () => "not too young",
        () => "minor"))
```


Please report any issues on [Github](https://github.com/ScottishCyclops/fnif/issues) ! Thanks
