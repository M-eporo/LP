<?php get_header(); ?>
    <main class="error-main">
    <h1 class="title">404</h1>
    <p class="text">お探しのページは見つかりませんでした。<br>
    URLが間違っているか、ページが削除された可能性があります。</p>
    <a class="home-button" href="<?php echo esc_url(home_url()); ?>">トップページへ戻る</a>
    </main>
<?php get_footer(); ?>
