class MemoryContainer {
  constructor(){
      this.data = [];
  }

  generateId(){
      let id = this.data.length ? this.data[this.data.length-1].id + 1 : 1;  // ultimo id + 1
      return id;
  }

  async save(obj){
      try {
      obj.id = this.generateId();
      this.data.push(obj);
      return Promise.resolve(obj.id);
      } catch (error) {
        console.log(error.message);
      }
  }

  async getAll(){
    try {
      return Promise.resolve(this.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async update(newData){
    this.data = newData;
  }

  async getById(id){
    return this.data.find(p => p.id === parseInt(id)) 
  }

  async deleteById (id){ 
    const element = await this.getById(id);
    if (element){
      this.update(this.data.filter(e => e.id != id));
      return id;
    }
    return 0;
  }

  deleteAll() {
    this.data = []
  }
}

module.exports = MemoryContainer;