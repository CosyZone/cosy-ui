export interface EmptyStateProps {
    /**
     * 在标题上方显示的图标名称。
     * 从 cosy-ui 的图标库中选择。
     */
    icon?: string;

    /**
     * 主标题，用于描述空状态。
     * 这是必填项。
     */
    title: string;

    /**
     * 对空状态的详细描述。
     * 这是可选项，提供更多上下文。
     */
    description?: string;
} 
