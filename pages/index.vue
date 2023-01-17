<template>
    <main class="home">
      <HeroImage
      :title="$t('home.heroImage.title')"
      :description="$t('home.heroImage.description')"
      image="/img/hero_home_4_4_transparent.png"
      :parallax=false
      image-background="/img/hero_home_4_4_background.png"
      :height=1536
      :width=2304
      :maxScroll="1700"
    />
    <div style="display: block; height: 5000px;"></div>
    </main>
</template>