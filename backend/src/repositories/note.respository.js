const Note = require('../models/note');

class NoteRepository {
  async findAll() {
    return await Note.find().populate('tags');
  }

  async findById(id) {
    return await Note.findById(id).populate('tags');
  }

  async create(noteData) {
    return await Note.create(noteData);
  }

  async update(id, noteData) {
    return await Note.findByIdAndUpdate(id, noteData, { new: true });
  }

  async delete(id) {
    return await Note.findByIdAndDelete(id);
  }

  async archive(id) {
    return await this.update(id, { isArchived: true });
  }

  async unarchive(id) {
    return await this.update(id, { isArchived: false });
  }

  async addTag(noteId, tagId) {
    const note = await this.findById(noteId);
    note.tags.push(tagId);
    return await note.save();
  }

  async removeTag(noteId, tagId) {
    const note = await this.findById(noteId);
    note.tags.pull(tagId);
    return await note.save();
  }
}

module.exports = new NoteRepository();