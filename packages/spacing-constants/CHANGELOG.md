# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.1.0](https://github.com/Bedrock-Layouts/Bedrock/compare/@bedrock-layout/spacing-constants@3.0.1...@bedrock-layout/spacing-constants@3.1.0) (2022-12-12)

### Features

- **css:** add gutter: variation ([030d1f2](https://github.com/Bedrock-Layouts/Bedrock/commit/030d1f2b96c215bc730adb39434d033a860f849c))

## [3.0.1](https://github.com/Bedrock-Layouts/Bedrock/compare/@bedrock-layout/spacing-constants@3.0.0...@bedrock-layout/spacing-constants@3.0.1) (2022-11-21)

### Bug Fixes

- **spacing-contants:** fix open-props dependencies ([a116dbe](https://github.com/Bedrock-Layouts/Bedrock/commit/a116dbee22f40ee15b4684b5a5f00efc9fbc8bc0))

# [3.0.0](https://github.com/Bedrock-Layouts/Bedrock/compare/@bedrock-layout/spacing-constants@2.9.0...@bedrock-layout/spacing-constants@3.0.0) (2022-11-21)

### Documentation

- **docs:** update to docs to remove all mention of styled-components ([95e7f10](https://github.com/Bedrock-Layouts/Bedrock/commit/95e7f10043f4bfa4e00e0b131c901b8ac3042ef7))

### Features

- **grid:** move away from styled components ([94ac5be](https://github.com/Bedrock-Layouts/Bedrock/commit/94ac5be75fcca428a30c52a64316c3f8db1721ed))
- **padbox:** remove styled-components dependency ([22bc5d8](https://github.com/Bedrock-Layouts/Bedrock/commit/22bc5d8249833a198e0ed46fd4e49ec0d2d009ed))
- **spacing-constants:** move to new spacing scheme and away from styled-components ([b553a8b](https://github.com/Bedrock-Layouts/Bedrock/commit/b553a8b6b00fdc65538b39170236131f0855c111)), closes [#1541](https://github.com/Bedrock-Layouts/Bedrock/issues/1541)

### BREAKING CHANGES

- **docs:** Styled components is no longer part of the library
- **padbox:** Padbox now depends on @bedrock-layout/css instead of styled-components
- **grid:** Components no longer use styled-components
- **spacing-constants:** The spacing values are now based on open-props sizes and it no longer depends on
  styled-components

# [2.9.0](https://github.com/Bedrock-Layouts/Bedrock/compare/@bedrock-layout/spacing-constants@2.8.4...@bedrock-layout/spacing-constants@2.9.0) (2022-11-11)

### Features

- **css:** publish new css package ([e14a5f5](https://github.com/Bedrock-Layouts/Bedrock/commit/e14a5f5867cb5a65ed84d7086e47ff3a1cc2aafa))

## 2.8.4 (2022-10-11)

**Note:** Version bump only for package @bedrock-layout/spacing-constants

## 2.8.3 (2022-06-10)

### Bug Fixes

- update peer dependencies to include React 18 ([cfdfaed](https://github.com/Bedrock-Layouts/Bedrock/commit/cfdfaedaa950645897cf4466c381a9946153ed3e)), closes [#1321](https://github.com/Bedrock-Layouts/Bedrock/issues/1321)

## [2.8.2](https://github.com/Bedrock-Layouts/Bedrock/compare/@bedrock-layout/spacing-constants@2.8.1...@bedrock-layout/spacing-constants@2.8.2) (2022-04-17)

**Note:** Version bump only for package @bedrock-layout/spacing-constants

## 2.8.1 (2022-04-15)

### Bug Fixes

- **fix in types:** fixing types ([db6417a](https://github.com/Bedrock-Layouts/Bedrock/commit/db6417ac40d8ebc40978007f103c3c1be523a61e))

# 2.8.0 (2022-03-08)

### Features

- **cover:** change cover to use number or CSSlength as Gutter as well ([6768cc4](https://github.com/Bedrock-Layouts/Bedrock/commit/6768cc4662d315989a07ad2a7586167f67a783bb))

# [2.7.0](https://github.com/Bedrock-Layouts/Bedrock/compare/@bedrock-layout/spacing-constants@2.6.0...@bedrock-layout/spacing-constants@2.7.0) (2022-02-09)

### Features

- **spaceing-constants:** add update to CSSlength to allow CSS custom properties ([b9e9849](https://github.com/Bedrock-Layouts/Bedrock/commit/b9e9849dc3db0e695c17c14c99545e96a87ebe61))

# 2.6.0 (2022-02-09)

### Bug Fixes

- **spaceing-constants:** fix regex bug ([bc1246d](https://github.com/Bedrock-Layouts/Bedrock/commit/bc1246d2c9e5202943473b34132d6794381f6216))

### Features

- **spacing-option:** add CSSLength type checking ([b08e2cc](https://github.com/Bedrock-Layouts/Bedrock/commit/b08e2cc959aeeb6f3c4e0f68cd904e5a51eab8db))

## 2.5.1 (2021-11-18)

**Note:** Version bump only for package @bedrock-layout/spacing-constants

# 2.5.0 (2021-11-15)

### Features

- update attribute name ([5b779e2](https://github.com/Bedrock-Layouts/Bedrock/commit/5b779e2d539e94c94464204039126efbb7d12f2c))

## 2.4.3 (2021-11-06)

**Note:** Version bump only for package @bedrock-layout/spacing-constants

## 2.4.2 (2021-09-09)

### Bug Fixes

- **spacers:** remove inherit margin so we don't get inconsistent gutters ([e30c78f](https://github.com/Bedrock-Layouts/Bedrock/commit/e30c78f76eae5bbfd49e61df1cd479501ae0486b))

## 2.4.1 (2021-08-31)

**Note:** Version bump only for package @bedrock-layout/spacing-constants

# [2.4.0](https://github.com/Bedrock-Layouts/Bedrock/compare/@bedrock-layout/spacing-constants@2.3.1...@bedrock-layout/spacing-constants@2.4.0) (2021-08-26)

### Features

- **spacing-constants:** export spacing-properties.css ([eb6ae72](https://github.com/Bedrock-Layouts/Bedrock/commit/eb6ae72a50e4c88d5d0890731795a3884cb3fe60))

## 2.3.1 (2021-08-26)

**Note:** Version bump only for package @bedrock-layout/spacing-constants

# [2.3.0](https://github.com/Bedrock-Layouts/Bedrock/compare/@bedrock-layout/spacing-constants@2.2.5...@bedrock-layout/spacing-constants@2.3.0) (2021-07-02)

### Features

- **center:** add size options to maxWidth prop of center ([a66f2f4](https://github.com/Bedrock-Layouts/Bedrock/commit/a66f2f4cea4102a866153bbaba1105615cd94afa))
- **grid:** add size options for grid minItemWidth ([78e7d87](https://github.com/Bedrock-Layouts/Bedrock/commit/78e7d87c113f1fd31b011749a5fecfc1a04b0748))
- **spacing-constants:** add a standard sizes option ([b139445](https://github.com/Bedrock-Layouts/Bedrock/commit/b13944504df089d453a631e7191dc9aa9c0347c7))

## 2.2.5 (2021-06-16)

**Note:** Version bump only for package @bedrock-layout/spacing-constants

## 2.2.4 (2021-06-16)

**Note:** Version bump only for package @bedrock-layout/spacing-constants

## 2.2.3 (2021-06-16)

**Note:** Version bump only for package @bedrock-layout/spacing-constants

## 2.2.2 (2021-06-16)

**Note:** Version bump only for package @bedrock-layout/spacing-constants

## [2.2.1](https://github.com/Bedrock-Layouts/Bedrock/compare/@bedrock-layout/spacing-constants@2.2.0...@bedrock-layout/spacing-constants@2.2.1) (2021-05-26)

**Note:** Version bump only for package @bedrock-layout/spacing-constants

# [2.2.0](https://github.com/Bedrock-Layouts/Bedrock/compare/@bedrock-layout/spacing-constants@2.1.2...@bedrock-layout/spacing-constants@2.2.0) (2021-05-21)

### Features

- **spacing-constants:** update to accept space as a key on the theme ([e037b74](https://github.com/Bedrock-Layouts/Bedrock/commit/e037b74166da8ad0fa02f69e1d6bbe45824b1163)), closes [#542](https://github.com/Bedrock-Layouts/Bedrock/issues/542)

## [2.1.2](https://github.com/Bedrock-Layouts/Bedrock/compare/@bedrock-layout/spacing-constants@2.1.1...@bedrock-layout/spacing-constants@2.1.2) (2021-05-17)

**Note:** Version bump only for package @bedrock-layout/spacing-constants

## [2.1.1](https://github.com/Bedrock-Layouts/Bedrock/compare/@bedrock-layout/spacing-constants@2.1.0...@bedrock-layout/spacing-constants@2.1.1) (2021-05-15)

**Note:** Version bump only for package @bedrock-layout/spacing-constants

# [2.1.0](https://github.com/Bedrock-Layouts/Bedrock/compare/@bedrock-layout/spacing-constants@2.0.0...@bedrock-layout/spacing-constants@2.1.0) (2021-04-16)

### Features

- **spacing-constants:** remove unneeded functions/types ([bc83b93](https://github.com/Bedrock-Layouts/Bedrock/commit/bc83b934aa60eee143cecc9ad582a08eee28f691))
