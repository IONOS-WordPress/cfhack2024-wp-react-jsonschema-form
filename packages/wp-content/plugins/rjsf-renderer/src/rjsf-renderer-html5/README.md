Implement the HTML5 renderer using the most modern browser features available !

Try to render just pure HTML and CSS.

**We hack for the future not for the past.**

# Links

## HTML

- [If you are reading number and date input values as strings and parsing them manually, there is a better way.](https://twitter.com/Steve8708/status/1615149037531041792)

- [native HTML Popver support is there !](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API?)

- [https://css-tricks.com/weekly-platform-news-reduced-motion-cors-whitehouse-gov-popups-and-100vw/#the-new-html-popup-element-is-in-development](The new HTML <popup> element is in development)

- [TIL : button elements offer attributes to change form behavior](https://www.stefanjudis.com/today-i-learned/button-elements-offer-attributes-to-change-form-behavior/)

- [What’s New With Forms in 2022](https://css-tricks.com/whats-new-with-forms-in-2022)

- [You don't need JavaScript for that](https://www.htmhell.dev/adventcalendar/2023/2/)

  - a switch based on a checkbox using just html and css

  - Form elements, along with images, are something called "replaced content". That means they're not really part of your HTML, but supplied by the browser. When the browser renders your HTML and finds replaced content, it leaves a box for it, and then replaces that box with the actual content. This is why, for example, images and form elements can't have pseudo-elements: they get replaced when the browser replaces the entire element.

    `appearance` is a way of telling the browser to stop doing that. It tells the browser: "Thanks, but I want to style my own form control". And that then allows is to use the `::before` pseudo-element. The input itself is now the background of our switch, and the `::before` pseudo-element is the little dot inside of it that does the toggling.

  - Accordion implemented with just html and css.

    - When it comes to styling, the details element also has you covered. That little triangle (that your designer will want to replace the instant they see it) is a `::marker` pseudo-element that you can style

    - Keep in mind that changing the content can affect how assistive technologies announce your accordion. Read Manuels article on that here: details/summary inconsistencies. In addition, for Safari you'll have to use the ::-webkit-details-marker pseudo-element.

    - The marker pseudo-element can't be styled as extensively as other elements (many CSS properties do not work on it, like positioning it in a completely different place), but you can replace its content, for example with emoji, or set a background color or image and change it's font size.

    - interesting informations about the native html dialog

  - Because the dialog is essentially a div as far as styling it concerned, you can style it however you want. The browser will automatically place it in the middle of the screen for you, but everything else is up to you.

    Dialog also comes with a new pseudo-element called `::backdrop`. That's the layer that sits between the dialog and the rest of the page, and you can style it to e.g. dim the rest of the page or otherwise direct a users attention to the dialog.

- [A no-framework, no-dependencies, customizable, animate-able, SVG-based <qr-code> HTML element.](https://github.com/bitjson/qr-code)

- [select elements now support hrs to add visual grouping.](https://developer.chrome.com/en/blog/hr-in-select/)

- [dialog shipped. popover is almost cross-browser supported (Firefox is missing with a flagged implementation). details elements with similar name attributes will become native accordions.](https://www.stefanjudis.com/blog/web-weekly-114/#new-to-the-platform)

## CSS

- [A modern CSS reset](https://ress-css.surge.sh/)

- [CSS Nesting using native browser](https://webkit.org/blog/13813/try-css-nesting-today-in-safari-technology-preview)

- [Follow 5 centering techniques as they go through a series of tests to see which one is the most resilient to change.](https://web.dev/centering-in-css/)

- [Exploring color-contrast() for the First Time](https://css-tricks.com/exploring-color-contrast-for-the-first-time/)

- [CSS System Colors](https://blog.jim-nielsen.com/2021/css-system-colors/)

- [css `:not` selector and `clip-path: path()` function generally available](https://css-tricks.com/weekly-platform-news-the-not-pseudo-class-video-media-queries-clip-path-path-support/)

- [css property `aspect-ratio` - Normally, only some elements have an aspect ratio, for example images. For them, if only the width, or the height, is specified, the other is automatically computed using the intrinsic aspect ratio.](https://developer.chrome.com/blog/new-in-chrome-88/#aspect-ratio)

- [VScode CSS Navigation Plugin allows Go to Definition from HTML to CSS / Sass / Less; provides Completion and Workspace Symbols for class & id name.](https://marketplace.visualstudio.com/items?itemName=pucelle.vscode-css-navigation)

- [Lesser-Known And Underused CSS Features In 2022](https://www.smashingmagazine.com/2022/05/lesser-known-underused-css-features-2022/)

- [A Utility Class for Covering Elements : It includes an example of using #css grid to stack elements.](https://twitter.com/stefanjudis/status/1337303897296285698)

- [Did You Know About the :has CSS Selector?](https://css-tricks.com/did-you-know-about-the-has-css-selector/)

- [Tree View Pure CSS](https://codepen.io/kobusvanwykk/pen/NqXVNQ)

- [TIL – you can style the file input "browse" button using `::file-selector-button`](https://twitter.com/stefanjudis/status/1380251546198413315?s=19)

- [CSS Nesting just landed in Firefox 117 which puts it at 100% browser support!](https://twitter.com/wesbos/status/1696201171587809761)

- [Scrollbars on Hover](https://css-tricks.com/scrollbars-on-hover/)

- [A CSS-only responsive table with fixed column & row headers, inside a layout, with scroll snapping!](https://twitter.com/scottjehl/status/1407356545080434697)

- [browser _immediately_ responds to taps instead of waiting 300ms](https://twitter.com/argyleink/status/1405881231695302659?s=09)

- [Very modern vanilla (mostly pure css) UI components](https://github.com/argyleink/gui-challenges)

- [A Utility Class for Covering Elements](https://twitter.com/stefanjudis/status/1337303897296285698)

- [Simplifying Form Styles With accent-color](https://www.smashingmagazine.com/2021/09/simplifying-form-styles-accent-color/)

- [#css] [12 Modern CSS One-Line Upgrades](https://moderncss.dev/12-modern-css-one-line-upgrades/)

  > If you’ve ever wanted to change the color of checkboxes or radio buttons, you’ve been seeking `accent-color`. With this property, you can modify the `:checked` appearance of radio buttons and checkboxes and the filled-in state for both the progress element and range input. The browser’s default focus “halo” may also be adjusted if you do not have another override.

  >  In some scenarios, the appearance or disappearance of scrollbars can cause an unwanted layout shift. For example, when a dialog overlay is displayed and the background page adds `overflow: hidden` to prevent scrolling, causing a shift from removing the no longer needed scrollbars.
  The modern CSS property `scrollbar-gutter` enables a reservation of space for scrollbars in the layout, which prevents that undesirable shift. When there’s no need for a scrollbar, the browser will still paint a gutter as extra space created in addition to any padding on the scroll container.

- [#css] tooltip anchor positioning in css

  The code for anchor positioning has had a major glow up since I first started working with/on it! Here is all the code you need to get a basic anchor now:

  ```css
  .tooltip {
    bottom: calc(anchor(top));
    position-try-options: flip-block;
    justify-self: anchor-center;
  }
  ```

  see https://twitter.com/Una/status/1777810507849671036

-
