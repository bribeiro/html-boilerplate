# HAUS JavaScript Styleguide

This document is loosely based upon Github's [Idiomatic.js](https://github.com/rwldrn/idiomatic.js).

### All code in any code-base should look like a single person typed it, no matter how many people contributed.

> "Arguments over style are pointless. There should be a style guide, and you should follow it."
> 
> _Rebecca_ _Murphey_

&nbsp;

> "Part of being a good steward to a successful project is realizing that writing code for yourself is a Bad Idea™. If thousands of people are using your code, then write your code for maximum clarity, not your personal preference of how to get clever within the spec."
> 
> _Idan_ _Gazit_

## Table of Contents

 * [Whitespace](#whitespace)
 * [Beautiful Syntax](#spacing)
 * [Type Checking](#type)
 * [Conditional Evaluation](#cond)
 * [Practical Style](#practical)
 * [Naming](#naming)
 * [Misc](#misc)
 * [Native & Host Objects](#native)
 * [Comments](#comments)
 * [One Language Code](#language)

## Preface

The following sections outline a _reasonable_ style guide for modern JavaScript development and are not meant to be prescriptive. The most important take-away is the **law of code style consistency**. Whatever you choose as the style for your project should be considered law.


<a name="whitespace"></a>
## 1. Whitespace

- **Never mix spaces and tabs.**
- When beginning a project, before any code is written, the project lead chooses between soft indents (spaces) or real tabs. Consider this **law**.
- If your editor supports it, always work with the "show invisibles" setting turned on. The benefits of this practice are:
	- Enforced consistency
	- Eliminating end of line whitespace
	- Eliminating blank line whitespace
	- Commits and diffs that are easier to read
- Follow English language conventions where appropriate. E.g., punctuation (comma, colon, semicolon etc.) is followed by a space, but not preceeded by one.

Conditionals and Loops:

- Keywords are followed by a space.
- Opening brace is not followed by a space.
- Closing brace is not preceeded by a space.
- Opening curly brace is preceeded by a space.

```javascript
if (condition) {
    // statements
}

for (var i = 0; i < 100; i++) {
    // statements
}
```

Expressions:

```javascript
var num = (a + 10) * 3;
```


<a name="spacing"></a>
## 2. Beautiful Syntax

### A. Parens, Braces, Linebreaks

	- Always use curly braces, even if you don't have to (single statement after if/while/for/..).
	- Opening curly brace appears on the same line.
	- Closing curly brace appears by itself on a new line.

```javascript
if (condition) {
    // statements
}

while (condition) {
    // statements
}

for (var i = 0; i < 100; i++) {
    // statements
}

if (condition) {
    // statements
} else {
    // statements
}

function hello(argument) {
    // statements
}
```

### B. Declarations, Assignments, Functions (Named, Expression, Constructor)

Variable declarations:

Variables should be declared at the very top of their respective scope, although there might be exceptions from this rule. Declare variables where it makes sense, but try not to scatter them around too much. Loop iterators (i, j, ...) might be declared inline, when appropriate. Read up on variable hoisting.

```javascript
var foo = "bar",
    num = 1,
    bool = true;

// OR:

var foo = "bar";
var num = 1;
var bool = true;
```

Object literals:

```javascript
var obj = {};
var arr = [];
```

Named function declarations:

```javascript
function square(num) {
    return num * num;
}

// Usage:
square(10);
```

Callbacks:

```javascript
function square(num, callback) {
    callback(num * num);
}

// Usage:
square(10, function(result) {
    // callback statements
});
```

Function expressions:

```javascript
var square = function(num) {
    return num * num;
};
```

Function expressions with identifier:

This preferred form has the added value of being able to call itself and have an identity in stack traces.

```javascript
var factorial = function factorial(num) {
    if (num < 2) {
        return 1;
    }
    return num * factorial(num - 1);
};
```

Constructor declarations:

```javascript
function FooBar(options) {
    this.options = options || {};
}

// Usage
var fooBar = new FooBar({ a: "alpha" });
```

Function call examples:

```javascript
foo(10);
foo("bar");
foo("bar1", "bar2");
foo([ "bar1", "bar2" ]);
foo({ a: "bar1", b: "bar2" });
foo({
    a: "bar1",
    b: "bar2",
    c: "bar3"
});
foo(function(result, options) {
	// callback statements
});
```

### C. Consistency Always Wins

In sections 2.A and 2.B above, the whitespace rules are set forth as a recommendation with a simpler, higher purpose: consistency. It's important to note that formatting preferences, such as "inner whitespace" should be considered optional, but only one style should exist across the entire source of your project.

### E. Quotes

Whether you prefer single or double shouldn't matter, there is no difference in how JavaScript parses them. What ABSOLUTELY MUST be enforced is consistency. Never mix quotes in the same project. Pick one style and stick with it. We recommend using double quotes.

### F. End of Lines and Empty Lines

Whitespace can ruin diffs and make changesets impossible to read. Consider incorporating a pre-commit hook that removes end-of-line whitespace and blanks spaces on empty lines automatically. Most modern editors can be set up to automatically remove trailing whitespace automatically on file save.

