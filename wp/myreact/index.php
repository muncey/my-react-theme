<?php
/*
Theme Name: My React
Theme URI: https://munceyweb.com
Author: Philip Munce
Author URI: https://munceyweb.com
Description: Simple theme to host a react.js web site
Version: 1.0.5
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Tags: 

This theme, like WordPress, is licensed under the GPL.
Use it to make something cool, have fun, and share what you've learned with others.
*/
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="shortcut icon" href="<?php echo get_stylesheet_directory_uri(); ?>/assets/favicon.675aa949.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <?php wp_head(); ?>
    <title>Munceyweb blog</title>
</head>
  <body>
    <div id="root"></div>
    <?php wp_footer(); ?>
    <!-- <input type="hidden" class="wp-base-url" value="http://localhost:3000/wp-json/wp/v2"> -->
  </body>
</html>
