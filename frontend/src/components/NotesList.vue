<!-- filepath: /home/tali/Desktop/Azat/notes/frontend/src/components/NotesList.vue -->
<template>
  <div>
    <v-card v-for="note in notes" :key="note.id" class="mb-3" outlined>
      <v-card-title>
        <v-icon v-if="note.is_pin" color="orange" class="mr-1">mdi-pin</v-icon>
        {{ note.title }}
        <v-spacer />
        <v-btn icon @click="startEdit(note)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="removeNote(note.id)">
          <v-icon color="red">mdi-delete</v-icon>
        </v-btn>
      </v-card-title>
        <v-card-text>
          <div>{{ note.content }}</div>
          <div class="text-caption text-grey mt-2">
            Дата создания: {{ new Date(note.created_at).toLocaleString() }}
          </div>
          <div class="text-caption text-grey mt-2">
            Дата изменения: {{ new Date(note.updated_at).toLocaleString() }}
          </div>
        </v-card-text>
    </v-card>

    <v-dialog v-model="editing" max-width="500">
      <v-card>
        <v-card-title>Редактировать заметку</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="updateNote">
            <v-text-field v-model="editTitle" label="Заголовок" required />
            <v-textarea v-model="editContent" label="Текст" />
            <v-btn type="submit" color="primary" class="mt-2">Сохранить</v-btn>
            <v-btn text @click="editing = false" class="mt-2">Отмена</v-btn>
            <v-checkbox v-model="editIsPin" label="Закрепить" />
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { deleteNote, updateNote as apiUpdateNote } from '../api/notes'
import type { Note } from '../api/notes'

const { notes } = defineProps<{ notes: Note[] }>()
const emit = defineEmits(['note-deleted', 'note-updated'])

const editing = ref(false)
const editId = ref<number | null>(null)
const editTitle = ref('')
const editContent = ref('')
const editIsPin = ref(false)

function startEdit(note: Note) {
  editing.value = true
  editId.value = note.id
  editTitle.value = note.title
  editContent.value = note.content
  editIsPin.value = note.is_pin
}

async function updateNote() {
  if (editId.value !== null) {
    await apiUpdateNote(editId.value, editTitle.value, editContent.value, editIsPin.value)
    editing.value = false
    emit('note-updated')
  }
}

async function removeNote(id: number) {
  await deleteNote(id)
  emit('note-deleted')
}
</script>