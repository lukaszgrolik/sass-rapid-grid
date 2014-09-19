# Sass-rapid-grid

Sass-rapid-grid, based on [Sass](https://github.com/nex3/sass), is another approach to creating CSS grids.

### Features:

- creates **as many grids as you want** - sometimes project requires more than one version of grid system (e.g. various amount of needed columns, various gutters' widths, responsive-breakpoints' widths)
- generates optimized CSS with appropriate class names, ready to **instant** use

### Requirements

Sass 3.2.0+

## Installation

### Bower

- Terminal: `bower install sass-rapid-grid`
- SCSS: `@import 'path/to/bower_components/sass-rapid-grid/rapid-grid';`

### Vanilla Sass

- Copy `_rapid-grid.scss` into your project
- SCSS: `@import 'path/to/rapid-grid';`

## Getting started

1. Init:

   ```scss
   @include rapid-grid(row, col, (row-1 3 5% 720px));
   ```

2. Use generated HTML classes:

   ```html
   <div class="row row-1">
      <div class="col col-1-3"><!-- ... --></div>
      <div class="col col-2-3"><!-- ... --></div>
   </div>
   ```

## More advanced example

```scss
   @include rapid-grid(
      row, col,
      (
         some-row 3 0 320px,
         other-row 12 0 480px,
         with-gutters 3 2% 720px,
         some-other-gutters-2 6 5% 1024px
      )
  );
```

```html
<div class="row some-row">
   <div class="col col-1-3"><!-- ... --></div>
   <div class="col col-1-3"><!-- ... --></div>
   <div class="col col-1-3"><!-- ... --></div>
</div>

<div class="row other-row">
   <div class="col col-1-2"><!-- ... --></div>
   <div class="col col-1-3"><!-- ... --></div>
   <div class="col col-1-6"><!-- ... --></div>
</div>

<div class="row with-gutters">
   <div class="col col-1-2"><!-- ... --></div>
   <div class="col col-1-2"><!-- ... --></div>
</div>

<div class="row some-other-gutters">
   <div class="col col-1-6"><!-- ... --></div>
   <div class="col col-1-2"><!-- ... --></div>
   <div class="col col-1-3"><!-- ... --></div>
</div>
```

## Reference

### *rapid-grid()* mixin

```scss
@include rapid-grid(row-name, col-name, grid-definition-list);
```
- `row-name` - *string* - base rows' class name
- `col-name` - *string* - base columns' class name
- `grid-definition-list` - contains single or multiple *Grid Definitions*.

### *Grid Definition*

`row-name number-of-columns gutter-width breakpoint-width`

- `row-name` - *string* - specific rows' class name
- `number-of-columns` - *number* (unitless) - maximum number of available columns
- `gutter-width` - *number* (percentages only)
- `breakpoint-width` - *number* - a width below which columns are positioned one below another

## License

Sass-rapid-grid is released under the MIT License.

```
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
