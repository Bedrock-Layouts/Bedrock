# `@bedrock-layout/center`

A layout helper component that centers the content

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

---

## When to Use

Use the `Center` component when you want to center the content and clamp it at the desired width, and can also center the children and text alignment.

---

## How to install

`npm install @bedrock-layout/center`

or

`yarn add @bedrock-layout/center`

---

## Usage

```javascript
import { Center } from "@bedrock-layout/center";

<Center>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</Center>;
```

---

## data-attribute

For styling purposes, you can select `data-br-center`.

---

## API

|    Property    |            Description            |      Type      |     Default     |
| :------------: | :-------------------------------: | :------------: | :-------------: |
|    maxWidth    |     Max width of the content      | number, string | medium (1023px) |
|   centerText   |       Center align the text       |    boolean     |      false      |
| centerChildren | Center align the child components |    boolean     |      false      |
