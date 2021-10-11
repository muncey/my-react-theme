<?php
/**
 * Proper way to enqueue scripts and styles.
 */
function my_react_load_scripts() {
    wp_enqueue_style( 'bootstrap-css', 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css' );
    wp_enqueue_script('react-module', get_template_directory_uri() . '/assets/index.6a1194af.js');
    wp_enqueue_script('react-vendor', get_template_directory_uri() . '/assets/vendor.04ca13c8.js');
    wp_enqueue_style( 'react-style', get_template_directory_uri() . '/assets/index.a560fd85.css');

    wp_enqueue_script( 'bootstrap-javascript', 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js' );

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

add_filter( 'script_loader_tag', 'my_react_script_loader', 10, 3 );
add_action( 'wp_enqueue_scripts', 'my_react_load_scripts' );
