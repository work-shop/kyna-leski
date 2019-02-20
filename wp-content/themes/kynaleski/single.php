<?php
/**
 * SINGLE POST ( single.php ) 
 *
 * 1. Header
 * 2. Post Content
 * 3. Footer
 *
 */
?>

<?php 

/** 1. Header */
get_header(); 


/** 2. Post Content */
get_template_part('partials/post_content');


/** 3. Footer */
get_footer(); 

?>