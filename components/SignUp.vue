<script setup lang="ts">
import '@provetcloud/web-components/lib/Input'
import '@provetcloud/web-components/lib/Button'
import '@provetcloud/web-components/lib/Stack'
import '@provetcloud/web-components/lib/Tooltip'
import '@provetcloud/web-components/lib/Icon'

const passwordVisible = ref(false)
const email = ref('')
const password = ref('')

const emailError = ref<string | undefined>(undefined)
const passwordError = ref<string | undefined>(undefined)

const validateEmail = () => {
    emailError.value = undefined;

    if (!email.value) {
        emailError.value = 'Email is required'
    }
}

const validatePassword = () => {
    passwordError.value = undefined;

    if (!password.value) {
        passwordError.value = 'Password is required'
    }
}

const validate = () => {
    validateEmail()
    validatePassword()
}
</script>

<template>
    <provet-stack>
        <provet-input label="Email" type="email" required name="email" autocomplete="email" v-model="email" @blur="validateEmail" :error="emailError"></provet-input>

         <provet-input label="Password" required :type="passwordVisible ? 'text' : 'password'" name="password" autocomplete="current-password" v-model="password" :error="passwordError" @blur="validatePassword">
            <provet-button slot="end" aria-describedby="password-tooltip" square @click="passwordVisible = !passwordVisible">
                <provet-icon v-if="passwordVisible" name="interface-edit-off"></provet-icon>
                <provet-icon v-else name="interface-edit-on"></provet-icon>
            </provet-button>
        </provet-input>
        <provet-tooltip id="password-tooltip">Show / hide password</provet-tooltip>

        <provet-button @click="validate">Sign Up</provet-button>
    </provet-stack>
</template>

