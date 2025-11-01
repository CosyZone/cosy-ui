<!--
@component Login

@description
Login 组件用于创建灵活且功能丰富的登录页面。支持多种登录方式、自定义样式和布局。

@usage
基本用法：
```vue
<Login title="欢迎回来" />
```

自定义登录方式：
```vue
<Login
  title="登录到系统"
  subtitle="使用以下方式登录"
  :social-logins="['github', 'google']"
  :show-remember-me="true"
  :show-forgot-password="true"
/>
```

@props
@prop {string} [title="登录"] - 登录页标题
@prop {string} [subtitle] - 登录页副标题
@prop {string} [logo] - 登录页Logo图片路径
@prop {('github'|'google'|'wechat')[]} [socialLogins] - 社交登录方式列表
@prop {boolean} [showRememberMe=false] - 是否显示"记住我"选项
@prop {boolean} [showForgotPassword=false] - 是否显示"忘记密码"链接
@prop {string} [customClass] - 自定义CSS类名
@prop {string} [loginButtonText="登录"] - 登录按钮文本
@prop {string} [usernameLabel="用户名"] - 用户名输入框标签
@prop {string} [passwordLabel="密码"] - 密码输入框标签
@prop {string} [forgotPasswordText="忘记密码？"] - 忘记密码链接文本
@prop {string} [rememberMeText="记住我"] - 记住我选项文本
@prop {string} [dividerText="或"] - 社交登录分隔符文本

@slots
@slot header - 页头自定义内容
@slot footer - 页脚自定义内容
@slot socialButtons - 自定义社交登录按钮
-->

<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '../../src/class/classBuilder';
import { LoginFacade } from '../../src/components/login';
import { ChartIcon, GithubIcon, WechatIcon } from '../icons';
import type { ILoginVueProps } from './props';

interface Props extends ILoginVueProps {}

const props = withDefaults(defineProps<Props>(), {
    title: '登录',
    subtitle: '',
    logo: '',
    socialLogins: () => [],
    showRememberMe: false,
    showForgotPassword: false,
    customClass: '',
    loginButtonText: '登录',
    usernameLabel: '用户名',
    passwordLabel: '密码',
    forgotPasswordText: '忘记密码？',
    rememberMeText: '记住我',
    dividerText: '或',
});

// 使用共用代码获取类名
const classes = computed(() =>
    LoginFacade.getLoginClasses({
        title: props.title,
        subtitle: props.subtitle,
        logo: props.logo,
        socialLogins: props.socialLogins,
        showRememberMe: props.showRememberMe,
        showForgotPassword: props.showForgotPassword,
        customClass: props.customClass,
        loginButtonText: props.loginButtonText,
        usernameLabel: props.usernameLabel,
        passwordLabel: props.passwordLabel,
        forgotPasswordText: props.forgotPasswordText,
        rememberMeText: props.rememberMeText,
        dividerText: props.dividerText,
    }),
);

// 社交登录图标映射
const socialIcons: Record<'github' | 'google' | 'wechat', any> = {
    github: GithubIcon,
    google: ChartIcon,
    wechat: WechatIcon,
};

// 获取社交登录按钮类名
const getSocialButtonClass = (provider: 'github' | 'google' | 'wechat') => {
    return LoginFacade.getSocialButtonClass(provider);
};
</script>

<template>
    <div :class="cn().add(classes.container).add(customClass).build()">
        <div :class="classes.card">
            <!-- 头部区域 -->
            <div :class="classes.header">
                <slot name="header">
                    <img v-if="logo" :class="classes.logo" :src="logo" alt="Logo" />
                    <h2 :class="classes.title">{{ title }}</h2>
                    <p v-if="subtitle" :class="classes.subtitle">{{ subtitle }}</p>
                </slot>
            </div>

            <!-- 登录表单 -->
            <form :class="classes.form">
                <div :class="classes.inputGroup">
                    <div>
                        <label for="username" :class="cn().add('cosy:sr-only').build()">
                            {{ usernameLabel }}
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            :class="classes.usernameInput"
                            :placeholder="usernameLabel"
                        />
                    </div>
                    <div>
                        <label for="password" :class="cn().add('cosy:sr-only').build()">
                            {{ passwordLabel }}
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            :class="classes.passwordInput"
                            :placeholder="passwordLabel"
                        />
                    </div>
                </div>

                <div :class="classes.options">
                    <div v-if="showRememberMe" :class="classes.rememberMe">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            :class="classes.checkbox"
                        />
                        <label for="remember-me" :class="classes.rememberMeLabel">
                            {{ rememberMeText }}
                        </label>
                    </div>

                    <div v-if="showForgotPassword" :class="classes.forgotPassword">
                        <a href="#" :class="classes.forgotPasswordLink">
                            {{ forgotPasswordText }}
                        </a>
                    </div>
                </div>

                <div>
                    <button type="submit" :class="classes.submitButton">
                        {{ loginButtonText }}
                    </button>
                </div>
            </form>

            <!-- 社交登录 -->
            <div v-if="socialLogins.length > 0" :class="classes.socialSection">
                <div :class="classes.divider">
                    <div :class="classes.dividerLine">
                        <div :class="classes.dividerBorder" />
                    </div>
                    <div :class="classes.dividerTextContainer">
                        <span :class="classes.dividerText">{{ dividerText }}</span>
                    </div>
                </div>

                <slot name="socialButtons">
                    <div
                        :class="
                            cn()
                                .add(classes.socialButtons)
                                .add(`cosy:grid-cols-${Math.min(socialLogins.length, 3)}`)
                                .build()
                        ">
                        <div v-for="provider in socialLogins" :key="provider">
                            <a href="#" :class="getSocialButtonClass(provider)">
                                <component :is="socialIcons[provider]" :class="cn().w(5).h(5).build()" />
                            </a>
                        </div>
                    </div>
                </slot>
            </div>

            <!-- 页脚 -->
            <slot name="footer" />
        </div>
    </div>
</template>

