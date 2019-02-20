<?php
/**
 * PAGE ( page.php ) 
 *
 * 1. Header
 * 2. Page Content
 * 3. Footer
 *
 */
?>

<?php 

/** 1. Header */
get_header(); 


/** 2. Page Content */
get_template_part('partials/page_content');


/** 3. Footer */
get_footer(); 

?>