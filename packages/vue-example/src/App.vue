<script setup lang="ts">
import { Alert, Button, Container } from '@coffic/cosy-ui/vue';
</script>

<template>
  <Container border flex="col" gap="md">
    <Button>Click me</Button>

    <Alert type="success">
      <p>This is an alert</p>
    </Alert>

    <Alert type="error">
      <p>This is an error alert</p>
    </Alert>

    <Alert type="warning">
      <p>This is a warning alert</p>
    </Alert>
  </Container>
</template>
