class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros || [];
    this.mascotas = mascotas || [];
  }

  getFullName() {
    return `${this.nombre} ${this.apellido}`;
  }

  addMascota(name) {
    this.mascotas.push(name);
  }

  countMascotas() {
    return this.mascotas.length;
  }

  addBook(nom, aut) {
    this.libros.push({
      name: nom,
      autor: aut
    });
  }

  getBookNames() {
    return this.libros.map( (libro) => {
      return libro.name;
    });
  }
}

const ejecucion = () => {
  const user1 = new Usuario('Joaquin', 'Garola');

  user1.addMascota('Perro');
  user1.addMascota('Gato');
  user1.addMascota('Loro');

  user1.addBook('Harry Potter y la piedra filosofal', 'J. K. Rowling');
  user1.addBook('Los juegos del hambre', 'Suzanne Collins');
  user1.addBook('Cincuenta sombras de Grey', 'E. L. James');
  
  console.log(user1.getFullName());
  console.log(`Cantidad de mascotas: ${user1.countMascotas()}`);
  console.log(`Nombre de los libros: ${user1.getBookNames()}`);
}

ejecucion();