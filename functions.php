<?php
    function theme_setup() {
        add_theme_support('title-tag');
    }
    add_action('after_setup_theme', 'theme_setup');

    add_filter('document_title_parts', function ($title) {
        unset($title['tagline']);
        return $title;
    });

    add_filter('pre_get_document_title', function($title) {
        if(is_404()) {
            return 'ページが見つかりません | こころ相談研修センター';
        }
        return $title;
    });

    function enqueue_scripts() {
        //splide.js
        wp_enqueue_script( 
            'splide_min_vendor',
            get_template_directory_uri() . '/assets/js/splide.min.js',
            array(),
            '4.1.2', 
            true
        );
        //splide setting
        wp_enqueue_script( 
            'splide_custom',
            get_template_directory_uri() . '/assets/js/splide.js',
            array('splide_min_vendor'),
            '1.0.0', 
            true
        );
        //FAQアコーディオン
        wp_enqueue_script( 
            'faq-accordion',
            get_template_directory_uri() . '/assets/js/accordion.js',
            array(),
            '1.0.0', 
            true
        );
        //ハンバーガーボタン
        wp_enqueue_script( 
            'hamburger_button',
            get_template_directory_uri() . '/assets/js/hamburger.js',
            array('splide_min_vendor', 'splide_custom'),
            '1.0.0', 
            true
        );
        //GSAP-core
        wp_enqueue_script(
            'gsap-core',
            'https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/gsap.min.js',
            array(),
            '3.14.1',
            true
        );
        //GSAP-ScrollTrigger
        wp_enqueue_script(
            'gsap-scrollTrigger',
            'https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/ScrollTrigger.min.js',
            array('gsap-core'),
            '3.14.1',
            true
        );
        //GSAP-MotionPath
        wp_enqueue_script(
            'gsap-motionPath',
            'https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/MotionPathPlugin.min.js',
            array('gsap-core', 'gsap-scrollTrigger'),
            '3.14.1',
            true
        );
        //GSAP-thema
        wp_enqueue_script(
            'gsap-thema',
            get_template_directory_uri() . '/assets/js/gsap-core.js',
            array('gsap-core', 'gsap-scrollTrigger', 'gsap-motionPath'),
            '1.0.0',
            true
        );
        // reset.css
        wp_enqueue_style(
            'cocotoko-reset',
            get_template_directory_uri() . '/assets/css/vendors/reset.css',
            array(),
            '1.0'
        );

        // splide.css
        wp_enqueue_style(
            'cocotoko-splide',
            get_template_directory_uri() . '/assets/css/vendors/splide.min.css',
            array('cocotoko-reset'),
            '4.1.4'
        );

        // Font Awesome（CDN）
        wp_enqueue_style(
            'font-awesome',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
            array(),
            '6.5.0'
        );

        // Google Fonts
        wp_enqueue_style(
            'google-fonts',
            'https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c&family=Mochiy+Pop+One&family=Noto+Sans+JP:wght@100..900&family=Rampart+One&family=Roboto:ital,wght@0,100..900;1,100..900&family=RocknRoll+One&display=swap',
            array(),
            null
        );

        // メインCSS
        wp_enqueue_style(
            'cocotoko-style',
            get_template_directory_uri() . '/assets/css/style.css',
            array(
            'cocotoko-reset',
            'cocotoko-splide',
            'font-awesome',
            'google-fonts'
            ),
            '1.0'
        );
    }
    add_action('wp_enqueue_scripts', 'enqueue_scripts');

    add_filter('wp_resource_hints', function ($urls, $relation_type) {
        if ($relation_type === 'preconnect') {
            $urls[] = [
            'href' => 'https://fonts.googleapis.com',
            ];
            $urls[] = [
            'href' => 'https://fonts.gstatic.com',
            'crossorigin',
            ];
        }
        return $urls;
    }, 10, 2);

    // 404ページで不要なスクリプトとスタイルを解除
    add_action('wp_enqueue_scripts', function() {
        if( is_404()) {
            wp_dequeue_script('splide_min_vendor');
            wp_dequeue_script('splide_custom');
            wp_dequeue_script('faq-accordion');
            wp_dequeue_style('cocotoko-splide');
            wp_dequeue_style('font-awesome');
        }
    });

    // Snow Monkey Formsのメールアドレス確認用カスタムバリデーション
    add_filter(
        'snow_monkey_forms_validate',
        function($errors, $form_id, $input) {
            if($input['email'] !== $input['email-check']) {
                $errors['email-check'] = 'メールアドレスが一致しません。';
            }
            return $errors;
        },
        10,3
    );

    // Snow Monkey Formsのプライバシーポリシーの同意用カスタムバリデーション
    add_filter(
        'snow_monkey_forms_validate',
        function($errors, $form_id, $input) {
            if(empty($input['privacy-agree'])) {
                $errors['privacy-agree'] = 'プライバシーポリシーへの同意が必要です。';
            }
            return $errors;
        },
        10,3
    );

    // Snow Monkey Formsの電話番号の形式確認用カスタムバリデーション
    add_filter(
        'snow_monkey_forms_validate',
        function($errors, $form_id, $input) {
            if ( ! preg_match('/^[0-9\-]+$/', $input['tel']) ) {
                $errors['tel'] = '電話番号の形式が正しくありません。';
            }

            return $errors;
        },
        10,3
    );