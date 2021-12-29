## Muncey web react theme

Muncey web react theme is a React application which can be installed as a wordpress theme.  The purpose of this project is to develop a lightweight React front end for wordpress.  

As I build out features I am documenting my journey on Twitter (https://twitter.com/MuncePhilip) and my personal web site (https://munceyweb.com)

### Features

The react theme supports the following set of features:

* Bootstrap css
* Use of Wordpress Rest API
* Hosting of React frontend inside Wordpress
* Page layout
* View counts
* React to render the front end view

### Upcoming features

* Support for pages (i.e. Landing/Home, About, Contact)
* Contact forms
* Blog roll
* SEO support
* Progressive web application
* Automated builds

## Installation

To use the theme clone this project and run ```npm run build```.  You will need to create a Wordpress theme in a local installation and copy the contents of the dist folder into the assets folder of your wordpress theme.

### Wordpress Theme
#### Folder structure
I have setup my wordpress theme using the following files and folders.
```
wp-content
  -- themes
     -- myreact
        -- assets
           favicon.675aa949.ico
           index.22a09132.css
           index.bd410585.js
           vendor.61ed900f.js
        functions.php
        index.php
        style.css
```
#### index.php
My index.php contains the following HTML:
```
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
```
For local running you will need to uncomment the .wp-base-url hidden variable.


#### functions.php
##### hooks
My functions.php makes use of these Wordpress hooks:
```
add_action( 'wp_head', 'my_react_google_analytics' );
add_filter( 'rest_request_before_callbacks', 'my_react_count_views', 10, 3 );
add_action( 'wp_enqueue_scripts', 'my_react_load_scripts' );
add_filter( 'script_loader_tag', 'my_react_script_loader', 10, 3 );
```
##### wp_head (optional)
For wp_head I am adding the google analytics tracking code (this is optional and you will need to register with google analytics to get the code).
```
function my_react_google_analytics() {
    ?>
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=<your code here>"></script>
        <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        
        gtag('config', 'UA-89207133-1');
        </script>
    <?php
}
```

##### rest_request_before_callbacks (for page views)
In order to keep track of page views I am using a post_views variable held in the post meta for each post. The following code will create and update the counter with each view of a post or page.
```
function my_react_count_views( $response, $handler, WP_REST_Request $request ) {
    $id = $request->get_param('id');
    $route = $request->get_route();
    if ((stristr($route, 'posts') || stristr($route, 'pages')) && isset($id)) {
        $views = get_post_meta($id, 'post_views', true);
        if (!$views) {
            add_post_meta($id, 'post_views', 1);
        } else {
            update_post_meta($id, 'post_views', intval($views) + 1);
        }
    }
    return $response; 
}

register_post_meta( 'post', 'post_views', array(
	// Add to REST response
	'show_in_rest' => true,
	// Process the value of the field when saving it to the database, function absint()
	'sanitize_callback' => 'absint',
));


```
##### wp_enqueue_scripts
I use the standard wp_enqueue_scripts hook to import the Boostrap and React javascript and css libraries onto each page. I also import the Google code-prettify library in this function.
```
function my_react_load_scripts() {
    wp_enqueue_style( 'bootstrap-css', 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css' );
    wp_enqueue_script('react-module', get_template_directory_uri() . '/assets/index.bd410585.js');
    wp_enqueue_script('react-vendor', get_template_directory_uri() . '/assets/vendor.61ed900f.js');
    wp_enqueue_style( 'react-style', get_template_directory_uri() . '/assets/index.22a09132.css');

    wp_enqueue_script( 'bootstrap-javascript', 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js' );
    wp_enqueue_script( 'code-prettify', 'https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js' );
}
```
##### script_loader_tag
I use the script_loader_tag hook to customise the link and script tags for Bootstrap and React.
```
function my_react_script_loader( $tag, $handle, $src ) {
    if ( 'bootstrap-css' === $handle ) {
        $tag = '<link href="' . esc_url( $src ) . '" rel="stylesheet"  integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">';
    } else if ( 'react-module' === $handle ) {
        $tag = '<script type="module" src="' . esc_url( $src ) . '"></script>';
    } else if ( 'react-vendor' === $handle ) {
        $tag = '<link rel="modulepreload" href="' . esc_url( $src ) . '"></script>';
    } else if ( 'bootstrap-javascript' === $handle ) {
        $tag = '<script src="' . esc_url( $src ) . '" integrity="sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ" crossorigin="anonymous"></script>';
    }
    return $tag;
}
```