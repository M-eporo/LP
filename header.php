<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="format-detection" content="telephone=no"/>
    <?php if(is_404()): ?>
        <meta name="robots" content="noindex, nofollow">
    <?php else: ?>
        <meta name="description" content="<?php echo esc_attr( get_bloginfo('description') ); ?>"/>
        
        <meta name="robots" content="noindex, nofollow">

        <meta property="og:type" content="website">
        <meta property="og:title" content="明石でカウンセリング・療育・相談支援なら｜こころ相談研修センター">
        <meta property="og:description" content="発達支援・子育て・療育のご相談を専門家が丁寧にサポートします。まずは無料相談から。">
        <meta property="og:url" content="https://lp.cocotoko.com/">
        <meta property="og:site_name" content="こころ相談研修センター">
        <meta property="og:locale" content="ja_JP">
        <meta property="og:image" content="https://lp.cocotoko.com/assets/images/ogp.jpg">

        <!-- X (Twitter) -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="明石でカウンセリング・療育・相談支援なら｜こころ相談研修センター">
        <meta name="twitter:description" content="発達支援・子育て・療育のご相談を専門家が丁寧にサポートします。まずは無料相談から。">
        <meta name="twitter:image" content="https://lp.cocotoko.com/assets/img/ogp.jpg">
    <?php endif; ?>
    <?php wp_head(); ?>
</head>
<body id="<?php echo is_404() ? 'page-404' : 'page-top'; ?>" <?php body_class(); ?>>
    <?php wp_body_open(); ?>
    <a class="skip-link" href="#main">本文へスキップ</a>
    <header class="header">
        <div class="container">
        <a href="https://cocotoko.com/" class="logo js-logo"  target="_blank" rel="noopener no-referrer" aria-label="公式ホームページ（新しいタブで開きます）">
            <span>一般社団法人</span>
            <span>こころ相談研修センター</span>
        </a>
        <div class="inner">
            <nav class="pc-nav" aria-label="SNSリンク">
            <ul class="pc-sns">
                <li class="sns-item js-sns-item">
                <a href="https://www.youtube.com/@%E3%81%93%E3%81%93%E3%82%8D%E7%9B%B8%E8%AB%87%E7%A0%94%E4%BF%AE%E3%82%BB%E3%83%B3%E3%82%BF%E3%83%BC/featured" target="_blank" rel="noopener no-referrer" aria-label="YouTube（新しいタブで開きます）">
                    <img src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/img/youtube.svg" width="32" height="32" alt="YouTube公式チャンネル">
                </a>
                </li>
                <li class="sns-item js-sns-item">
                <a href="" target="_blank" rel="noopener no-referrer" aria-label="facebook（新しいタブで開きます）">
                    <img src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/img/facebook.svg" width="32" height="32" alt="facebook公式アカウント">
                </a>
                </li>
                <li class="sns-item js-sns-item">
                <a href="https://www.instagram.com/feel_since2017/" target="_blank" rel="noopener no-referrer"aria-label="instagram（新しいタブで開きます）">
                    <img src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/img/instagram.svg" width="32" height="32" alt="Instagram公式アカウント">
                </a>
                </li>
                <li class="sns-item js-sns-item">
                <a href="https://www.tiktok.com/@feel_since17?_r=1&_t=ZS-91Sf9nEGpXt" target="_blank" rel="noopener no-referrer"aria-label="tik tok（新しいタブで開きます）">
                    <img src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/img/tik_tok.svg" width="32" height="32" alt="tiktok公式アカウント">
                </a>
                </li>
                <li class="sns-item js-sns-item">
                <a href="https://x.com/feel202504?s=11" target="_blank" rel="noopener no-referrer"aria-label="x（新しいタブで開きます）">
                    <img src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/img/x.svg" width="32" height="32" alt="X公式アカウント">
                </a>
                </li>
            </ul>
            </nav>
            <a class="primary-btn js-primary-btn" href="#cta" aria-label="無料相談フォームへ移動">
            お問い合わせ
            </a>
        </div>
        </div>
        <button class="hamburger-btn js-hamburger-btn" type="button" aria-controls="sp-menu" aria-expanded="false" aria-label="メニューを開く">
        <div class="btn-area js-btn-area">
            <span></span><span></span><span></span>
        </div>
        </button>
        <div class="mask js-mask" id="sp-menu" hidden>
        <a href="https://cocotoko.com/" class="logo"  target="_blank" rel="noopener no-referrer" aria-label="公式ホームページ（新しいタブで開きます）">
            <span>一般社団法人</span>
            <span>こころ相談研修センター</span>
        </a>
        <div class="wrap">
            <nav class="sp-nav" aria-label="SNSリンク">
            <p class="text">最新のお知らせや活動の様子は<br class="sp-600">公式SNSでも発信しています。</p>
            <ul class="sp-sns">
                <li class="sns-item">
                <a href="https://www.youtube.com/@%E3%81%93%E3%81%93%E3%82%8D%E7%9B%B8%E8%AB%87%E7%A0%94%E4%BF%AE%E3%82%BB%E3%83%B3%E3%82%BF%E3%83%BC/featured" target="_blank" rel="noopener no-referrer">
                    <img src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/img/youtube.svg" width="32" height="32" alt="YouTube公式チャンネル">
                </a>
                </li>
                <li class="sns-item">
                <a href="" target="_blank" rel="noopener no-referrer">
                    <img src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/img/facebook.svg" width="32" height="32" alt="facebook公式アカウント">
                </a>
                </li>
                <li class="sns-item">
                <a href="https://www.instagram.com/feel_since2017/" target="_blank" rel="noopener no-referrer">
                    <img src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/img/instagram.svg" width="32" height="32" alt="Instagram公式アカウント">
                </a>
                </li>
                <li class="sns-item">
                <a href="https://www.tiktok.com/@feel_since17?_r=1&_t=ZS-91Sf9nEGpXt" target="_blank" rel="noopener no-referrer">
                    <img src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/img/tik_tok.svg" width="32" height="32" alt="tiktok公式アカウント">
                </a>
                </li>
                <li class="sns-item">
                <a href="https://x.com/feel202504?s=11" target="_blank" rel="noopener no-referrer">
                    <img src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/img/x.svg" width="32" height="32" alt="X公式アカウント">
                </a>
                </li>
            </ul>
            </nav>
            <a class="primary-btn" href="#cta" aria-label="お問い合わせフォームへ移動">
            お問い合わせ
            </a>
        </div>
        </div>
    </header>