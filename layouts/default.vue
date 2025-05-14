<template>
    <main class="n-stack-horizontal">
        <slot />
    </main>
</template>

<style>
html, body {
    background: var(--n-color-surface-raised);
}

html, body, #__nuxt[data-v-app], main {
    block-size: 100%;
}
</style>