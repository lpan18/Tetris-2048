<?php

function twentyfourteen_child_scripts() {
    global $post;
    if($post->post_name == "sample-page-2"){
	    wp_enqueue_script( 'sample', get_stylesheet_directory_uri() . '/js/extra.js');
    } elseif($post->post_name == "sample-page-3"){
    	wp_enqueue_script( 'game2048', get_stylesheet_directory_uri() . '/js/game2048.js');
    } elseif($post->post_name == "sample-page-4"){
    	wp_enqueue_script( 'tetris', get_stylesheet_directory_uri() . '/js/tetris.js');
    } elseif($post->post_name == "sample-page-5"){
    	wp_enqueue_script( 'matrix', "https://glmatrix.googlecode.com/files/glMatrix-0.9.5.min.js");
    	wp_enqueue_script( 'util', "http://www.learnopengles.com/wordpress/wp-content/uploads/2011/06/webgl-utils.js");
    	wp_enqueue_script( 'helloWebGL', get_stylesheet_directory_uri() . '/js/TestWebGL/HelloWebGL.js');
    }
}
add_action( 'wp_enqueue_scripts', 'twentyfourteen_child_scripts' );

//function load_jquery() {
//    wp_enqueue_script( 'jquery' );
//}
//add_action( 'wp_enqueue_scripts', 'load_jquery' );

//[myjavascript]
//function myjavascript_func( $atts ){
//	return "<script type='text/javascript' src='" . get_stylesheet_directory_uri() . "/js/extra.js?ver=4.0'></script>";
//}
//add_shortcode( 'myjavascript', 'myjavascript_func' );

//function myjavascript_in_wp_head($pid){
//	global $post;
//	if($post->post_name == "sample-page-2"){
//		echo "<script type='text/javascript' src='" . get_stylesheet_directory_uri() . "/js/extra.js?ver=4.0'></script>";
//	}
//}
//add_action( 'wp_head', 'myjavascript_in_wp_head' );