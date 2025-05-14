<script setup lang="ts">
import '@provetcloud/web-components/lib/Input';
import '@provetcloud/web-components/lib/Button';
import '@provetcloud/web-components/lib/Stack';
import '@provetcloud/web-components/lib/Tooltip';
import '@provetcloud/web-components/lib/Icon';
import '@provetcloud/web-components/lib/Card';
import '@provetcloud/web-components/lib/Checkbox';
import { z } from 'zod';

const passwordVisible = ref(false);

const email = ref('');
const password = ref('');
const checkbox = ref(false);

const emailError = ref<string | undefined>(undefined);
const passwordError = ref<string | undefined>(undefined);
const emailTouched = ref(false);
const passwordTouched = ref(false);

// Zod schemas
const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address');

// More reasonable password requirements
const passwordSchema = z
  .string()
  .min(1, 'Password is required')
  .min(6, 'Password must be at least 6 characters long')
  .refine(password => {
    // Check if password has ALL required elements: uppercase, lowercase, number, and special char
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

    return hasUppercase && hasLowercase && hasNumber && hasSpecial;
  }, 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character');

const validateEmail = () => {
  emailError.value = undefined;

  const result = emailSchema.safeParse(email.value);
  if (!result.success) {
    emailError.value = result.error.errors[0].message;
  }
};

const validatePassword = () => {
  passwordError.value = undefined;

  const result = passwordSchema.safeParse(password.value);
  if (!result.success) {
    passwordError.value = result.error.errors[0].message;
  }
};

// Watch for changes to validate in real-time after fields have been touched
watch(email, () => {
  if (emailTouched.value) {
    validateEmail();
  }
});

watch(password, () => {
  if (passwordTouched.value) {
    validatePassword();
  }
});

const onEmailBlur = () => {
  emailTouched.value = true;
  validateEmail();
};

const onPasswordBlur = () => {
  passwordTouched.value = true;
  validatePassword();
};

const navigateToSuccess = () => {
  navigateTo('/success');
};

const validate = () => {
  emailTouched.value = true;
  passwordTouched.value = true;

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
    <form @submit.prevent="validate">
      <provet-stack>
        <provet-input
          label="Email"
          type="email"
          required
          name="email"
          autocomplete="email"
          v-model="email"
          @blur="onEmailBlur"
          :error="emailError"
        ></provet-input>

        <provet-input
          label="Password"
          required
          :type="passwordVisible ? 'text' : 'password'"
          name="password"
          autocomplete="current-password"
          v-model="password"
          :error="passwordError"
          @blur="onPasswordBlur"
        >
          <provet-button
            slot="end"
            aria-describedby="password-tooltip"
            square
            @click.prevent="passwordVisible = !passwordVisible"
          >
            <provet-icon v-if="passwordVisible" name="interface-edit-off"></provet-icon>
            <provet-icon v-else name="interface-edit-on"></provet-icon>
          </provet-button>
        </provet-input>
        <provet-tooltip id="password-tooltip">Show / hide password</provet-tooltip>

        <provet-checkbox
          label="I want to receive occasional product updates and announcements"
          type="checkbox"
          v-model="checkbox"
        ></provet-checkbox>

        <provet-button type="submit" variant="primary">Sign Up</provet-button>
      </provet-stack>
    </form>
  </provet-card>
</template>
