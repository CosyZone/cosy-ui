<template>
  <button
    class="cosy-button"
    :class="[
      `cosy-button--${type}`,
      `cosy-button--${size}`,
      { 'is-disabled': disabled, 'is-round': round }
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CosyButton',
  props: {
    type: {
      type: String,
      default: 'default',
      validator: (value: string) => {
        return ['default', 'primary', 'success', 'warning', 'danger', 'info'].includes(value)
      }
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value: string) => {
        return ['large', 'medium', 'small', 'mini'].includes(value)
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    appearance: {
      type: String,
      default: 'none'
    }
  },
  emits: ['click'],
  setup(_, { emit }) {
    const handleClick = (event: MouseEvent) => {
      emit('click', event)
    }

    return {
      handleClick
    }
  }
})
</script>

<style scoped>
.cosy-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  background-color: #ffffff;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: .1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}

.cosy-button:hover,
.cosy-button:focus {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}

.cosy-button:active {
  color: #3a8ee6;
  border-color: #3a8ee6;
  outline: none;
}

.cosy-button.is-disabled,
.cosy-button.is-disabled:hover,
.cosy-button.is-disabled:focus {
  color: #c0c4cc;
  cursor: not-allowed;
  background-image: none;
  background-color: #ffffff;
  border-color: #ebeef5;
}

/* 类型样式 */
.cosy-button--primary {
  color: #ffffff;
  background-color: #409eff;
  border-color: #409eff;
}

.cosy-button--primary:hover,
.cosy-button--primary:focus {
  background-color: #66b1ff;
  border-color: #66b1ff;
  color: #ffffff;
}

.cosy-button--primary:active {
  background-color: #3a8ee6;
  border-color: #3a8ee6;
  color: #ffffff;
}

.cosy-button--success {
  color: #ffffff;
  background-color: #67c23a;
  border-color: #67c23a;
}

.cosy-button--success:hover,
.cosy-button--success:focus {
  background-color: #85ce61;
  border-color: #85ce61;
  color: #ffffff;
}

.cosy-button--success:active {
  background-color: #5daf34;
  border-color: #5daf34;
  color: #ffffff;
}

.cosy-button--warning {
  color: #ffffff;
  background-color: #e6a23c;
  border-color: #e6a23c;
}

.cosy-button--warning:hover,
.cosy-button--warning:focus {
  background-color: #ebb563;
  border-color: #ebb563;
  color: #ffffff;
}

.cosy-button--warning:active {
  background-color: #cf9236;
  border-color: #cf9236;
  color: #ffffff;
}

.cosy-button--danger {
  color: #ffffff;
  background-color: #f56c6c;
  border-color: #f56c6c;
}

.cosy-button--danger:hover,
.cosy-button--danger:focus {
  background-color: #f78989;
  border-color: #f78989;
  color: #ffffff;
}

.cosy-button--danger:active {
  background-color: #dd6161;
  border-color: #dd6161;
  color: #ffffff;
}

.cosy-button--info {
  color: #ffffff;
  background-color: #909399;
  border-color: #909399;
}

.cosy-button--info:hover,
.cosy-button--info:focus {
  background-color: #a6a9ad;
  border-color: #a6a9ad;
  color: #ffffff;
}

.cosy-button--info:active {
  background-color: #82848a;
  border-color: #82848a;
  color: #ffffff;
}

/* 尺寸样式 */
.cosy-button--large {
  padding: 14px 22px;
  font-size: 16px;
  border-radius: 4px;
}

.cosy-button--medium {
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}

.cosy-button--small {
  padding: 9px 15px;
  font-size: 12px;
  border-radius: 3px;
}

.cosy-button--mini {
  padding: 7px 12px;
  font-size: 12px;
  border-radius: 3px;
}

/* 圆角样式 */
.cosy-button.is-round {
  border-radius: 20px;
}
</style>
