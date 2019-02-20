<?php

/**
 * Table of Contents ( rooted at ./library/ )
 *
 * [1]. globals.php – defines independent, globally available php functions
 * [2] abstracts – abstract classes that build common structure
 * [2.1]. abstracts/class-abstract-action-set.php – a class that scaffolds the definition of action sets encapsulating functionality
 * [2.2]. abstracts/class-abstract-filter-set.php– a class that scaffolds the definition of filter sets encapsulating functionality
 * [3] theme-options.php, acf custom theme functionality, loaded pre init
 * [4] classes – classes that encapsulate site functionality and site actions.
 * [4.1] classes/class-init-actions.php, a class that initializes state via actions on theme-load.
 * [4.2] classes/class-init-actions.php, a class that sets up init-specific filters on theme-load.
 * [5] site specific classes
 *
 */

	
	/* [1] */
	require_once('library/globals.php');

	/* [2] */
	require_once('library/abstracts/abstract_action_set.php');
	require_once('library/abstracts/abstract_filter_set.php');

	/* [3] */
	require_once('library/theme_options.php');

	/* [4] */
	require_once( 'library/classes/class_init_actions.php' );
	require_once( 'library/classes/class_init_filters.php');

	function pronunciation_shortcode( $atts, $content ) {
		$template_directory = get_bloginfo('template_directory');
		$output = '<a href="#" class="pronunciation">
				<audio id="audio">
				  <source src="' . $template_directory . '/assets/img/pronunciation.mp3" type="audio/mpeg">
				</audio>		
				<span class="icon" data-icon="2"></span>
				<span class="pronunciation-tooltip">click for pronunciation</span>
				</a>';
		return $output;
	}
	add_shortcode( 'pronunciation', 'pronunciation_shortcode' );

	function attachment_image_link_remove_filter( $content ) {
	    $content =
        preg_replace(
            array('{<a(.*?)(wp-att|wp-content\/uploads)[^>]*><img}',
                '{ wp-image-[0-9]*" /></a>}'),
            array('<img','" />'),
            $content
        );
    return $content;
	}
	add_filter( 'the_content', 'attachment_image_link_remove_filter' );
	

?>