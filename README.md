# Accessibility Color Tools (a11y-color)

## Utilities

### Color Parsing

`parseColor`: Parses a color string in rgb or rgba format into a Color object.

### Color suggestions for specific contrast ratios

`suggestedColors`: Suggests alternative color suggestions to meet a given contrast ratio.

### Contrast ratio calculation

`calculateContrastRatio`: Calculate the contrast ratio between the two given colors.
Returns the ratio to 1, for example for two two colors with a contrast ratio of 21:1, this
function will return 21.


### Flatten colors

`flattenColors`: Combine the two given colors according to alpha blending.
