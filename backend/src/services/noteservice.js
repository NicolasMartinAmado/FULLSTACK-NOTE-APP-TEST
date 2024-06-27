const noteRepository = require('../repositories/note.respository');
const tagRepository = require('../repositories/tag.repository');

class NoteService {
  async getAllNotes() {
    return await noteRepository.findAll();
  }

  async getNoteById(id) {
    return await noteRepository.findById(id);
  }

  async createNote(noteData) {
    return await noteRepository.create(noteData);
  }

  async updateNote(id, noteData) {
    return await noteRepository.update(id, noteData);
  }

  async deleteNote(id) {
    return await noteRepository.delete(id);
  }

  async archiveNote(id) {
    return await noteRepository.archive(id);
  }

  async unarchiveNote(id) {
    return await noteRepository.unarchive(id);
  }

  async addTagToNote(noteId, tagId) {
    const note = await noteRepository.addTag(noteId, tagId);
    return note;
  }

  async removeTagFromNote(noteId, tagId) {
    const note = await noteRepository.removeTag(noteId, tagId);
    return note;
  }

  async filterNotesByTag(tagId) {
    return await noteRepository.findAll({ tags: tagId });
  }
}

module.exports = new NoteService();