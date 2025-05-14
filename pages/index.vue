<script setup lang="ts">
import '@provetcloud/web-components/lib/Stack'
import SignUp from '~/components/SignUp.vue'
</script>

<template>
 <provet-stack class="login-stack" direction="vertical" align-items="center" justify-content="center" gap="m"> 
    <img src="@/assets/logo.png" alt="Provet logo" style="max-block-size: var(--n-space-xl);">
    <SignUp />
    <div id="page-footer">© 2025 Dawid Witulski</div>
 </provet-stack>
</template>

<style>
.login-stack {
    inline-size: 90%;
    max-inline-size: 600px;
    margin: var(--n-space-xl) auto;
    row-gap: var(--n-space-xl);
}
</style>