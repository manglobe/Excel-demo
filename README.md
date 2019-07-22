# Simple Excel

## Project Usage

#### local start

```bash
yarn start
```

#### project build

```bash
yarn build
```

### online view

https://manglobe.github.io/Excel-demo/build

## Support Feature

- column & row sort
- cell edit
- cell calculate

## Feature Usage

#### column & row sort

- start sort: click target column or row's table header
- sort order: normal[`default`] => ascending => descending

#### cell edit

- start edit: doubleClick cell
- confirm: cell blur & keydown enter
- cancel: keydown esc

#### cell calculate

- start calculate: enter word and start with `=`
- support Operator:

  | operator | descirption    | example   |
  | -------- | -------------- | :-------- |
  | +        | addition       | 2+1 => 3  |
  | -        | subtraction    | 2-1 => 1  |
  | \*       | multiplication | 2\*1 => 2 |
  | /        | division       | 4/2 => 2  |
  | ^        | exponentiation | 4^2 => 16 |

- need enter `=` as string: start with `'=`

## File Structure

```

|-- Excel-DEMO
    |-- .gitignore
    |-- package.json
    |-- README.md
    |-- tsconfig.json
    |-- yarn.lock
    |-- build // parsed codes
    |-- public // static html
    |   |-- favicon.ico
    |   |-- index.html
    |   |-- manifest.json
    |-- src // sourse codes
        |-- App.css
        |-- App.test.tsx
        |-- App.tsx
        |-- index.css
        |-- index.tsx
        |-- react-app-env.d.ts
        |-- serviceWorker.ts
        |-- components // 组件
        |   |-- Cell
        |   |   |-- Cell.module.css
        |   |   |-- Cell.tsx
        |   |   |-- index.tsx
        |   |-- SortCell
        |   |   |-- index.tsx
        |   |   |-- SortCell.module.css
        |   |   |-- SortCell.tsx
        |   |-- Table
        |       |-- index.tsx
        |       |-- Table.module.css
        |       |-- Table.tsx
        |-- tools // 工具函数
            |-- createGrid.ts
            |-- sortGrid.ts
            |-- strEval.ts
```
