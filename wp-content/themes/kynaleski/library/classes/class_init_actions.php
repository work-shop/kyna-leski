<?php


class WS_Init_Actions extends WS_Action_Set {

	/**
	 * Constructor
	 */
	public function __construct() {
		show_admin_bar(false);

		parent::__construct(
			array(
				'init' 								=> 'create_post_types',
				'wp_enqueue_scripts' 				=> 'enqueue_theme_assets',
				'after_theme_setup'					=> array( 'remove_post_formats', 11, 0 ),
				'login_head'						=> 'login_css',
				'admin_head'						=> 'admin_css',
				'admin_menu'						=> 'remove_menus'
		));
	}


	/** POST TYPES */
	public function create_post_types() {
	register_post_type( 'news',
		array(
			'labels' => array(
				'name' => 'News',
				'singular_name' =>'News Item',
				'add_new' => 'Add New',
			    'add_new_item' => 'Add News Item',
			    'edit_item' => 'Edit News Item',
			    'new_item' => 'New News Item',
			    'all_items' => 'All News',
			    'view_item' => 'View News Item',
			    'search_items' => 'Search News',
			    'not_found' =>  'No News Items found',
			    'not_found_in_trash' => 'No News Items found in Trash', 				
			),
			'public' => true,
			'has_archive' => true,
			'rewrite' => array('slug' => 'news'),
			'show_in_rest' => true,
			'supports' => array( 'title', 'thumbnail','editor')
		));

					
		if ( function_exists( 'add_theme_support' ) ) {
			add_theme_support( 'post-thumbnails' );
		    	set_post_thumbnail_size( 300, 150, true ); 
		}
		if ( function_exists( 'add_image_size' ) ) {  
			add_image_size( 'book', 425, 550, false );  					
		}
		if ( function_exists( 'add_image_size' ) ) {  
			add_image_size( 'news', 768, 768, false );  					
		}					
		if ( function_exists( 'add_image_size' ) ) {  
			add_image_size( 'hero', 1440, 768, true );  					
		}

	}


	/** THEME ASSETS */
	public function enqueue_theme_assets() {
		$this->enqueue_theme_styles();
		$this->enqueue_theme_scripts();

	}

	private function enqueue_theme_scripts() {

		//add $in_footer to enqueue script funciton

		wp_deregister_script( 'jquery' );

		wp_register_script( 'modernizr', get_template_directory_uri() . '/assets/js/modernizr.js');
		wp_register_script( 'jquery', get_template_directory_uri() . '/assets/js/jquery.js');
		//wp_register_script( 'bootstrap', get_template_directory_uri() . '/assets/js/bootstrap.js');
		//wp_register_script( 'flexslider', get_template_directory_uri() . '/assets/js/flexslider.js');
		wp_register_script( 'functions', get_template_directory_uri() . '/assets/js/functions.js');

		wp_enqueue_script( 'modernizr' );
		wp_enqueue_script( 'jquery' );
		//wp_enqueue_script( 'bootstrap' );
		//wp_enqueue_script( 'flexslider' );
		wp_enqueue_script( 'functions' );

		wp_localize_script( 'functions', 'async', array('url' => admin_url('admin-ajax.php') ) );

		if (!file_exists( dirname( __FILE__ ) . '/env_prod' )){
			wp_register_script( 'cssrefresh', get_template_directory_uri() . '/assets/js/cssrefresh.js');
			//wp_enqueue_script( 'cssrefresh' );		
		}		

	}

	private function enqueue_theme_styles() { 
		wp_register_style( 'bootstrap', get_template_directory_uri() . '/assets/css/bootstrap.css');    
		wp_register_style( 'fonts', get_template_directory_uri() . '/assets/fonts/fonts.css');  
		wp_register_style( 'style', get_template_directory_uri() . '/assets/css/main.css');
		
		wp_enqueue_style( 'bootstrap' );   
		wp_enqueue_style( 'fonts' );
		wp_enqueue_style( 'style' );   
	}	


	/** ADMIN ASSETS */
	public function remove_post_formats() { remove_theme_support('post-formats'); }

	public function login_css() { wp_enqueue_style( 'login_css', get_template_directory_uri() . '/assets/css/login.css' ); }
	public function admin_css() { wp_enqueue_style( 'admin_css', get_template_directory_uri() . '/assets/css/admin.css' ); }


	/** MENU SETTINGS */
	public function remove_menus () {
		global $menu;

		$restricted = array( __('Appearance'),__('Comments'),__('Posts'),__('Pages'),__('Dashboard'));
		end ($menu);

		while (prev($menu)){
			$value = explode(' ',$menu[key($menu)][0]);
			if(in_array($value[0] != NULL?$value[0]:"" , $restricted)){unset($menu[key($menu)]);}
		}

		$this->remove_acf_menu();
	}


	private function remove_acf_menu(){
		    // provide a list of usernames who can edit custom field definitions here
		    $admins = array( 
		        'dev','greg','nic'
		    );
		 
		    // get the current user
		    $current_user = wp_get_current_user();
		 
		    // match and remove if needed
		    if( !in_array( $current_user->user_login, $admins ) )
		    {
		       // remove_menu_page('edit.php?post_type=acf');
		    }
		 
	}

}


new WS_Init_Actions();



