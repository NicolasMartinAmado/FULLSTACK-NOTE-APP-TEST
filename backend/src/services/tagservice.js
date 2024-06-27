const tagRepository = require('../repositories/tag.repository');

class TagService {
  async getAllTags() {
    return await tagRepository.findAll();
  }

  async getTagById(id) {
    return await tagRepository.findById(id);
  }

  async createTag(tagData) {
    return await tagRepository.create(tagData);
  }

  async updateTag(id, tagData) {
    return await tagRepository.update(id, tagData);
  }

  async deleteTag(id) {
    return await tagRepository.delete(id);
  }
}

module.exports = new TagService();