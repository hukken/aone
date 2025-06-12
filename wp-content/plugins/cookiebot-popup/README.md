# Cookiebot popup Wordpress Plugin

A GDPR friendly Cookiebot popup.

## Setup

1. Create a new domain group in the [Cookiebot administrator panel](https://manage.cookiebot.com/en/manage) by clicking the green plus button.
2. Enter the following settings:
    1. Name: [INSTALL NAME]
    2. Plan: **Premium plan**
    3. Create the domain group settings from **🚀 DC TEMPLATE**
3. Add your domain(s) as primary domains, and your local domain(s) as alias domains.
4. Add this plugin to your Composer file, as well as the [official Cookiebot plugin](https://wordpress.org/plugins/cookiebot/). Example below ⬇️.

```json
{
	"repositories": [
		{
			"type": "composer",
			"url": "https://wpackagist.org"
		},
		{
			"type": "vcs",
			"url": "https://github.com/designcontainer/cookiebot-popup"
		}
	],
	"require": {
		"designcontainer/cookiebot-popup": "*",
		"wpackagist-plugin/cookiebot": "*"
	}
}
```

## CSS Variables

If you wish to override the default styling of the popup, here are some variables to help you out:

```scss
.stem-cookiebot-popup {
	// Colors
	--cb-color-primary: rgb(32 32 32);
	--cb-color-secondary: rgb(238, 238, 238);

	// Text
	--cb-color-text: rgb(32 32 32);
	--cb-color-text-light: rgb(83, 82, 89);
	--cb-text-size: 14px;

	// Box
	--cb-box-font-family: inherit;
	--cb-box-heading-font-family: var(--cb-box-font-family);
	--cb-box-margin: 2rem 2rem;
	--cb-box-position: center;
	--cb-box-radius: 10px;
	--cb-box-padding: #{em-calc(36)};


	// Buttons
	--cb-btn-radius: 20px;
}
```

## Strings

All the strings for the modal are fetched from Cookiebot. You can change these in the [Cookiebot administrator panel](https://manage.cookiebot.com/en/manage). Just select your domain group and navigate to the **Content** tab. Remember to click the Save button when you're done.

![Cookiebot administrator panel, content tab example](https://user-images.githubusercontent.com/25268506/124452350-9760ed00-dd86-11eb-84a6-bf4fd16a8628.png)

## Development

The [index.php](index.php) file contains all the necessary WordPress plugin registration code and methods for enqueing scrips and styles.

The [src](src) folder contains the following:

-   js: Compiled to the build folder with webpack and babel. Enqueued in the [index.php](index.php) file.
-   scss: Compiled to CSS in the build folder with webpack and babel. Enqueued in the [index.php](index.php) file.
-   html: Compiled into a separate folder, [artifacts](artifacts). When editing the markup, you will need to manually add the artifacts output to the **🚀 DC TEMPLATE** in the [Cookiebot administrator panel](https://manage.cookiebot.com/en/manage), by navigating to the **Banner** tab, and replacing the exisitng HTML. Remember to save your changes.

Before publishing your a new version, update the version number in the following files and places:

-   [package.json line 3](package.json#L3)
-   [index.php line 7](index.php#L7)
-   [index.php line 15](index.php#L15)

When commiting, a precommit hook will automatically run `npm run build`.

After pushing your changes, [create a new release](https://github.com/designcontainer/cookiebot-popup/releases/new).
Tag it with your version: example: v4.2.0, write a title, normally I just use the version for this as well.
Describe your release, and then publish it.
