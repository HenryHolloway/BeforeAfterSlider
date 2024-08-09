<?php
/**
 * Plugin Name: Before After Image Slider
 * Description: A Gutenberg block for a before and after image slider.
 * Version: 1.0
 * Author: Henry Holloway
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

function ba_slider_enqueue_assets() {
    // Enqueue block editor JavaScript
    wp_enqueue_script(
        'ba-slider-block',
        plugin_dir_url( __FILE__ ) . 'block/block.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'block/block.js' )
    );
    
    // Enqueue block editor styles
    wp_enqueue_style(
        'ba-slider-editor-styles',
        plugin_dir_url( __FILE__ ) . 'block/editor.css',
        array( 'wp-edit-blocks' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'block/editor.css' )
    );

    // Enqueue frontend styles
    wp_enqueue_style(
        'ba-slider-front-styles',
        plugin_dir_url( __FILE__ ) . 'block/style.css',
        array(),
        filemtime( plugin_dir_path( __FILE__ ) . 'block/style.css' )
    );
}
add_action( 'enqueue_block_assets', 'ba_slider_enqueue_assets' );

function ba_slider_register_block() {
    register_block_type('ba/slider', array(
        'render_callback' => 'ba_slider_dynamic_block_render',
        'attributes' => array(
            'beforeImage' => array(
                'type' => 'string',
                'default' => ''
            ),
            'afterImage' => array(
                'type' => 'string',
                'default' => ''
            ),
        )
    ));
}
add_action('init', 'ba_slider_register_block');


function ba_slider_dynamic_block_render($attributes) {
    ob_start();
    ?>
    <div class="slider-container">
        <div class="slider">
            <div class="after-image-container">
                <img class="after-image" src="<?php echo esc_url($attributes['afterImage']); ?>" alt="After Image">
                <div class="after-text">After</div>
            </div>
            <div class="before-image-container">
                <img class="before-image" src="<?php echo esc_url($attributes['beforeImage']); ?>" alt="Before Image">
                <div class="before-text">Before</div>
            </div>
            <input type="range" class="slider-bar" min="0" max="100" value="50">
            <div class="drag-me-box">Drag Me</div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}


function ba_slider_enqueue_frontend_scripts() {
    if( ! is_admin() ) {
        wp_enqueue_script(
            'ba-slider-script',
            plugin_dir_url( __FILE__ ) . 'block/frontend.js',
            array('jquery'), 
            filemtime( plugin_dir_path( __FILE__ ) . 'block/frontend.js' ), // Ensure cache busting
            false // Load in header
        );
    }
}
add_action( 'wp_enqueue_scripts', 'ba_slider_enqueue_frontend_scripts' );
?>
