<template>
    <main class="n-stack-horizontal">
        <provet-stack class="login-stack" direction="vertical" align-items="center" justify-content="center" gap="m"> 
            <img src="@/assets/logo.png" alt="Provet logo" style="max-block-size: var(--n-space-xl);">
            <slot />
            <div id="page-footer">© 2025 Dawid Witulski</div>
        </provet-stack>
    </main>
</template>

<style>
html, body {
    background: var(--n-color-surface-raised);
}

html, body, #__nuxt[data-v-app], main {
    block-size: 100%;
}

.login-stack {
    inline-size: 90%;
    max-inline-size: 600px;
    margin: var(--n-space-xl) auto;
    row-gap: var(--n-space-xl);
}
</style>