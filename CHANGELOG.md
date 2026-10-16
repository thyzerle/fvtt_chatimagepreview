# Changelog

## [Unreleased]

### Added

- Settings to enable or disable the module, limit the embedded image height, and show or hide the source link caption
- Support for more image formats (png, jpg, jpeg, jfif, gif, webp, avif, apng, bmp, svg)
- Shift-click now also opens the image in a new tab
- English localization and a stylesheet

### Changed

- Rewritten to hook `renderChatMessageHTML` instead of wrapping `ChatLog.prototype.processMessage`
- Raised compatible core version to v13 (verified on v14)
- Restructured the project directory and module files

### Removed

- Dependency on `lib-wrapper`

## [1.1.0] - 2024-07-24

### Changed

- Bumped compatible core version to v12

## [1.0.0] - 2024-04-14

### Added

- Initial release
