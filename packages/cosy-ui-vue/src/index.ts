import type { App } from 'vue'
import Button from './components/Button.vue'

// 组件列表
const components = [
    Button,
]

// 定义安装方法
const install = (app: App): void => {
    // 注册组件
    components.forEach(component => {
        if (component.name) {
            app.component(component.name, component)
        }
    })
}

export {
    Button as CosyButton,
}

// 导出默认对象
export default {
    install
}
