<!-- filepath: /home/tali/Desktop/Azat/notes/frontend/src/App.vue -->
<template>
  <v-app>
    <v-main>
      <v-container class="py-8">
        <v-row>
          <v-col cols="12" md="6" offset-md="3">
            <h1 class="mb-6 text-center">Заметки</h1>
            <NoteForm @note-created="fetchNotes" />
            <NotesList :notes="notes" @note-deleted="fetchNotes" @note-updated="fetchNotes" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Note } from './api/notes'
import { getNotes } from './api/notes'
import NoteForm from './components/NoteForm.vue'
import NotesList from './components/NotesList.vue'

const notes = ref<Note[]>([])
const fetchNotes = async () => { notes.value = await getNotes() }
onMounted(fetchNotes)
</script>