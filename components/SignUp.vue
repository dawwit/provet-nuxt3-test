<script setup lang="ts">
import '@provetcloud/web-components/lib/Input';
import '@provetcloud/web-components/lib/Button';
import '@provetcloud/web-components/lib/Stack';
import '@provetcloud/web-components/lib/Tooltip';
import '@provetcloud/web-components/lib/Icon';
import '@provetcloud/web-components/lib/Card';
import '@provetcloud/web-components/lib/Checkbox';

const passwordVisible = ref(false);

const email = ref('');
const password = ref('');
const checkbox = ref(false);

const emailError = ref<string | undefined>(undefined);
const passwordError = ref<string | undefined>(undefined);

const validateEmail = () => {
    emailError.value = undefined;

    if (!email.value) {
        emailError.value = 'Email is required';
    }
};

const validatePassword = () => {
    passwordError.value = undefined;

    if (!password.value) {
        passwordError.value = 'Password is required';
    }
};

const navigateToSuccess = () => {
    navigateTo('/success');
};

const validate = () => {
    validateEmail();
    validatePassword();

    if (emailError.value || passwordError.value) {
        return;
    }

    navigateToSuccess();
};

</script>

<template>
    <provet-card padding="l">
        <h2 slot="header" class="n-font-size-l n-margin-i-auto">Sign up form</h2>
        <form ref="formRef" @submit.prevent="validate">
            <provet-stack>
                <provet-input label="Email" type="email" required name="email" autocomplete="email" v-model="email" @blur="validateEmail" :error="emailError"></provet-input>

                <provet-input label="Password" required :type="passwordVisible ? 'text' : 'password'" name="password" autocomplete="current-password" v-model="password" :error="passwordError" @blur="validatePassword">
                    <provet-button slot="end" aria-describedby="password-tooltip" square @click="passwordVisible = !passwordVisible">
                        <provet-icon v-if="passwordVisible" name="interface-edit-off"></provet-icon>
                        <provet-icon v-else name="interface-edit-on"></provet-icon>
                    </provet-button>
                </provet-input>
                <provet-tooltip id="password-tooltip">Show / hide password</provet-tooltip>

                <provet-checkbox label="I want to receive occasional product updates and announcements" type="checkbox" v-model="checkbox"></provet-checkbox>

                <provet-button @click="validate" variant="primary">Sign Up</provet-button>
            </provet-stack>
        </form>
    </provet-card>
</template>

