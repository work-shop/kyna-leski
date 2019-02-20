<?php
/**
 * HOME ( index.php ) 
 *
 * 1. Header
 * 2. Bio 
 * 3. Book
 * 4. Footer
 *
 */
?>

<?php get_header(); ?>

<?php get_template_part('partials/landing'); ?>

<?php get_template_part('partials/bio'); ?>

<?php get_template_part('partials/books'); ?>

<?php get_template_part('partials/news'); ?>

<?php get_footer(); ?>
