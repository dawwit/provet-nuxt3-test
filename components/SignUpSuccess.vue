<script setup lang="ts">
import '@provetcloud/web-components/lib/Icon'
import '@provetcloud/web-components/lib/Card'
import '@provetcloud/web-components/lib/Stack'
</script>

<template>  
    <provet-card padding="l">
        <provet-stack direction="vertical" align-items="center" justify-content="center" gap="m">
            <h2 slot="header" class="n-font-size-l n-margin-i-auto">Sign up form</h2>
            <provet-icon size="xxl" name="interface-checked-circle" color="var(--n-color-status-success)"></provet-icon>
            <p>You've successfully signed up!</p>
        </provet-stack>
    </provet-card>
</template>