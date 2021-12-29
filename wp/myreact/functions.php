<?php

/**
 * Proper way to enqueue scripts and styles.
 */
function my_react_google_analytics() {
    ?>
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-89207133-1"></script>
        <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        
        gtag('config', 'UA-89207133-1');
        </script>
    <?php
}

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

function my_react_load_scripts() {
    wp_enqueue_style( 'bootstrap-css', 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css' );
    wp_enqueue_script('react-module', get_template_directory_uri() . '/assets/index.bd410585.js');
    wp_enqueue_script('react-vendor', get_template_directory_uri() . '/assets/vendor.61ed900f.js');
    wp_enqueue_style( 'react-style', get_template_directory_uri() . '/assets/index.22a09132.css');

    wp_enqueue_script( 'bootstrap-javascript', 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js' );
    wp_enqueue_script( 'code-prettify', 'https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js' );
}



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

add_action( 'wp_head', 'my_react_google_analytics' );
add_filter( 'rest_request_before_callbacks', 'my_react_count_views', 10, 3 );
add_filter( 'script_loader_tag', 'my_react_script_loader', 10, 3 );
add_action( 'wp_enqueue_scripts', 'my_react_load_scripts' );
