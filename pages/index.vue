<template>
    <main class="home">
      <HeroImage
      :title="$t('home.heroImage.title')"
      :description="$t('home.heroImage.description')"
      image="/img/hero_home_1.png"
      :parallax=true
    />
    <div style="display: block; height: 500px;"></div>
    </main>
</template>