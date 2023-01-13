<template>
    <main class="home container">
      <HeroImage
      :title="$t('home.heroImage.title')"
      :description="$t('home.heroImage.description')"
      image="/img/hero_home.png"
      :parallax=true
    />
    </main>
</template>