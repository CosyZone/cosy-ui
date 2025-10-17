<template>
  <ApplePhone title="长文本示例(有边框)" :showFrame="true">
    <div class="cosy:p-4 cosy:text-left">
      <h2 class="cosy:text-xl cosy:font-bold cosy:mb-4">长文本内容展示</h2>
      <p class="cosy:mb-3">
        这是一个展示长文本内容的示例。在这个示例中，我们将展示大量文本内容在
        ApplePhone 组件中的渲染效果。
      </p>
      <p class="cosy:mb-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <p class="cosy:mb-3">
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p class="cosy:mb-3">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo.
      </p>
      <p class="cosy:mb-3">
        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
        fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
        sequi nesciunt.
      </p>
      <p class="cosy:mb-3">
        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
        consectetur, adipisci velit, sed quia non numquam eius modi tempora
        incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
      </p>
      <p class="cosy:mb-3">
        Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
        suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis
        autem vel eum iure reprehenderit qui in ea voluptate velit esse quam
        nihil molestiae consequatur.
      </p>
      <p class="cosy:mb-3">
        At vero eos et accusamus et iusto odio dignissimos ducimus qui
        blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
        et quas molestias excepturi sint occaecati cupiditate non provident.
      </p>
      <p class="cosy:mb-3">
        Similique sunt in culpa qui officia deserunt mollitia animi, id est
        laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
        distinctio.
      </p>
      <p class="cosy:mb-3">
        Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
        impedit quo minus id quod maxime placeat facere possimus, omnis voluptas
        assumenda est, omnis dolor repellendus.
      </p>
      <p class="cosy:mb-3">
        Temporibus autem quibusdam et aut officiis debitis aut rerum
        necessitatibus saepe eveniet ut et voluptates repudiandae sint et
        molestiae non recusandae.
      </p>
      <p class="cosy:mb-3">
        Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
        voluptatibus maiores alias consequatur aut perferendis doloribus
        asperiores repellat.
      </p>
      <p class="cosy:mb-3">
        这是最后一段文本内容，用于测试滚动效果和组件在大量文本内容下的表现。
      </p>
    </div>
  </ApplePhone>
</template>

<script setup lang="ts">
import { ApplePhone } from "@coffic/cosy-ui/vue";
</script>