<template>
  <div>
    <h2>基础用法</h2>
    <div style="display: flex; justify-content: center; margin: 2rem 0">
      <ApplePhone height="xl">
        <div style="padding: 20px; text-align: center">
          <h3>欢迎使用 ApplePhone</h3>
          <p>这是一个演示内容</p>
          <div style="margin-top: 20px; text-align: left">
            <p>您可以在这里放置任何内容：</p>
            <ul>
              <li>文本内容</li>
              <li>图片</li>
              <li>表单元素</li>
              <li>以及其他 UI 组件</li>
            </ul>
          </div>
        </div>
      </ApplePhone>
    </div>

    <h2>不同高度选项</h2>
    <div
      style="
        display: flex;
        justify-content: center;
        gap: 2rem;
        flex-wrap: wrap;
        margin: 2rem 0;
      ">
      <ApplePhone height="lg">
        <div style="padding: 15px; text-align: center">
          <h4>默认高度</h4>
          <p>lg (384px)</p>
        </div>
      </ApplePhone>

      <ApplePhone height="xl">
        <div style="padding: 15px; text-align: center">
          <h4>加大高度</h4>
          <p>xl (480px)</p>
        </div>
      </ApplePhone>
    </div>

    <h2>不显示边框</h2>
    <div style="display: flex; justify-content: center; margin: 2rem 0">
      <ApplePhone height="xl" :showFrame="false">
        <div style="padding: 20px; text-align: center">
          <h3>无边框模式</h3>
          <p>只显示内容区域</p>
        </div>
      </ApplePhone>
    </div>

    <h2>长文本内容演示</h2>
    <div style="display: flex; justify-content: center; margin: 2rem 0">
      <ApplePhone height="xl">
        <div style="padding: 20px">
          <h3>长文本内容展示</h3>
          <p>
            这是一个展示长文本内容的示例。在这个示例中，我们将展示大量文本内容在
            ApplePhone 组件中的渲染效果和滚动行为。
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>

          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>

          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </p>

          <p>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt.
          </p>

          <p>
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit, sed quia non numquam eius modi tempora
            incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          </p>

          <p>
            Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
            suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis
            autem vel eum iure reprehenderit qui in ea voluptate velit esse quam
            nihil molestiae consequatur.
          </p>

          <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident.
          </p>

          <p>
            Similique sunt in culpa qui officia deserunt mollitia animi, id est
            laborum et dolorum fuga. Et harum quidem rerum facilis est et
            expedita distinctio.
          </p>

          <p>
            Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
            impedit quo minus id quod maxime placeat facere possimus, omnis
            voluptas assumenda est, omnis dolor repellendus.
          </p>

          <p>
            Temporibus autem quibusdam et aut officiis debitis aut rerum
            necessitatibus saepe eveniet ut et voluptates repudiandae sint et
            molestiae non recusandae.
          </p>

          <p>
            Itaque earum rerum hic tenetur a sapiente delectus, ut aut
            reiciendis voluptatibus maiores alias consequatur aut perferendis
            doloribus asperiores repellat.
          </p>

          <p>
            这是最后一段文本内容，用于测试滚动效果和组件在大量文本内容下的表现。
          </p>
        </div>
      </ApplePhone>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ApplePhone } from "@coffic/cosy-ui/vue";
</script>
