<template>
  <v-card class="mb-4" outlined>
    <v-card-title>Добавить заметку</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="submitNote">
        <v-text-field
          v-model="title"
          label="Заголовок"
          :error-messages="titleError"
          required
          @input="validateTitle"
        />
        <v-textarea v-model="content" label="Текст" />
        <v-checkbox v-model="isPin" label="Закрепить" />
        <v-btn type="submit" color="primary" class="mt-2">Добавить</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { createNote } from '../api/notes'
const emit = defineEmits(['note-created'])
const title = ref('')
const content = ref('')
const isPin = ref(false)
const titleError = ref<string | null>(null)

function validateTitle() {
  if (!title.value.trim()) {
    titleError.value = 'Заголовок не может быть пустым'
  } else {
    titleError.value = null
  }
}

const submitNote = async () => {
  validateTitle()
  if (titleError.value) return
  await createNote(title.value.trim(), content.value, isPin.value)
  title.value = ''
  content.value = ''
  isPin.value = false
  emit('note-created')
}
</script>